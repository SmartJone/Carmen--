import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { TextDisplay } from './components/TextDisplay'
import { InputArea } from './components/InputArea'
import { VirtualKeyboard } from './components/VirtualKeyboard'
import { StatsBar } from './components/StatsBar'
import { Controls } from './components/Controls'
import { ResultCard, type RunRecord } from './components/ResultCard'
import { getRandomText } from './data/texts'
import { useTypingEngine } from './hooks/useTypingEngine'
import { useMediaQuery } from './hooks/useMediaQuery'

function App() {
  const [currentText, setCurrentText] = useState(getRandomText)
  const engine = useTypingEngine(currentText)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const wide = useMediaQuery('(min-width: 1180px)')

  useEffect(() => {
    if (engine.phase === 'typing') inputRef.current?.focus()
  }, [engine.phase])

  const textRef = useRef<HTMLParagraphElement | null>(null)
  const [textHeight, setTextHeight] = useState(0)

  useLayoutEffect(() => {
    const el = textRef.current
    if (!el) return
    const update = () => setTextHeight(el.offsetHeight)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [currentText])

  const handleStart = () => {
    engine.start()
  }

  const handleReset = () => {
    setCurrentText(getRandomText())
    engine.reset()
  }

  const [history, setHistory] = useState<RunRecord[]>([])
  const runCountRef = useRef(0)
  const idRef = useRef(1)
  const lastPhaseRef = useRef(engine.phase)

  useEffect(() => {
    if (engine.phase === 'finished' && lastPhaseRef.current !== 'finished') {
      runCountRef.current += 1
      const record: RunRecord = {
        id: idRef.current++,
        index: runCountRef.current,
        wpm: engine.wpm,
        accuracy: engine.accuracy,
        time: engine.timeString,
      }
      setHistory((prev) => [record, ...prev].slice(0, 5))
    }
    lastPhaseRef.current = engine.phase
  }, [engine.phase, engine.wpm, engine.accuracy, engine.timeString])

  const nextChar =
    engine.phase === 'typing' && engine.typed.length < currentText.length
      ? currentText[engine.typed.length]
      : null

  return (
    <div className={wide ? 'layout layout-wide' : 'layout'}>
      {wide && (
        <aside className="side-kb side-kb-left">
          <VirtualKeyboard side="left" nextChar={nextChar} streak={engine.streak} />
        </aside>
      )}

      <main className="app">
        <h1 className="app-title">改善二指禅</h1>

        <StatsBar
          accuracy={`${engine.accuracy}%`}
          errors={engine.errorCount}
          time={engine.timeString}
          speed={engine.phase === 'finished' ? `${engine.wpm} WPM` : '—'}
        />

        <TextDisplay text={currentText} typed={engine.typed} textRef={textRef} />

        <InputArea
          text={currentText}
          value={engine.typed}
          disabled={engine.phase !== 'typing'}
          minHeight={textHeight}
          inputRef={inputRef}
          onChange={engine.handleChange}
          onCompositionStart={engine.handleCompositionStart}
          onCompositionEnd={engine.handleCompositionEnd}
        />

        <Controls
          canStart={engine.phase === 'idle'}
          paused={engine.phase === 'paused'}
          canPause={engine.phase === 'typing'}
          onStart={handleStart}
          onPause={engine.pause}
          onResume={engine.resume}
          onReset={handleReset}
        />

        <ResultCard records={history} onReset={handleReset} />

        {!wide && (
          <VirtualKeyboard side="full" nextChar={nextChar} streak={engine.streak} />
        )}
      </main>

      {wide && (
        <aside className="side-kb side-kb-right">
          <VirtualKeyboard side="right" nextChar={nextChar} streak={engine.streak} />
        </aside>
      )}
    </div>
  )
}

export default App
