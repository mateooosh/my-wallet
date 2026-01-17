import { useTheme } from 'styled-components'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Body1, Caption2, Flex, H3 } from '../styled'
import { formatValue } from '../../utils/utils.ts'
import { useSelector } from 'react-redux'
import SettingsModel from '../../models/SettingsModel.ts'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import useLongPress from '../../hooks/useLongPress.ts'
import { Dropdown } from 'antd'
import { IconRenderer } from '../icon-renderer/IconRenderer.tsx'
import { useOutsideEvents } from '../../hooks/useOutsideEvents.ts'

interface Props {
  categoryName: string
  amount?: number
  date?: string
  description?: string
  backgroundColor?: string
  id?: number
  showContextMenu?: boolean
}

export function TransactionItem({ categoryName, amount = null, date, description, backgroundColor = null, id, showContextMenu = false }: Props) {
  const { theme, font } = useTheme()
  const navigate = useNavigate()

  const currency = useSelector(({ settings }) => settings.currency)
  const categoriesMap = useSelector(({ settings }) => SettingsModel.getCategoriesMap(settings.categories))
  const icon: string = useMemo(() => categoriesMap[categoryName]?.icon || 'FaQuestion', [categoriesMap, categoryName])
  const iconColor: string = useMemo(() => categoriesMap[categoryName]?.color || theme.primary, [categoriesMap, categoryName])

  const [IconComponent, setIconComponent] = useState(null)
  const containerRef = useRef(null)

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

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [pos, setPos] = useState<any>({ x: 0, y: 0 })

  const onLongPress = (e) => {
    const x = e.clientX || (e.touches?.[0]?.clientX ?? 0)
    const y = e.clientY || (e.touches?.[0]?.clientY ?? 0)
    setPos({ x, y })
    setDropdownOpen(true)
  }

  const dropdownOptions = [
    { key: 'clone', label: <Body1>Clone</Body1>, icon: <div><IconRenderer icon="FaHeartPulse" color={font.tertiary} size="24px"/></div> },
    { type: 'divider' },
    { key: 'remove', label: <Body1>Remove</Body1>, icon: <div><IconRenderer icon="FaXmark" color={theme.danger} size="24px"/></div>, danger: true }
  ]

  const onDropdownOptionClick = ({ key }) => {
    if (key === 'clone') {
      navigate(`/my-wallet/transaction`, {
        state: { categoryName, amount , date, description, backgroundColor , id }
      })
    }
  }

  const longPressEvent = showContextMenu ? useLongPress(onLongPress, onClick, 500) : {}

  useOutsideEvents(containerRef, () => setDropdownOpen(false))

  return (
    <>
      {showContextMenu &&
        <Dropdown
          menu={{ items: dropdownOptions, onClick: onDropdownOptionClick }}
          open={dropdownOpen}
          onOpenChange={setDropdownOpen}
          trigger={[]}
          getPopupContainer={() => document.body}>
          <div style={{
            position: 'absolute',
            top: pos.y,
            left: pos.x,
            width: 0,
            height: 0,
            zIndex: 1000
          }}
          />
        </Dropdown>
      }

      <Flex {...longPressEvent} $gap="8px" $align="center" ref={containerRef}
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
    </>
  )
}
