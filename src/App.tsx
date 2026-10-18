import { useRef } from 'react'
import { TextDisplay } from './components/TextDisplay'
import { InputArea } from './components/InputArea'
import { VirtualKeyboard } from './components/VirtualKeyboard'
import { StatsBar } from './components/StatsBar'
import { Controls } from './components/Controls'
import { ResultCard } from './components/ResultCard'
import { SAMPLE_TEXT } from './data/texts'
import { useTypingEngine } from './hooks/useTypingEngine'

function App() {
  const engine = useTypingEngine(SAMPLE_TEXT)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleStart = () => {
    engine.start()
    inputRef.current?.focus()
  }

  const handleReset = () => {
    engine.reset()
    inputRef.current?.focus()
  }

  return (
    <main className="app">
      <h1 className="app-title">打字练习</h1>

      <StatsBar
        accuracy={`${engine.accuracy}%`}
        errors={engine.errorCount}
        time={engine.timeString}
        speed={engine.phase === 'finished' ? `${engine.wpm} WPM` : '—'}
      />

      <TextDisplay text={SAMPLE_TEXT} typed={engine.typed} />

      <InputArea
        value={engine.typed}
        disabled={engine.phase !== 'typing'}
        inputRef={inputRef}
        onChange={engine.handleChange}
      />

      <Controls
        canStart={engine.phase === 'idle'}
        onStart={handleStart}
        onReset={handleReset}
      />

      {engine.phase === 'finished' && (
        <ResultCard
          wpm={engine.wpm}
          accuracy={engine.accuracy}
          errors={engine.errorCount}
          time={engine.timeString}
          onReset={handleReset}
        />
      )}

      <VirtualKeyboard
        nextChar={
          engine.phase === 'typing' && engine.typed.length < SAMPLE_TEXT.length
            ? SAMPLE_TEXT[engine.typed.length]
            : null
        }
      />
    </main>
  )
}

export default App
