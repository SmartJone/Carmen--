interface ResultCardProps {
  wpm: number
  accuracy: number
  onReset: () => void
}

function grade(wpm: number, accuracy: number) {
  if (accuracy >= 98 && wpm >= 60) return { rank: 'S', msg: '职业级手速！' }
  if (accuracy >= 95 && wpm >= 40) return { rank: 'A', msg: '又快又稳！' }
  if (accuracy >= 90 && wpm >= 25) return { rank: 'B', msg: '节奏不错，继续保持' }
  return { rank: 'C', msg: '稳扎稳打，慢慢提速' }
}

export function ResultCard({ wpm, accuracy, onReset }: ResultCardProps) {
  const g = grade(wpm, accuracy)

  return (
    <section className="card result-card">
      <h2 className="section-title">本次结果</h2>
      <div className={`result-badge rank-${g.rank}`}>{g.rank}</div>
      <p className="result-msg">
        {g.msg} · {wpm} WPM
      </p>
      <button className="btn btn-primary" onClick={onReset}>
        再来一次
      </button>
    </section>
  )
}
