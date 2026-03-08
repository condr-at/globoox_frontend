'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { translateBookMetadata, translateChapterTitles } from '@/lib/api'
import {
  getCachedBookTranslation,
  getCachedTocTitles,
  setCachedBookTranslation,
  setCachedTocTitles,
} from '@/lib/contentCache'

interface ReaderMetadataTranslationsInput {
  userScope: string
  bookId: string
  activeLang: string
  originalLanguage?: string | null
  title: string
  author?: string | null
  chapters: Array<{
    id: string
    title: string
    translations?: Record<string, string>
  }>
}

export interface ReaderMetadataState {
  translatedBookMeta: { title: string; author: string | null } | null
  translatedChapterTitles: Map<string, string>
  isTargetLanguageReaderMetadata: boolean
  areAllChapterTitlesReady: boolean
  isBookMetaPending: boolean
  isTocContentPending: boolean
  readerBookTitle: string
  readerBookAuthor: string | null
  getResolvedChapterTitle: (chapter: { id: string; title: string; translations?: Record<string, string> }) => string
  ensureTocTranslations: () => Promise<void>
}

export function useReaderMetadataTranslations({
  userScope,
  bookId,
  activeLang,
  originalLanguage,
  title,
  author,
  chapters,
}: ReaderMetadataTranslationsInput): ReaderMetadataState {
  const [translatedChapterTitles, setTranslatedChapterTitles] = useState<Map<string, string>>(new Map())
  const [translatedBookMeta, setTranslatedBookMeta] = useState<{ title: string; author: string | null } | null>(null)
  const translatingTitlesLangRef = useRef<string | null>(null)

  const normalizedActiveLang = activeLang.toUpperCase()
  const normalizedOriginalLanguage = originalLanguage?.toUpperCase() ?? null
  const isTargetLanguageReaderMetadata = !!normalizedOriginalLanguage
    && normalizedOriginalLanguage !== normalizedActiveLang

  useEffect(() => {
    setTranslatedChapterTitles(new Map())
    translatingTitlesLangRef.current = null
    setTranslatedBookMeta(null)
  }, [activeLang])

  useEffect(() => {
    let cancelled = false
    void getCachedTocTitles(userScope, bookId, activeLang).then((titles) => {
      if (cancelled || !titles) return
      setTranslatedChapterTitles(new Map(Object.entries(titles)))
    })
    return () => {
      cancelled = true
    }
  }, [userScope, bookId, activeLang])

  useEffect(() => {
    let cancelled = false

    if (!isTargetLanguageReaderMetadata) {
      setTranslatedBookMeta({ title, author: author ?? null })
      return () => {
        cancelled = true
      }
    }

    void getCachedBookTranslation(userScope, bookId, normalizedActiveLang).then((cached) => {
      if (cancelled || !cached) return
      setTranslatedBookMeta(cached)
    })

    void translateBookMetadata(bookId, normalizedActiveLang)
      .then((result) => {
        if (cancelled) return
        setTranslatedBookMeta(result)
        void setCachedBookTranslation(userScope, bookId, normalizedActiveLang, result)
      })
      .catch(() => {
        if (cancelled) return
      })

    return () => {
      cancelled = true
    }
  }, [userScope, bookId, normalizedActiveLang, isTargetLanguageReaderMetadata, title, author])

  const getResolvedChapterTitle = useCallback((chapter: { id: string; title: string; translations?: Record<string, string> }) => {
    return translatedChapterTitles.get(chapter.id)
      || chapter.translations?.[normalizedActiveLang]
      || chapter.title
  }, [translatedChapterTitles, normalizedActiveLang])

  const areAllChapterTitlesReady = useMemo(() => {
    if (!isTargetLanguageReaderMetadata) return true
    return chapters.every((chapter) =>
      translatedChapterTitles.has(chapter.id) || !!chapter.translations?.[normalizedActiveLang],
    )
  }, [isTargetLanguageReaderMetadata, chapters, translatedChapterTitles, normalizedActiveLang])

  const ensureTocTranslations = useCallback(async () => {
    if (!isTargetLanguageReaderMetadata || !chapters.length) return
    if (translatingTitlesLangRef.current === normalizedActiveLang) return

    const missing = chapters.some((chapter) => {
      if (!chapter.title?.trim()) return false
      return !translatedChapterTitles.has(chapter.id) && !chapter.translations?.[normalizedActiveLang]
    })
    if (!missing) return

    translatingTitlesLangRef.current = normalizedActiveLang
    try {
      const { results } = await translateChapterTitles(bookId, normalizedActiveLang)
      const map = new Map<string, string>()
      for (const result of results) map.set(result.id, result.title)
      setTranslatedChapterTitles(map)
      void setCachedTocTitles(userScope, bookId, normalizedActiveLang, Object.fromEntries(map.entries()))
    } catch {
      // keep fallback titles visible
    } finally {
      translatingTitlesLangRef.current = null
    }
  }, [
    isTargetLanguageReaderMetadata,
    chapters,
    translatedChapterTitles,
    normalizedActiveLang,
    bookId,
    userScope,
  ])

  const isBookMetaPending = isTargetLanguageReaderMetadata && !translatedBookMeta
  const isTocContentPending = isTargetLanguageReaderMetadata
    && (!translatedBookMeta || !areAllChapterTitlesReady)

  return {
    translatedBookMeta,
    translatedChapterTitles,
    isTargetLanguageReaderMetadata,
    areAllChapterTitlesReady,
    isBookMetaPending,
    isTocContentPending,
    readerBookTitle: translatedBookMeta?.title ?? title,
    readerBookAuthor: translatedBookMeta?.author ?? author ?? null,
    getResolvedChapterTitle,
    ensureTocTranslations,
  }
}
