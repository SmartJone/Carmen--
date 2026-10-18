export interface RunRecord {
  id: number
  index: number
  wpm: number
  accuracy: number
  time: string
}

interface ResultCardProps {
  records: RunRecord[]
  onReset: () => void
}

function grade(wpm: number, accuracy: number) {
  if (accuracy >= 98 && wpm >= 60) return { rank: 'S', msg: '职业级手速！' }
  if (accuracy >= 95 && wpm >= 40) return { rank: 'A', msg: '又快又稳！' }
  if (accuracy >= 90 && wpm >= 25) return { rank: 'B', msg: '节奏不错，继续保持' }
  return { rank: 'C', msg: '稳扎稳打，慢慢提速' }
}

const SLOT_COUNT = 5

export function ResultCard({ records, onReset }: ResultCardProps) {
  const latest = records[0]
  const g = latest ? grade(latest.wpm, latest.accuracy) : null
  const slots: (RunRecord | null)[] = [
    ...records,
    ...Array(Math.max(0, SLOT_COUNT - records.length)).fill(null),
  ]

  return (
    <section className="card result-card">
      <h2 className="section-title">近五次数据</h2>

      {g && latest ? (
        <>
          <p className="result-msg">
            {g.msg} · {latest.wpm} WPM · {latest.accuracy}%
          </p>
        </>
      ) : (
        <>
          <p className="result-msg">完成一次练习后开始记录</p>
        </>
      )}

      <div className="result-head">
        <span>轮次</span>
        <span>速度</span>
        <span>准确率</span>
        <span>用时</span>
      </div>

      <ul className="result-list">
        {slots.map((r, i) => {
          if (!r) {
            return (
              <li key={`empty-${i}`} className="result-row is-empty">
                <span className="result-order">—</span>
                <span>—</span>
                <span>—</span>
                <span>—</span>
              </li>
            )
          }
          return (
            <li key={r.id} className={i === 0 ? 'result-row is-latest' : 'result-row'}>
              <span className="result-order">第{r.index}次</span>
              <span>{r.wpm} WPM</span>
              <span>{r.accuracy}%</span>
              <span>{r.time}</span>
            </li>
          )
        })}
      </ul>

      <button className="btn btn-primary" onClick={onReset}>
        再来一次
      </button>
    </section>
  )
}
