import { ContentBlock } from './api'

// Reserve a small bottom margin so the last line of text on a page is never clipped.
const PAGE_HEIGHT_BUFFER = 24

/**
 * Split blocks into pages so each page fits within `pageHeight` pixels.
 * A block is never split — if it doesn't fit it starts a new page.
 * `minBlocksPerPage` (default 1) ensures at least one block per page to
 * prevent infinite loops with blocks taller than the page.
 */
export function computePages(
  blocks: ContentBlock[],
  blockHeights: Map<string, number>,
  pageHeight: number,
  minBlocksPerPage = 1,
): string[][] {
  if (blocks.length === 0 || pageHeight <= 0) return []

  // Subtract a small buffer so the last text line is never clipped by the container
  const effectiveHeight = Math.max(pageHeight - PAGE_HEIGHT_BUFFER, pageHeight * 0.9)

  const pages: string[][] = []
  let currentPage: string[] = []
  let currentHeight = 0

  for (const block of blocks) {
    // Use a conservative fallback height (2 lines of text ~48px) for unmeasured blocks
    const h = blockHeights.get(block.id) ?? 48

    const wouldOverflow = currentHeight + h > effectiveHeight
    const canStartNewPage = currentPage.length >= minBlocksPerPage

    if (wouldOverflow && canStartNewPage) {
      pages.push(currentPage)
      currentPage = [block.id]
      currentHeight = h
    } else {
      currentPage.push(block.id)
      currentHeight += h
    }
  }

  if (currentPage.length > 0) {
    pages.push(currentPage)
  }

  return pages
}

/**
 * Return the page index that contains `blockId`, or -1 if not found.
 */
export function findPageForBlock(pages: string[][], blockId: string): number {
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].includes(blockId)) return i
  }
  return -1
}

/**
 * Find the page index that best contains `targetPosition`.
 * Returns the last page whose first-block position is <= targetPosition.
 * Used as fallback when `blockId` is no longer present (e.g. content re-imported).
 */
export function findPageByBlockPosition(
  pages: string[][],
  blocks: ContentBlock[],
  targetPosition: number,
): number {
  const posMap = new Map(blocks.map((b) => [b.id, b.position]))

  let bestPage = 0
  for (let i = 0; i < pages.length; i++) {
    const firstId = pages[i][0]
    const pos = posMap.get(firstId) ?? -1
    if (pos <= targetPosition) {
      bestPage = i
    } else {
      // First page whose start is past target — previous page is the best
      break
    }
  }

  return bestPage
}
