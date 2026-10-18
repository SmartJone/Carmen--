import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type Phase = 'idle' | 'typing' | 'finished'

function formatTime(ms: number) {
  const total = Math.floor(ms / 1000)
  const m = String(Math.floor(total / 60)).padStart(2, '0')
  const s = String(total % 60).padStart(2, '0')
  return `${m}:${s}`
}

export function useTypingEngine(text: string) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [typed, setTyped] = useState('')
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [elapsedMs, setElapsedMs] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (phase !== 'typing' || startedAt === null) return
    timerRef.current = window.setInterval(() => {
      setElapsedMs(Date.now() - startedAt)
    }, 200)
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current)
    }
  }, [phase, startedAt])

  const start = useCallback(() => {
    if (phase !== 'idle') return
    setStartedAt(Date.now())
    setElapsedMs(0)
    setPhase('typing')
  }, [phase])

  const reset = useCallback(() => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current)
    setPhase('idle')
    setTyped('')
    setStartedAt(null)
    setElapsedMs(0)
  }, [])

  const handleChange = useCallback(
    (value: string) => {
      if (phase !== 'typing') return
      const next = value.slice(0, text.length)
      setTyped(next)
      if (next.length === text.length) {
        if (timerRef.current !== null) window.clearInterval(timerRef.current)
        setElapsedMs(startedAt === null ? 0 : Date.now() - startedAt)
        setPhase('finished')
      }
    },
    [phase, startedAt, text],
  )

  const { correctCount, errorCount } = useMemo(() => {
    let correct = 0
    let errors = 0
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === text[i]) correct++
      else errors++
    }
    return { correctCount: correct, errorCount: errors }
  }, [typed, text])

  const accuracy =
    typed.length === 0 ? 100 : Math.round((correctCount / typed.length) * 100)

  const wpm =
    elapsedMs > 0 ? Math.round(correctCount / 5 / (elapsedMs / 60000)) : 0

  return {
    phase,
    typed,
    correctCount,
    errorCount,
    accuracy,
    wpm,
    timeString: formatTime(elapsedMs),
    start,
    reset,
    handleChange,
  }
}
