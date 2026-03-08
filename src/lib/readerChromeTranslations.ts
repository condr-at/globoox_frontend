'use client'

export interface ReaderChromeMetaTranslation {
  title: string
  author: string | null
}

export interface ReaderChromeState {
  translatedBookMeta: ReaderChromeMetaTranslation | null
  isTargetLanguage: boolean
  areAllChapterTitlesReady: boolean
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
): boolean {
  if (!state.isTargetLanguage) return false
  return !isReaderChromeMetaReady(true, state.translatedBookMeta)
    || !state.areAllChapterTitlesReady
}
