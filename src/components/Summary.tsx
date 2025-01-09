import { Body1, H1 } from './styled/fonts.ts'
import { ProgressBar } from './ProgressBar.tsx'
import { useTheme } from 'styled-components'
import { Flex } from './styled/flexbox.ts'

export function Summary() {
  const { theme } = useTheme()

  return (
    <div style={{ backgroundColor: theme.primary, borderRadius: 16, padding: 16 }}>
      <Body1 style={{ color: 'white' }}>Total spendings</Body1>
      <Flex $align="flex-end" $gap="4px" style={{ padding: '3px 0 7px', color: 'white' }}>
        <H1>1000 / 2500</H1>
        <Body1>PLN per month</Body1>
      </Flex>
      <ProgressBar value={50}/>
    </div>
  )
}
