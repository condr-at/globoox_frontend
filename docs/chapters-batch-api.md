# Chapters & Block-Batch API Changes

Last updated: 2026-04-22

Two backend changes you should consume from the frontend.

## 1. `GET /api/books/{id}/chapters` — new `first_block_id` field

Each chapter in the response now includes the id of its first content block (the block at `position = 0`).

```diff
 {
   "id": "c1…",
   "book_id": "b1…",
   "index": 0,
   "title": "Introduction",
   "translations": { "RU": "Введение" },
   "depth": 1,
   "parent_id": null,
+  "first_block_id": "bk1…",
   "created_at": "…"
 }
```

- Type: `string (uuid) | null`. `null` only if a chapter has no blocks (shouldn't happen in normal data, but handle it).
- Use this to anchor the batch endpoint below (e.g. jumping to a chapter without fetching its full content first).

**Frontend:** extend `ApiChapter` in `src/lib/api.ts`:

```ts
export interface ApiChapter {
  // …
  first_block_id: string | null
}
```

## 2. `GET /api/chapters?block_id=<uuid>&batch_size=<int>` — new endpoint

Returns up to `batch_size` content blocks starting at `block_id`, in reading order. If the starting block's chapter doesn't have enough remaining blocks, the response spills into subsequent chapters of the same book (ordered by `chapter_number`). Every returned block carries its `chapter_id`, so the caller can tell which chapter each block belongs to.

### Request

| param        | required | type                 | notes                                       |
| ------------ | -------- | -------------------- | ------------------------------------------- |
| `block_id`   | yes      | uuid                 | first block to include in the batch         |
| `batch_size` | no       | integer `[1..500]`   | defaults to `20`, silently capped at `500`  |

### Response

`200 OK` — `BatchContentBlock[]` in reading order.

Each block has:

```ts
type BatchContentBlock =
  | { id: string; chapter_id: string; position: number; type: 'paragraph' | 'quote'; text: string }
  | { id: string; chapter_id: string; position: number; type: 'heading'; text: string; level: number }
  | { id: string; chapter_id: string; position: number; type: 'list'; ordered: boolean; items: string[] }
  | { id: string; chapter_id: string; position: number; type: 'image'; src: string; alt: string; caption?: string }
  | { id: string; chapter_id: string; position: number; type: 'hr' }
```

Shape matches `GET /api/chapters/{id}/content` with three differences:

- `chapter_id` is present on every block (essential — the array can span chapters).
- No `lang` parameter: this endpoint does **not** return translations. It always returns source text. If you need translated text for a batch, call `POST /api/chapters/{id}/translate` with the block ids after fetching.
- No `isTranslated` / `is_pending` flags, no `ETag` / `X-Translation-Status` / `X-Pending-Blocks` headers.

`image` blocks return fully resolved `src` URLs (absolute or `/api/chapters/{chapter_id}/asset?src=…`), same convention as the per-chapter content endpoint.

### Errors

- `400` — missing `block_id`, or `batch_size` is not a positive integer.
- `404` — `block_id` does not match any block.

### Behaviour notes

- The first chapter is filtered to `position >= startPosition`; subsequent chapters include all blocks from `position = 0`.
- Chapter boundaries are implicit — detect them by watching `chapter_id` change across consecutive array items.
- If the book ends before the batch is filled, you get fewer than `batch_size` blocks. This is the natural end-of-book signal; don't treat it as an error.

### Suggested `src/lib/api.ts` helper

```ts
export async function fetchBlockBatch(
  blockId: string,
  batchSize = 20,
  signal?: AbortSignal,
): Promise<BatchContentBlock[]> {
  const url = `/api/chapters?block_id=${encodeURIComponent(blockId)}&batch_size=${batchSize}`
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`fetchBlockBatch: ${res.status}`)
  return res.json()
}
```

Add the corresponding Next.js proxy route at `src/app/(app)/api/chapters/route.ts` using the existing `_proxy` helper — same pattern as `src/app/(app)/api/jobs/[id]/route.ts`.

## Use-case sketch

Prefetching the next screen when the user is near the end of the loaded range:

1. Reader is showing blocks up to `lastBlockId` in chapter `C`.
2. `nextBlockId` = the next block id after `lastBlockId` (either the next block in `C`, or `first_block_id` of the next chapter — hence the new field on `/books/{id}/chapters`).
3. `fetchBlockBatch(nextBlockId, 30)` returns the next 30 blocks, possibly spanning several chapters.
4. If translation is active, collect block ids per `chapter_id` and dispatch translate requests chapter-by-chapter (the translate endpoint is per-chapter).

## OpenAPI

Both changes are documented in `server/api/docs/openapi.json`:

- `Chapter.first_block_id` in the schema
- `GET /chapters` path with the new `BatchContentBlock` response schema

Live Swagger UI: `/api/docs`.
