import { useTheme } from 'styled-components'
import { Flex } from '../styled/flexbox.ts'
import { Body1 } from '../styled/fonts.ts'

interface Props {
  caption: string,
  value: number,
  height: string
}

export function ChartBar({ caption, value, height }: Props) {
  const { theme } = useTheme()

  return (
    <Flex $direction="column" $gap="8px" $grow="1" $justify="end">
      <Flex $align="flex-end" $justify="center" style={{ backgroundColor: theme.primary, borderRadius: 6, height, color: 'white', zIndex: 1, paddingBottom: 8 }}>{ value }</Flex>
      <Flex $justify="center">
        <Body1>{ caption }</Body1>
      </Flex>
    </Flex>
  )
}
