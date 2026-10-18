import { useEffect, useState } from 'react'
import { KEY_FINGER, keyIdOf } from '../data/keyboard'

export function usePressedKey() {
  const [pressedKey, setPressedKey] = useState<string | null>(null)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return
      const id = keyIdOf(e.key)
      if (id && id in KEY_FINGER) setPressedKey(id)
    }
    const onKeyUp = () => setPressedKey(null)

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return pressedKey
}
