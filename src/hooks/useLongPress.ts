import { useCallback, useRef, useState } from 'react'

const useLongPress = (onLongPress, onClick, delay = 300) => {
  const [longPressTriggered, setLongPressTriggered] = useState<boolean>(false)
  const [moved, setMoved] = useState<boolean>(false)
  const timeout = useRef<any>(null)
  const target = useRef<any>(null)

  const start = useCallback(event => {
      if (event.target) {
        event.target.addEventListener('touchend', preventDefault, { passive: false })
        target.current = event.target
      }
      timeout.current = setTimeout(() => {
        onLongPress(event)
        setLongPressTriggered(true)
      }, delay)
    },
    [onLongPress, delay]
  )

  const move = useCallback(() => {
    clearTimeout(timeout.current)
    setMoved(true)
  }, [timeout])

  const clear = useCallback((event, shouldTriggerClick = true) => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    if (shouldTriggerClick && !longPressTriggered && !moved) {
      onClick(event)
    }

    setLongPressTriggered(false)

    if (target.current) {
      target.current.removeEventListener('touchend', preventDefault)
    }
  }, [onClick, longPressTriggered, timeout, moved])

  return {
    onMouseDown: e => start(e),
    onTouchStart: e => start(e),
    onMouseUp: e => clear(e),
    onMouseLeave: e => clear(e, false),
    onTouchEnd: e => clear(e),
    onMouseMove: () => move(),
    onTouchMove: () => move()
  }
}

const isTouchEvent = event => {
  return 'touches' in event
}

const preventDefault = event => {
  if (!isTouchEvent(event)) return

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault()
  }
}

export default useLongPress