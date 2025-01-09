import { useTheme } from 'styled-components'
import { Flex } from '../styled/flexbox.ts'
import { Body1 } from '../styled/fonts.ts'
import { ChartBar } from './ChartBar.tsx'
import { ChartLimit } from './chartLimit.ts'
import { Pill } from '../pill/Pill.tsx'

interface DataSourceItem {
  value: number
  label: string
}

interface Props {
  dataSource: Array<DataSourceItem>
}

export function Chart({ dataSource }: Props) {
  const { theme } = useTheme()

  return (
    <Flex $gap="16px">
      <Flex $direction="column" $align="center" $gap="32px" style={{ paddingBottom: 22 }}>
        <Pill>900</Pill>
        <Body1>600</Body1>
        <Body1>300</Body1>
        <Body1>0</Body1>
      </Flex>
      <Flex $gap="16px" $grow="1" style={{ position: 'relative' }}>
        {dataSource.map((item, index) =>
          <ChartBar key={index} caption={item.label} value={item.value} height={(item.value / 1000) * 100 + '%'}/>
        )}
        <ChartLimit/>
      </Flex>
    </Flex>
  )
}
