interface ControlsProps {
  canStart: boolean
  paused: boolean
  canPause: boolean
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onReset: () => void
}

export function Controls({
  canStart,
  paused,
  canPause,
  onStart,
  onPause,
  onResume,
  onReset,
}: ControlsProps) {
  return (
    <section className="controls">
      <button className="btn btn-primary" onClick={onStart} disabled={!canStart}>
        开始
      </button>
      <button
        className="btn btn-pause"
        onClick={paused ? onResume : onPause}
        disabled={!paused && !canPause}
      >
        {paused ? '继续' : '暂停'}
      </button>
      <button className="btn" onClick={onReset}>
        重来
      </button>
    </section>
  )
}
