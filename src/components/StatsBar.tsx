interface StatsBarProps {
  accuracy: string
  errors: number
  time: string
  speed: string
}

export function StatsBar({ accuracy, errors, time, speed }: StatsBarProps) {
  const items = [
    { label: '准确率', value: accuracy },
    { label: '错误数', value: String(errors) },
    { label: '用时', value: time },
    { label: '速度', value: speed },
  ]

  return (
    <section className="stats-bar">
      {items.map((item) => (
        <div className="stat-item" key={item.label}>
          <span className="stat-value">{item.value}</span>
          <span className="stat-label">{item.label}</span>
        </div>
      ))}
    </section>
  )
}
