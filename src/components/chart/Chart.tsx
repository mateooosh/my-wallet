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
  id: string
}

interface Props {
  dataSource: Array<DataSourceItem>
  onSelectedBarChange: (selectedIndex: string) => void
}

export function Chart({ dataSource, onSelectedBarChange }: Props) {
  const { theme } = useTheme()

  const chartRef = useRef<HTMLDivElement>(null)
  const scrollableContainer = useRef<HTMLDivElement>(null)

  const limit = useSelector(({ settings }) => settings.limit)
  const [yAxisWidth, setYAxisWidth] = useState<number>(30)
  const [selectedBarId, setSelectedBarId] = useState<string>(null)

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

  useEffect(() => {
    // scroll to right
    scrollableContainer.current.scrollLeft = scrollableContainer.current.scrollWidth
  }, [])

  useEffect(() => {
    onSelectedBarChange(selectedBarId)
  }, [selectedBarId])

  const onBarClick = (barId: string): void => {
    setSelectedBarId(selectedBarId === barId ? null : barId)
  }

  return (
    <Flex $gap="16px" style={{ height: 200 }} ref={chartRef}>
      <Flex $direction="column" $align="center" $justify="space-between" style={{ width: yAxisWidth, position: 'relative', marginBottom: 24 }}>
        {yAxis.map((value: number, key: number) =>
          value !== limit ? (
            <Body2 key={key} className="label-y" style={{ position: 'absolute', bottom: value * 100 / max + '%', transform: 'translateY(50%)' }}>{value}</Body2>
          ) : <Pill key={key} style={{ position: 'absolute', bottom: value * 100 / max + '%', transform: 'translateY(50%)' }}>{value}</Pill>
        )}
      </Flex>
      <div style={{ width: '100%' }}>
        <Flex className="hide-scrollbar" ref={scrollableContainer}
              style={{ height: '100%', overflowX: 'auto', overflowY: 'hidden', paddingBottom: 26, paddingTop: 2, paddingLeft: 8, paddingRight: 8 }}>
          <Flex $grow="1" $shrink="1" $basis="0" $gap="16px" style={{ position: 'relative' }}>
            {dataSource.map((item: DataSourceItem, key: number) =>
              <ChartBar key={key} caption={item.label} value={item.value} height={(item.value / max) * 100} limit={limit} isSelected={selectedBarId === item.id} onBarClick={() => onBarClick(item.id)}/>
            )}
            {yAxis.map((value: number, key: number) =>
              <ChartLimit key={key}
                          $limitHeight={value / max * 100}
                          $height={value === limit ? 2 : 1}
                          $background={value === limit ? theme.danger : theme.divider}/>
            )}
          </Flex>
        </Flex>
      </div>
    </Flex>
  )
}
