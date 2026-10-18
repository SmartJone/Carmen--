import {
  FINGER_NAMES,
  FULL_ROWS,
  LEFT_ROWS,
  RIGHT_ROWS,
  SPACE_KEY,
  fingerOfChar,
  keyIdOf,
  type KeyDef,
} from '../data/keyboard'
import { usePressedKey } from '../hooks/usePressedKey'

type Side = 'left' | 'right' | 'full'

interface VirtualKeyboardProps {
  side?: Side
  nextChar: string | null
  streak: number
}

const ROWS: Record<Side, KeyDef[][]> = {
  left: LEFT_ROWS,
  right: RIGHT_ROWS,
  full: FULL_ROWS,
}

const TITLES: Record<Side, string> = {
  left: '左手',
  right: '右手',
  full: '键盘',
}

export function VirtualKeyboard({
  side = 'full',
  nextChar,
  streak,
}: VirtualKeyboardProps) {
  const pressedKey = usePressedKey()
  const nextKey = nextChar === null ? null : keyIdOf(nextChar)
  const nextFinger = nextChar === null ? null : fingerOfChar(nextChar)

  const keyClass = (key: KeyDef) => {
    const cls = ['kb-key', `finger-${key.finger}`]
    if (pressedKey === key.id) cls.push('kb-active')
    else if (nextKey === key.id) cls.push('kb-next')
    return cls.join(' ')
  }

  const renderSpace = () => (
    <div className="kb-row kb-row-space">
      <span className={keyClass(SPACE_KEY)}>{SPACE_KEY.label}</span>
    </div>
  )

  return (
    <section className={`card kb-card kb-${side}`}>
      <h2 className="section-title">{TITLES[side]}</h2>

      <div className="keyboard">
        {ROWS[side].map((row, r) => (
          <div className="kb-row" key={r}>
            {row.map((key) => (
              <span className={keyClass(key)} key={key.id}>
                {key.label}
              </span>
            ))}
          </div>
        ))}
        {renderSpace()}
      </div>

      <p className="kb-tip">
        {nextFinger ? (
          <>
            用 <b>{FINGER_NAMES[nextFinger]}</b> 敲
          </>
        ) : (
          '点击开始'
        )}
      </p>

      {streak > 1 && <p className="kb-streak">连击 x{streak}</p>}
    </section>
  )
}
