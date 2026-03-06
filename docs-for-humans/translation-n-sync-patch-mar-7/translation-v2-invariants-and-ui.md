# Translation v2 — Инварианты и UI (Reader)

Документ фиксирует **железобетонные правила** отображения текста при переводах и требования к данным, чтобы не было “EN без blur при выбранном RU/FR/ES”, и чтобы уход/возврат в Library не ломал состояние.

Связанные документы:
- `docs-for-humans/content-caching-plan.md` — текущий IndexedDB кеш (скелет + тексты по `(blockId, lang)`).
- `docs-for-humans/api-architecture.md` — прокси `/api/*` через Next.

## TL;DR

- В Reader выбран `activeLang` (селектор языка).
- Для каждого блока существует `Text[blockId, lang]` (может быть `null`).
- **Без blur показываем только `Text[blockId, activeLang]` (если он не null).**
- Если `Text[blockId, activeLang] == null`:
  - блок **никогда не пустой**: показываем **fallback** (любой “последний известный” текст) **под blur**;
  - блок **обязательно** попадает в очередь перевода (с приоритетами).
- “Готовность” = наличие `Text[blockId, activeLang]`, а не факт “в block.text что-то лежит”.

## Термины

- `activeLang` — язык в селекторе ридера (`ReaderView`).
- `fallbackText` — любой доступный текст, который можно показать под blur, пока не появился `Text[blockId, activeLang]`.
- `Text[blockId, lang]` — текст/список для конкретного блока и языка (на клиенте это IndexedDB `STORE_BLOCK_TEXT` и/или in-memory).
- `pending` — “для `activeLang` текста нет”.

## Инварианты (обязательные)

### I1. Отображение языка

Для каждого блока:
- если `Text[blockId, activeLang] != null` → показываем его **без blur**;
- иначе → показываем `fallbackText` **под blur**.

Запрещено:
- показывать нецелевой текст без blur;
- иметь “пустой блок” (пустой DOM/дырки вместо текста).

### I2. Pending не зависит от “какой-то строки”

`pendingForActiveLang = (Text[blockId, activeLang] == null)`

Нельзя выводить pending/ready из:
- наличия `block.text`;
- `block.isTranslated` без привязки к `activeLang`;
- эвристик по буквам/алфавитам.

### I3. Fallback никогда не записывается как target

Если под blur показывается fallback (EN/последний язык), его нельзя класть/считать как `Text[blockId, activeLang]`.

Иначе система начинает “думать, что переведено” и перестаёт догонять перевод.

## UI-правило blur

Blur должен включаться только по `pendingForActiveLang`, а не по “внутренним” флагам.

Текущая реализация blur в UI:
- `src/components/Reader/ContentBlockRenderer.tsx` получает `isPending`.

Translation v2 требует:
- `isPending` вычислять как `Text[blockId, activeLang] == null`.

## Очередь перевода (на уровне поведения)

Правило: если блок отображается под blur для `activeLang`, значит пользователь уже “хочет” этот перевод → блок должен быть запрошен согласно приоритетам.

Приоритеты (план):
1) **HIGH**: блоки видимой страницы/viewport.
2) **LOW**: окно вперёд от reading position (например 20 блоков).
3) **EXTRALOW**: окно назад (например 10 блоков).

Окна должны “перетекать” через главы (если текущая глава короткая).

## Уход/возврат и abort

Переход в Library/другие страницы может обрывать стрим/запросы перевода. Translation v2 не должен зависеть от того, что клиент “дослушал” стрим до конца.

Требование:
- на входе в Reader (и при смене `activeLang`) выполняется reconcile (см. документ про sync endpoint), чтобы добрать `Text[blockId, activeLang]` для видимого окна.

