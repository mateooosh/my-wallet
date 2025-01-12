import { useTheme } from 'styled-components'
import { useEffect, useState } from 'react'
import { Flex } from '../styled/flexbox.ts'
import { Body1, Body2 } from '../styled/fonts.ts'

interface Props {
  icon: string
  categoryName: string
  amount: string
  percentage: number
  backgroundColor: string
}

export function CategoryItem({ icon, categoryName, amount, percentage, backgroundColor }: Props) {
  const { theme } = useTheme()

  const [IconComponent, setIconComponent] = useState(null)
  const [animatedPercentage, setAnimatedPercentage] = useState(0)

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


  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedPercentage(percentage)
    }, 0)
    return () => clearTimeout(timeout)
  }, [percentage])


  return (
    <Flex $gap="8px"  $align="center" style={{ height: 52, position: 'relative', paddingLeft: 8 }}>
      {IconComponent ? <Flex $justify="center" $align="center" style={{ height: 36, width: 36, borderRadius: 30, backgroundColor, zIndex: 2 }}><IconComponent size="22px" color="white"/></Flex> : null}
      <Flex $grow="1" style={{ zIndex: 2 }}>
        <Body1>{categoryName}</Body1>
      </Flex>
      <Flex $direction="column" $align="flex-end" style={{ zIndex: 2 }}>
        <Body1>{amount}</Body1>
        <Body2>{percentage}%</Body2>
      </Flex>

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${animatedPercentage}%`,
        bottom: 0,
        borderRadius: 8,
        backgroundColor,
        opacity: .3,
        zIndex: 1,
        transition: 'width 1.8s cubic-bezier(0.4, 0, 0, 1)'
      }}></div>
    </Flex>
  )
}
