import { useEffect, useCallback, useRef, useState } from 'react'
import type { UseFormReturn, FieldValues } from 'react-hook-form'
import { STORAGE_KEY } from '@/utils/constants'

interface UseFormPersistOptions<T extends FieldValues> {
  form: UseFormReturn<T>
  key?: string
  debounceMs?: number
}

export function useFormPersist<T extends FieldValues>({
  form,
  key = STORAGE_KEY,
  debounceMs = 500,
}: UseFormPersistOptions<T>): {
  clearSavedData: () => void
  hasSavedData: boolean
} {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [hasSavedData] = useState<boolean>(() => {
    try {
      return localStorage.getItem(key) !== null
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      const saved = localStorage.getItem(key)
      if (saved) {
        const parsed = JSON.parse(saved) as T
        form.reset(parsed)
      }
    } catch {
      localStorage.removeItem(key)
    }
  }, [form, key])

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        try {
          localStorage.setItem(key, JSON.stringify(values))
        } catch {
          // storage full or unavailable
        }
      }, debounceMs)
    })
    return () => {
      subscription.unsubscribe()
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [form, key, debounceMs])

  const clearSavedData = useCallback(() => {
    localStorage.removeItem(key)
  }, [key])

  return { clearSavedData, hasSavedData }
}
