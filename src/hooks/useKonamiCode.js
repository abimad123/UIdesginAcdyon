import { useEffect, useState, useCallback } from 'react'

const KONAMI_CODE = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a',
]

export function useKonamiCode(onSuccess) {
  const [position, setPosition] = useState(0)

  const handleKeyDown = useCallback(
    (e) => {
      // Do not interfere if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return
      }

      const key = e.key.toLowerCase()
      const expected = KONAMI_CODE[position]

      if (key === expected) {
        if (position === KONAMI_CODE.length - 1) {
          onSuccess()
          setPosition(0)
        } else {
          setPosition(position + 1)
        }
      } else if (key === KONAMI_CODE[0]) {
        // Handle repeated first keys gracefully (e.g., up up up)
        setPosition(1)
      } else {
        // Reset on incorrect key
        setPosition(0)
      }
    },
    [position, onSuccess]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
