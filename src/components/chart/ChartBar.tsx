import { useTheme } from 'styled-components'
import { Body2, Flex } from '../styled'
import { useEffect, useMemo, useState } from 'react'

interface Props {
  caption: string
  value: number
  height: number
  limit: number,
  isSelected: boolean,
  onBarClick: () => void
}

export function ChartBar({ caption, value, height, limit, isSelected, onBarClick }: Props) {
  const { theme } = useTheme()

  const isOverLimit: boolean = useMemo((): boolean => {
    return value >= limit
  }, [value, limit])

  const barBackground: string = useMemo((): string => {
    if (isOverLimit) {
      return isSelected ? theme.dangerSelected : theme.danger
    } else {
      return isSelected ? theme.primarySelected : theme.primary
    }
  }, [isOverLimit, isSelected])

  const [animatedHeight, setAnimatedHeight] = useState<number>(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedHeight(height)
    }, 0)
    return () => clearTimeout(timeout)
  }, [height])

  const showValue: boolean = useMemo(() => {
    return height > 14
  }, [height])

  return (
    <Flex $direction="column" $gap="8px" $grow="1" $shrink="1" $basis="0" $justify="end"
          style={{ position: 'relative', minWidth: 50 }}>
      <Flex onClick={onBarClick} $align="flex-end" $justify="center" style={{ backgroundColor: barBackground, borderRadius: 6, height: animatedHeight + '%', color: 'white', zIndex: 1, transition: 'height 1s cubic-bezier(0.4, 0, 0, 1)' }}>
        {showValue &&
          <span style={{ marginBottom: 8 }}>{ value }</span>
        }
      </Flex>
      <Flex $justify="center" style={{ position: 'absolute', left: '50%', bottom: -26, transform: 'translateX(-50%)' }}>
        <Body2>{caption}</Body2>
      </Flex>
    </Flex>
  )
}
