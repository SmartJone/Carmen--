import type { RefObject } from 'react'

interface TextDisplayProps {
  text: string
  typed: string
  textRef?: RefObject<HTMLParagraphElement | null>
}

export function TextDisplay({ text, typed, textRef }: TextDisplayProps) {
  return (
    <section className="card">
      <h2 className="section-title">原文</h2>
      <p className="text-display" ref={textRef}>
        {text.split('').map((ch, i) => {
          let cls = 'char'
          if (i < typed.length) {
            cls = typed[i] === ch ? 'char char-correct' : 'char char-wrong'
          } else if (i === typed.length) {
            cls = 'char char-current'
          }
          return (
            <span key={i} className={cls}>
              {ch}
            </span>
          )
        })}
      </p>
    </section>
  )
}
