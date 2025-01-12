import { useTheme } from 'styled-components'
import { useEffect, useState } from 'react'

interface Props {
  value: number
}

export function ProgressBar({ value = 0 }: Props) {
  const { theme } = useTheme()

  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedValue(value)
    }, 0)
    return () => clearTimeout(timeout)
  }, [value])

  return (
    <div style={{ height: 5, width: '100%', background: '#009D7A', borderRadius: 16, position: 'relative' }}>
      <div style={{
        width: `${animatedValue}%`,
        height: '100%',
        borderRadius: 16,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: theme.warning,
        transition: 'width 1.8s cubic-bezier(0.4, 0, 0, 1)'
      }}></div>
    </div>
  )
}
