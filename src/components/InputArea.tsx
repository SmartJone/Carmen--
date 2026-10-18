import type { RefObject } from 'react'

interface InputAreaProps {
  value: string
  disabled: boolean
  inputRef: RefObject<HTMLInputElement | null>
  onChange: (value: string) => void
}

export function InputArea({ value, disabled, inputRef, onChange }: InputAreaProps) {
  return (
    <section className="card">
      <h2 className="section-title">输入</h2>
      <input
        ref={inputRef}
        className="typing-input"
        type="text"
        value={value}
        disabled={disabled}
        placeholder="点击“开始”后在这里输入原文…"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        onChange={(e) => onChange(e.target.value)}
      />
    </section>
  )
}
