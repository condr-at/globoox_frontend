'use client'

export interface ReaderChromeMetaTranslation {
  title: string
  author: string | null
}

export interface ReaderChromeState {
  translatedBookMeta: ReaderChromeMetaTranslation | null
  translatedChapterTitles: Map<string, string>
  isTargetLanguage: boolean
}

export function areAllReaderChromeTitlesReady(
  isTargetLanguage: boolean,
  chapterIds: string[],
  translatedChapterTitles: Map<string, string>,
): boolean {
  if (!isTargetLanguage) return true
  return chapterIds.every((chapterId) => translatedChapterTitles.has(chapterId))
}

export function isReaderChromeMetaReady(
  isTargetLanguage: boolean,
  translatedBookMeta: ReaderChromeMetaTranslation | null,
): boolean {
  if (!isTargetLanguage) return true
  return !!translatedBookMeta
}

export function isReaderChromeContentPending(
  state: ReaderChromeState,
  chapterIds: string[],
): boolean {
  if (!state.isTargetLanguage) return false
  return !isReaderChromeMetaReady(true, state.translatedBookMeta)
    || !areAllReaderChromeTitlesReady(true, chapterIds, state.translatedChapterTitles)
}
