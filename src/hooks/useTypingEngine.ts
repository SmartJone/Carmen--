import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type Phase = 'idle' | 'typing' | 'paused' | 'finished'

function formatTime(ms: number) {
  const total = Math.floor(ms / 1000)
  const m = String(Math.floor(total / 60)).padStart(2, '0')
  const s = String(total % 60).padStart(2, '0')
  return `${m}:${s}`
}

export function useTypingEngine(text: string) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [typed, setTyped] = useState('')
  const [elapsedMs, setElapsedMs] = useState(0)
  const [isComposing, setIsComposing] = useState(false)
  const accumulatedRef = useRef(0)
  const segmentStartRef = useRef<number | null>(null)
  const timerRef = useRef<number | null>(null)

  const currentElapsed = useCallback(() => {
    const running =
      segmentStartRef.current === null
        ? 0
        : Date.now() - segmentStartRef.current
    return accumulatedRef.current + running
  }, [])

  useEffect(() => {
    if (phase !== 'typing') return
    timerRef.current = window.setInterval(() => {
      setElapsedMs(currentElapsed())
    }, 200)
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current)
    }
  }, [phase, currentElapsed])

  const start = useCallback(() => {
    if (phase !== 'idle') return
    accumulatedRef.current = 0
    segmentStartRef.current = Date.now()
    setElapsedMs(0)
    setPhase('typing')
    setTyped('')
  }, [phase])

  const pause = useCallback(() => {
    if (phase !== 'typing') return
    accumulatedRef.current = currentElapsed()
    segmentStartRef.current = null
    setElapsedMs(accumulatedRef.current)
    setPhase('paused')
  }, [phase, currentElapsed])

  const resume = useCallback(() => {
    if (phase !== 'paused') return
    segmentStartRef.current = Date.now()
    setPhase('typing')
  }, [phase])

  const reset = useCallback(() => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current)
    accumulatedRef.current = 0
    segmentStartRef.current = null
    setPhase('idle')
    setTyped('')
    setElapsedMs(0)
    setIsComposing(false)
  }, [])

  const handleChange = useCallback(
    (value: string) => {
      if (phase !== 'typing') return
      if (isComposing) {
        setTyped(value)
        return
      }
      const next = value.slice(0, text.length)
      setTyped(next)
      if (next.length === text.length && next === text) {
        if (timerRef.current !== null) window.clearInterval(timerRef.current)
        accumulatedRef.current = currentElapsed()
        segmentStartRef.current = null
        setElapsedMs(accumulatedRef.current)
        setPhase('finished')
      }
    },
    [phase, text, currentElapsed, isComposing],
  )

  const handleCompositionStart = useCallback(() => {
    setIsComposing(true)
  }, [])

  const handleCompositionEnd = useCallback((_e?: unknown) => {
    setIsComposing(false)
  }, [])

  const { correctCount, errorCount } = useMemo(() => {
    let correct = 0
    let errors = 0
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === text[i]) correct++
      else errors++
    }
    return { correctCount: correct, errorCount: errors }
  }, [typed, text])

  const streak = useMemo(() => {
    let n = 0
    for (let i = typed.length - 1; i >= 0; i--) {
      if (typed[i] === text[i]) n++
      else break
    }
    return n
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
    streak,
    accuracy,
    wpm,
    timeString: formatTime(elapsedMs),
    start,
    pause,
    resume,
    reset,
    handleChange,
    handleCompositionStart,
    handleCompositionEnd,
  }
}
