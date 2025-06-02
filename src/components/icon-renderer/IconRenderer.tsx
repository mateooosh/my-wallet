import { useEffect, useState } from 'react'
import { Flex } from '../styled'

export function IconRenderer({ icon, color, size = 30 }) {
  const [DynamicIcon, setDynamicIcon] = useState(null)

  useEffect(() => {
    async function loadIcon() {
      try {
        const { [icon]: Icon } = await import('react-icons/fa6')
        setDynamicIcon(() => Icon)
      } catch (error) {
        console.error(`Error loading icon ${icon}:`, error)
      }
    }

    loadIcon()
  }, [icon])

  return DynamicIcon ? (
    <Flex
      $justify="center"
      $align="center"
      style={{
        height: size,
        width: size,
        borderRadius: 30,
        backgroundColor: color,
        zIndex: 2
      }}
    >
      <DynamicIcon size="18px" color="white"/>
    </Flex>
  ) : null
}
