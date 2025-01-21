import { useTheme } from 'styled-components'
import { useEffect, useMemo, useState } from 'react'
import { Body1, Caption2, Flex, H3 } from '../styled'
import { formatValue } from '../../utils/utils.ts'
import { useSelector } from 'react-redux'
import SettingsModel from '../../models/SettingsModel.ts'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'

interface Props {
  categoryName: string
  amount?: number
  date?: string
  description?: string
  backgroundColor?: string
  id?: number
}

export function TransactionItem({ categoryName, amount = null, date, description, backgroundColor = null, id }: Props) {
  const { theme, font } = useTheme()
  const navigate = useNavigate()

  const currency = useSelector(({ settings }) => settings.currency)
  const categoriesMap = useSelector(({ settings }) => SettingsModel.getCategoriesMap(settings.categories))
  const icon: string = useMemo(() => categoriesMap[categoryName]?.icon || 'FaQuestion', [categoriesMap, categoryName])
  const iconColor: string = useMemo(() => categoriesMap[categoryName]?.color || theme.primary, [categoriesMap, categoryName])

  const [IconComponent, setIconComponent] = useState(null)

  const amountColor: string = useMemo((): string => amount >= 0 ? theme.primary : '#B50000', [amount])

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

  const onClick = () => {
    if (!_.isNil(id))
      navigate(`/my-wallet/transaction/${id}`)
  }

  return (
    <Flex onClick={onClick} $gap="8px" $align="center"
          style={{ backgroundColor: backgroundColor || theme.background, padding: '3px 0' }}>
      {IconComponent ? <Flex $justify="center" $align="center"
                             style={{ height: 30, width: 30, borderRadius: 30, backgroundColor: iconColor, zIndex: 2 }}>
        <IconComponent size="18px" color="white"/></Flex> : null
      }
      <Flex $direction="column" $grow="1">
        <Body1>{description || categoryName}</Body1>
        <Caption2 style={{ color: font.secondary }}>{date}</Caption2>
      </Flex>
      {amount && <H3 style={{ color: amountColor }}>{formatValue(amount)} {currency}</H3>}
    </Flex>
  )
}
