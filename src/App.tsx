import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { TextDisplay } from './components/TextDisplay'
import { InputArea } from './components/InputArea'
import { VirtualKeyboard } from './components/VirtualKeyboard'
import { StatsBar } from './components/StatsBar'
import { Controls } from './components/Controls'
import { ResultCard } from './components/ResultCard'
import { SAMPLE_TEXT } from './data/texts'
import { useTypingEngine } from './hooks/useTypingEngine'
import { useMediaQuery } from './hooks/useMediaQuery'

function App() {
  const engine = useTypingEngine(SAMPLE_TEXT)
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
  }, [])

  const handleStart = () => {
    engine.start()
  }

  const handleReset = () => {
    engine.reset()
  }

  const nextChar =
    engine.phase === 'typing' && engine.typed.length < SAMPLE_TEXT.length
      ? SAMPLE_TEXT[engine.typed.length]
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

        <TextDisplay text={SAMPLE_TEXT} typed={engine.typed} textRef={textRef} />

        <InputArea
          text={SAMPLE_TEXT}
          value={engine.typed}
          disabled={engine.phase !== 'typing'}
          minHeight={textHeight}
          inputRef={inputRef}
          onChange={engine.handleChange}
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

        {engine.phase === 'finished' && (
          <ResultCard
            wpm={engine.wpm}
            accuracy={engine.accuracy}
            onReset={handleReset}
          />
        )}

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
