import { useTheme } from 'styled-components'
import { Body2, Flex } from '../styled'
import { ChartBar } from './ChartBar.tsx'
import { ChartLimit } from './chartLimit.ts'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as _ from 'lodash'
import { useSelector } from 'react-redux'
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

  const chartRef = useRef<HTMLDivElement>(null)

  const limit = useSelector(({ settings }) => settings.limit)
  const [yAxisWidth, setYAxisWidth] = useState(30)

  const generateYAxisLabels = (maxValue: number): number[] => {
    const numberOfSteps: number = 4
    const step: number = maxValue / (numberOfSteps - 1)
    const generatedLabels = _.range(numberOfSteps).map(i => Math.round(i * step))

    const closestIndex: number = generatedLabels.reduce((closestIdx: number, currentValue: number, index: number) => {
      const acceptableDiff: number = 0.14
      const diff: number = Math.abs(currentValue - limit) / max
      if (diff > acceptableDiff) {
        return closestIdx
      }

      return index
    }, -1)

    if (closestIndex > -1)
      generatedLabels.splice(closestIndex, 1)

    generatedLabels.push(limit)

    return generatedLabels
  }

  const max = useMemo(() => _.max([_.maxBy(dataSource, 'value').value, limit]), [dataSource])

  const yAxis: number[] = useMemo(() => {
    return generateYAxisLabels(max)
  }, [dataSource, limit])

  useEffect(() => {
    if (chartRef.current) {
      const yLabels = chartRef.current.getElementsByClassName('label-y')
      const pillWidth: number = chartRef.current.querySelector('.pill div').getBoundingClientRect().width
      const allWidths: number[] = [..._.map(yLabels, (labelElem) => labelElem.getBoundingClientRect().width), pillWidth]
      const maxWidth: number = _.max(allWidths) as number
      setYAxisWidth(maxWidth)
    }
  }, [dataSource, limit])

  return (
    <Flex $gap="16px" style={{ paddingBottom: 24, height: 200 }} ref={chartRef}>
      <Flex $direction="column" $align="center" $justify="space-between" style={{ width: yAxisWidth, position: 'relative' }}>
        {yAxis.map((value: number, key: number) =>
          value !== limit ? (
            <Body2 key={key} className="label-y" style={{ position: 'absolute', bottom: value * 100 / max + '%', transform: 'translateY(50%)' }}>{value}</Body2>
          ) : <Pill key={key} style={{ position: 'absolute', bottom: value * 100 / max + '%', transform: 'translateY(50%)' }}>{value}</Pill>
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
