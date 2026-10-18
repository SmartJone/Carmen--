import type { RefObject } from 'react'

interface InputAreaProps {
  text: string
  value: string
  disabled: boolean
  minHeight: number
  inputRef: RefObject<HTMLTextAreaElement | null>
  onChange: (value: string) => void
}

export function InputArea({
  text,
  value,
  disabled,
  minHeight,
  inputRef,
  onChange,
}: InputAreaProps) {
  return (
    <section className="card">
      <h2 className="section-title">输入</h2>
      <div className={`input-stack${disabled ? ' is-disabled' : ''}`}>
        <p
          className="text-display input-ghost"
          style={{ minHeight }}
          aria-hidden="true"
        >
          {value.split('').map((ch, i) => (
            <span
              key={i}
              className={ch === text[i] ? 'char char-correct' : 'char char-wrong'}
            >
              {ch}
            </span>
          ))}
        </p>
        <textarea
          ref={inputRef}
          className="text-display input-layer"
          value={value}
          disabled={disabled}
          spellCheck={false}
          autoCorrect="off"
          autoComplete="off"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </section>
  )
}
