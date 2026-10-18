interface ControlsProps {
  canStart: boolean
  onStart: () => void
  onReset: () => void
}

export function Controls({ canStart, onStart, onReset }: ControlsProps) {
  return (
    <section className="controls">
      <button className="btn btn-primary" onClick={onStart} disabled={!canStart}>
        开始
      </button>
      <button className="btn" onClick={onReset}>
        重来
      </button>
    </section>
  )
}
