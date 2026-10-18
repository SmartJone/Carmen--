export type Finger =
  | 'l-pinky'
  | 'l-ring'
  | 'l-middle'
  | 'l-index'
  | 'r-index'
  | 'r-middle'
  | 'r-ring'
  | 'r-pinky'
  | 'thumb'

export interface KeyDef {
  id: string
  label: string
  finger: Finger
}

export const FINGER_NAMES: Record<Finger, string> = {
  'l-pinky': '左手小指',
  'l-ring': '左手无名指',
  'l-middle': '左手中指',
  'l-index': '左手食指',
  'r-index': '右手食指',
  'r-middle': '右手中指',
  'r-ring': '右手无名指',
  'r-pinky': '右手小指',
  thumb: '拇指',
}

const k = (label: string, finger: Finger): KeyDef => ({
  id: label === ' ' ? 'space' : label.toLowerCase(),
  label,
  finger,
})

export const LEFT_ROWS: KeyDef[][] = [
  [k('`', 'l-pinky'), k('1', 'l-pinky'), k('2', 'l-ring'), k('3', 'l-middle'), k('4', 'l-index'), k('5', 'l-index')],
  [k('q', 'l-pinky'), k('w', 'l-ring'), k('e', 'l-middle'), k('r', 'l-index'), k('t', 'l-index')],
  [k('a', 'l-pinky'), k('s', 'l-ring'), k('d', 'l-middle'), k('f', 'l-index'), k('g', 'l-index')],
  [k('z', 'l-pinky'), k('x', 'l-ring'), k('c', 'l-middle'), k('v', 'l-index'), k('b', 'l-index')],
]

export const RIGHT_ROWS: KeyDef[][] = [
  [k('6', 'r-index'), k('7', 'r-index'), k('8', 'r-middle'), k('9', 'r-ring'), k('0', 'r-pinky'), k('-', 'r-pinky'), k('=', 'r-pinky')],
  [k('y', 'r-index'), k('u', 'r-index'), k('i', 'r-middle'), k('o', 'r-ring'), k('p', 'r-pinky'), k('[', 'r-pinky'), k(']', 'r-pinky'), k('\\', 'r-pinky')],
  [k('h', 'r-index'), k('j', 'r-index'), k('k', 'r-middle'), k('l', 'r-ring'), k(';', 'r-pinky'), k("'", 'r-pinky')],
  [k('n', 'r-index'), k('m', 'r-index'), k(',', 'r-middle'), k('.', 'r-ring'), k('/', 'r-pinky')],
]

export const SPACE_KEY: KeyDef = { id: 'space', label: 'space', finger: 'thumb' }

export const FULL_ROWS: KeyDef[][] = LEFT_ROWS.map((row, i) => [
  ...row,
  ...RIGHT_ROWS[i],
])

export const KEY_FINGER: Record<string, Finger> = (() => {
  const map: Record<string, Finger> = {}
  for (const row of FULL_ROWS) {
    for (const key of row) map[key.id] = key.finger
  }
  map[SPACE_KEY.id] = SPACE_KEY.finger
  return map
})()

export function keyIdOf(ch: string): string | null {
  if (ch === ' ') return 'space'
  if (ch.length !== 1) return null
  return ch.toLowerCase()
}

export function fingerOfChar(ch: string): Finger | null {
  const id = keyIdOf(ch)
  return id === null ? null : (KEY_FINGER[id] ?? null)
}
