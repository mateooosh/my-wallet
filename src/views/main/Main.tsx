import { Summary } from '../../components/summary/Summary.tsx'
import { Body2, H1 } from '../../components/styled/fonts.ts'
import { Flex } from '../../components/styled/flexbox.ts'
import { useTheme } from 'styled-components'
import { Chart } from '../../components/chart/Chart.tsx'
import { CategoryItem } from '../../components/category-item/CategoryItem.tsx'
import { TransactionItem } from '../../components/transaction-item/TransactionItem.tsx'
import Documentation from '../documentation/Documentation.tsx'
import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { transactions } from '../../mocks/mocks.ts'
import * as _ from 'lodash'
import TransactionModel from '../../models/TransactionModel.ts'

const dataSource = [
  {
    value: 720,
    label: "Jul"
  },
  {
    value: 935,
    label: "Aug"
  },
  {
    value: 550,
    label: "Sep"
  },
  {
    value: 300,
    label: "Oct"
  }
]

function Main() {
  const theme = useTheme()
  const navigate = useNavigate()

  const goToDocumentation = (): void => {
    navigate('/documentation')
  }

  const spendings: TransactionModel[] = useMemo(() => {
    return _.filter(transactions, (transaction: TransactionModel): boolean => transaction.amount < 0)
  }, [transactions])

  const totalSpending: number = useMemo(() => {
    return Math.abs(_.sumBy(spendings, 'amount'))
  }, [spendings])

  const spendingsByCategorySum = useMemo(() => {
    const spendingsByCategory = _.reduce(spendings, (result: any, spending: TransactionModel): any => {
      if (!result[spending.categoryName]) {
        result[spending.categoryName] = []
      }

      result[spending.categoryName].push(spending)

      return result
    }, {})

    return _.mapValues(spendingsByCategory, (categorySpendings: TransactionModel[]) => {
      return Math.abs(_.sumBy(categorySpendings, 'amount'))
    })
  }, [spendings])

  const spendingDetails = useMemo(() => {
    return _.reverse(_.sortBy(_.map(_.keys(spendingsByCategorySum), (categoryName) => {
      return {
        categoryName,
        amount: spendingsByCategorySum[categoryName],
        percentage: _.round(spendingsByCategorySum[categoryName] / totalSpending * 100, 1)
      }
    }), 'amount'))
  }, [spendingsByCategorySum, totalSpending])

  return (
    <Flex $direction="column" $gap="16px">
      <button onClick={goToDocumentation}>Go to documentation</button>
      <Summary/>
      {/*<Flex $align="center" $justify="center" $gap="16px">*/}
      {/*  <FaAngleLeft color="grey"/>*/}
      {/*  <H2 style={{ color: 'grey', textAlign: 'center' }}>March 2024</H2>*/}
      {/*  <FaAngleRight color="grey"/>*/}
      {/*</Flex>*/}
      <H1>Spending breakdown</H1>
      <Chart dataSource={dataSource}/>

      <H1>Spending details</H1>
      <Flex $direction="column" $gap="4px">
        {spendingDetails.map((detail, key) =>
          <CategoryItem key={key} categoryName={detail.categoryName} amount={detail.amount}
                        percentage={detail.percentage}/>
        )}
      </Flex>

      <Flex $align="flex-end">
        <Flex $grow="1">
          <H1>Last transactions</H1>
        </Flex>
        <Body2 onClick={() => navigate('/transactions')}>See all</Body2>
      </Flex>
      <Flex $direction="column" $gap="1px" style={{ backgroundColor: theme.theme.divider }}>
        {transactions.slice(0, 4).map(({ categoryName, date, amount }: TransactionModel, key: number) =>
          <TransactionItem key={key} categoryName={categoryName} date={date} amount={amount}/>
        )}
      </Flex>

      <Documentation/>
    </Flex>
  )
}

export default Main
