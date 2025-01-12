import { Body2, H1 } from '../styled/fonts.ts'
import { ProgressBar } from '../progress-bar/ProgressBar.tsx'
import { useTheme } from 'styled-components'
import { Flex } from '../styled/flexbox.ts'
import { useSelector } from 'react-redux'

export function Summary() {
  const { theme } = useTheme()
  const currency = useSelector(state => state.currency)

  return (
    <div style={{ backgroundColor: theme.primary, borderRadius: 16, padding: 16 }}>
      <Body2 style={{ color: 'white' }}>Total spendings</Body2>
      <Flex $align="flex-end" $gap="4px" style={{ padding: '3px 0 7px', color: 'white' }}>
        <H1>1000 / 2500</H1>
        <Body2>{currency} per month</Body2>
      </Flex>
      <ProgressBar value={50}/>
    </div>
  )
}
