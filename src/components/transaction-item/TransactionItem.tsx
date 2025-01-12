import { useTheme } from 'styled-components'
import { useEffect, useMemo, useState } from 'react'
import { Flex } from '../styled/flexbox.ts'
import { Body1, Caption2, H3 } from '../styled/fonts.ts'
import { formatValue } from '../../utils/utils.ts'
import { useSelector } from 'react-redux'

interface Props {
  icon: string
  categoryName: string
  amount: number
  backgroundColor: string
  date: string
}

export function TransactionItem({ icon, categoryName, amount, backgroundColor, date }: Props) {
  const { theme, font } = useTheme()
  const currency = useSelector(state => state.currency)

  const [IconComponent, setIconComponent] = useState(null)

  const amountColor: string = useMemo((): string => amount >= 0 ? theme.primary: '#B50000', [amount])

  useEffect(() => {
    async function loadIcon() {
      try {
        const { [icon]: DynamicIcon } = await import('react-icons/fa6')
        setIconComponent(() => DynamicIcon)
      } catch (error) {
        console.error(`Error loading icon ${icon}:`, error)
      }
    }

    loadIcon()
  }, [icon])

  return (
    <Flex $gap="8px" $align="center" style={{ backgroundColor: theme.background, padding: '3px 0' }}>
      {IconComponent ? <Flex $justify="center" $align="center" style={{ height: 30, width: 30, borderRadius: 30, backgroundColor, zIndex: 2 }}><IconComponent size="18px" color="white"/></Flex> : null}
      <Flex $direction="column" $grow="1">
        <Body1>{categoryName}</Body1>
        <Caption2 style={{ color: font.secondary }}>{date}</Caption2>
      </Flex>
      <H3 style={{ color: amountColor }}>{formatValue(amount)} {currency}</H3>
    </Flex>
  )
}
