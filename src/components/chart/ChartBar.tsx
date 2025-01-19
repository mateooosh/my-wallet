import { useTheme } from 'styled-components'
import { Body2, Flex } from '../styled'
import { useEffect, useMemo, useState } from 'react'

interface Props {
  caption: string
  value: number
  height: number
  limit: number
}

export function ChartBar({ caption, value, height, limit }: Props) {
  const { theme } = useTheme()

  const isOverLimit: boolean = useMemo((): boolean => {
    return value >= limit
  }, [value, limit])

  const barBackground: string = useMemo((): string => {
    return isOverLimit ? theme.danger : theme.primary
  }, [isOverLimit])

  const [animatedHeight, setAnimatedHeight] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedHeight(height)
    }, 0)
    return () => clearTimeout(timeout)
  }, [height])

  return (
    <Flex $direction="column" $gap="8px" $grow="1" $justify="end" style={{ position: 'relative' }}>
      <Flex $align="flex-end" $justify="center" style={{ backgroundColor: barBackground, borderRadius: 6, height: animatedHeight + '%', color: 'white', zIndex: 1, paddingBottom: 8, transition: 'height 1s cubic-bezier(0.4, 0, 0, 1)' }}>{ value }</Flex>
      <Flex $justify="center" style={{ position: 'absolute', left: '50%', bottom: -26, transform: 'translateX(-50%)' }}>
        <Body2>{ caption }</Body2>
      </Flex>
    </Flex>
  )
}
