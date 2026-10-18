import { useEffect, useMemo, useState } from 'react'

const ROWS = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
]

function keyIdOf(ch: string): string | null {
  if (ch === ' ') return 'space'
  if (ch.length !== 1) return null
  return ch.toLowerCase()
}

interface VirtualKeyboardProps {
  nextChar: string | null
}

export function VirtualKeyboard({ nextChar }: VirtualKeyboardProps) {
  const [pressed, setPressed] = useState<string | null>(null)

  const allKeys = useMemo(
    () => new Set([...ROWS.flat(), 'space', 'Shift']),
    [],
  )

  const nextKey = nextChar !== null ? keyIdOf(nextChar) : null

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return
      const id = keyIdOf(e.key)
      if (id && allKeys.has(id)) setPressed(id)
    }
    const onKeyUp = () => setPressed(null)

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [allKeys])

  const cls = (key: string) => {
    if (pressed === key) return 'kb-key kb-active'
    if (nextKey === key) return 'kb-key kb-next'
    return 'kb-key'
  }

  return (
    <section className="card kb-card">
      <h2 className="section-title">键盘</h2>
      <div className="keyboard">
        {ROWS.map((row, r) => (
          <div className={`kb-row kb-row-${r}`} key={r}>
            {r === 3 && <span className="kb-key kb-wide kb-inert">Shift</span>}
            {row.map((key) => (
              <span className={cls(key)} key={key}>
                {key}
              </span>
            ))}
            {r === 3 && <span className="kb-key kb-wide kb-inert">Shift</span>}
          </div>
        ))}
        <div className="kb-row">
          <span className={cls('space') + ' kb-space'}>space</span>
        </div>
      </div>
      <p className="kb-hint">黄色 = 下一个要按的键，按键时会亮起</p>
    </section>
  )
}
