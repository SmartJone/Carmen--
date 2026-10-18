interface TextDisplayProps {
  text: string
  typed: string
}

export function TextDisplay({ text, typed }: TextDisplayProps) {
  return (
    <section className="card">
      <h2 className="section-title">原文</h2>
      <p className="text-display">
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
