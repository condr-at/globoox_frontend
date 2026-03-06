# Translation v2 — Reconcile API (bulk fetch по blockIds)

Цель: обеспечить “догоночную” синхронизацию переводов после:
- ухода/возврата (abort стримов),
- прыжков по главам/страницам,
- смены `activeLang`,
без скачивания полного `content` и без зависимости от того, что клиент дослушал стрим.

## TL;DR

Нужен лёгкий endpoint, который умеет:
- принять `{ lang, blockIds }`,
- вернуть только то, что реально готово для target языка:
  - `ok`: тексты для `blockIds`, где `Text[blockId, lang]` существует,
  - `missing`: `blockIds`, где текста ещё нет,
  - опционально `pending`: если сервер умеет отличать “в очереди” от “не запрашивалось”.

Это не “статус ради статуса”, это bulk fetch `Text[blockId, lang]`.

## Почему не достаточно `GET /content?lang=XX`

`content?lang=XX`:
- большой payload,
- может возвращать “смешанный снапшот” (часть блоков на target, часть fallback/original),
- не подходит для частого reconcile по окнам (N блоков вперёд/назад).

## Предлагаемый контракт (backend)

### `POST /api/chapters/:id/blocks/text`

**Request body:**
```json
{
  "lang": "RU",
  "blockIds": ["..."]
}
```

**Response:**
```json
{
  "chapterId": "…",
  "lang": "RU",
  "ok": [
    { "blockId": "…", "type": "paragraph", "text": "…" },
    { "blockId": "…", "type": "list", "items": ["…"] }
  ],
  "missing": ["…"],
  "pending": ["…"]
}
```

Примечания:
- `type` нужен, чтобы корректно собрать `ContentBlock` на клиенте (text vs items).
- `pending` можно не возвращать, если сервер не различает; тогда достаточно `missing`.

## Прокси через Next.js (globoox_preview)

Фронт должен иметь проксирующий route:
- `src/app/api/chapters/[id]/blocks/text/route.ts` → `requireBackendProxy(request)`

И API клиент:
- `src/lib/api.ts`: `fetchBlockTexts(chapterId, lang, blockIds)`

## Клиентская reconcile логика (Reader)

На событиях:
- mount Reader,
- смена `activeLang`,
- jump (TOC/search/slider/link),
- возврат из Library,

делаем:
1) вычислить окно blockIds (видимые + prefetch вперёд/назад),
2) выкинуть те, что уже есть в IDB как `Text[blockId, activeLang]`,
3) дернуть `POST /blocks/text` для оставшихся,
4) сохранить `ok` в IDB (по `(blockId, lang)`),
5) обновить UI: блоки с появившимся `Text[targetLang]` перестают быть pending → blur снимается.

Важно:
- UI не должен показывать “не target” без blur.

## Что нужно проверить, чтобы ничего не сломать

- Стримовый `POST /api/chapters/:id/translate` остаётся (для быстрого “push” результатов), но reconcile должен уметь всё восстановить после abort.
- Старый `translate-status` (если есть) можно:
  - удалить, или
  - переиспользовать под новый контракт (но тогда переименовать по смыслу).

