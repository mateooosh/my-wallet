import { useTheme } from 'styled-components'
import { Body2, Flex } from '../styled'
import { ChartBar } from './ChartBar.tsx'
import { ChartLimit } from './chartLimit.ts'
import { useMemo } from 'react'
import * as _ from 'lodash'
import { useSelector } from 'react-redux'

interface DataSourceItem {
  value: number
  label: string
}

interface Props {
  dataSource: Array<DataSourceItem>
}


export function Chart({ dataSource }: Props) {
  const { theme } = useTheme()

  const limit = useSelector(({ settings }) => settings.limit)

  const generateYAxisLabels = (maxValue: number): number[]  => {
    const numberOfSteps: number = 4
    const step: number = maxValue / (numberOfSteps - 1)
    return _.reverse(_.range(numberOfSteps).map(i => Math.round(i * step)))
  }

  const max = useMemo(() => _.max([_.maxBy(dataSource, 'value').value, limit]), [dataSource])

  const yAxis: number[] = useMemo(() => {
    return generateYAxisLabels(max)

  }, [dataSource])

  return (
    <Flex $gap="16px" style={{ paddingBottom: 24 }}>
      <Flex $direction="column" $align="center" $gap="32px">
        {yAxis.map((label: number, key: number) =>
          <Body2 key={key}>{label}</Body2>
        )}
      </Flex>
      <Flex $gap="16px" $grow="1" style={{ position: 'relative' }}>
        {dataSource.map((item: DataSourceItem, key: number) =>
          <ChartBar key={key} caption={item.label} value={item.value} height={(item.value / max) * 100} limit={limit}/>
        )}
        <ChartLimit $limitHeight={limit / max * 100}/>
      </Flex>
    </Flex>
  )
}
