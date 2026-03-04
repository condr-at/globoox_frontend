'use client'

import { useCallback, useEffect, useState } from 'react'
import { ApiChapter, fetchChapters } from '@/lib/api'

const STALE_TIME_MS = 10 * 60 * 1000 // 10 minutes
const chaptersCache = new Map<string, { data: ApiChapter[]; fetchedAt: number }>()

export function useChapters(bookId: string | null) {
  const cached = bookId ? chaptersCache.get(bookId) : undefined
  const [chapters, setChapters] = useState<ApiChapter[]>(cached?.data ?? [])
  const [loading, setLoading] = useState(!cached)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!bookId) return
    const entry = chaptersCache.get(bookId)
    const now = Date.now()
    const isFresh = entry && now - entry.fetchedAt < STALE_TIME_MS

    if (entry) {
      setChapters(entry.data)
      setLoading(false)
    }

    if (isFresh) return

    setError(null)
    try {
      const data = await fetchChapters(bookId)
      chaptersCache.set(bookId, { data, fetchedAt: Date.now() })
      setChapters(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load chapters')
    } finally {
      setLoading(false)
    }
  }, [bookId])

  useEffect(() => {
    load()
  }, [load])

  return { chapters, loading, error }
}
