import { useTheme } from 'styled-components'
import { Body2 } from '../styled'
import { CSSProperties, ReactNode } from 'react'

interface Props {
  style?: CSSProperties,
  children?: ReactNode
}

export function Pill({ style, children }: Props) {
  const { theme } = useTheme()

  return (
    <div style={{ position: 'relative', ...style }} className="pill">
      <div style={{ position: 'absolute', left: -5, top: -2, right: -5, bottom: -2, backgroundColor: theme.danger, borderRadius: 12, zIndex: 0 }}></div>
      <Body2 style={{ color: 'white', zIndex: 2, position: 'relative' }}>
        {children}
      </Body2>
    </div>
  )
}
