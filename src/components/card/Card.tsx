import { useTheme } from 'styled-components'
import { Flex, H3 } from '../styled'
import { ReactNode, useEffect, useState } from 'react'
import { FaAngleRight } from 'react-icons/fa6'

interface Props {
  icon?: string,
  iconColor?: string,
  left?: ReactNode,
  children?: ReactNode,
  right?: ReactNode,
  onClick?: any
}

export function Card({ icon, iconColor, left, children, right, onClick }: Props) {
  const { theme, font } = useTheme()

  const [IconComponent, setIconComponent] = useState(null)

  useEffect(() => {
    async function loadLeftSlot() {
      if (icon) {
        try {
          const { [icon]: DynamicIcon } = await import('react-icons/fa6')
          setIconComponent(() => DynamicIcon)
        } catch (error) {
          console.error(`Error loading icon ${icon}:`, error)
        }
        return
      }

      if (left) {
        return left
      }

      return null
    }

    loadLeftSlot()
  }, [icon])

  return (
    <Flex $gap="8px" $align="center" style={{ height: 48 }} onClick={onClick}>
      {IconComponent ? <Flex $justify="center" $align="center"
                             style={{ height: 32, width: 32, borderRadius: 30, backgroundColor: iconColor, zIndex: 2 }}>
        <IconComponent size="18px" color="white"/></Flex> : left
      }
      <Flex $grow="1" $shrink="1" $basis="0"><H3>{children}</H3></Flex>
      {right ? right : <FaAngleRight color={font.tertiary}/>}
    </Flex>
  )
}
