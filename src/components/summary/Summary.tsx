import { Body2, H1, Flex } from '../styled'
import { ProgressBar } from '../progress-bar/ProgressBar.tsx'
import { useTheme } from 'styled-components'
import { useSelector } from 'react-redux'
import { getCurrentMonthBalance } from '../../store/TransactionsStore.ts'
import { useMemo } from 'react'
import _ from 'lodash'

export function Summary() {
  const { theme } = useTheme()
  const currency = useSelector(({ settings }) => settings.currency)
  const limit = useSelector(({ settings }) => settings.limit)
  const currentMonthBalance: number = useSelector(getCurrentMonthBalance)

  const progressValue: number | undefined = useMemo(() => {
    return _.min([_.round(currentMonthBalance / limit * 100), 100])
  }, [limit, currentMonthBalance])

  return (
    <div style={{ backgroundColor: theme.primary, borderRadius: 16, padding: 16 }}>
      <Body2 style={{ color: 'white' }}>Total spendings</Body2>
      <Flex $align="flex-end" $gap="4px" style={{ padding: '3px 0 7px', color: 'white' }}>
        <H1>{currentMonthBalance} / {limit}</H1>
        <Body2>{currency} current month</Body2>
      </Flex>
      <ProgressBar value={progressValue}/>
    </div>
  )
}
