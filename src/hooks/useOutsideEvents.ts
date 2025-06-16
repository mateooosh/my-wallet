import { useEffect } from 'react'

export function useOutsideEvents(ref, onClose) {
  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose()
      }
    }

    const handleScroll = () => {
      onClose()
    }

    const handleEscape = event => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchdown', handleClickOutside)
    document.addEventListener('scroll', handleScroll, true)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('scroll', handleScroll, true)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [ref, onClose])
}
