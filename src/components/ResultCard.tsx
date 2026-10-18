interface ResultCardProps {
  wpm: number
  accuracy: number
  errors: number
  time: string
  onReset: () => void
}

export function ResultCard({ wpm, accuracy, errors, time, onReset }: ResultCardProps) {
  const items = [
    { label: '打字速度', value: `${wpm} WPM` },
    { label: '准确率', value: `${accuracy}%` },
    { label: '错误数', value: String(errors) },
    { label: '用时', value: time },
  ]

  return (
    <section className="card result-card">
      <h2 className="section-title">本次结果</h2>
      <div className="result-grid">
        {items.map((item) => (
          <div className="result-item" key={item.label}>
            <span className="stat-value">{item.value}</span>
            <span className="stat-label">{item.label}</span>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={onReset}>
        再来一次
      </button>
    </section>
  )
}
