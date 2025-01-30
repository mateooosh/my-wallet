import { CategoryItem, Chart, Summary, TransactionItem } from '../../components'
import { Body2, Flex, H1 } from '../../components/styled'
import { useTheme } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import * as _ from 'lodash'
import TransactionModel from '../../models/TransactionModel.ts'
import { useSelector } from 'react-redux'
import { getTransactionsSumForLast4Months } from '../../store/TransactionsStore.ts'

function Main() {
  const theme = useTheme()
  const navigate = useNavigate()

  const transactions = useSelector(({ transactions }) => transactions)
  const transactionsSumForLast4Months = useSelector(getTransactionsSumForLast4Months)

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
    <Flex $direction="column" $gap="16px" style={{ padding: 20 }}>
      <Summary/>
      <H1>Spending breakdown</H1>
      <Chart dataSource={transactionsSumForLast4Months}/>

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
        <Body2 onClick={() => navigate('/my-wallet/transactions')}>See all</Body2>
      </Flex>
      <Flex $direction="column" $gap="1px" style={{ backgroundColor: theme.theme.divider }}>
        {transactions.slice(0, 5).map(({ categoryName, date, amount, description, id }: TransactionModel, key: number) =>
          <TransactionItem key={key} categoryName={categoryName} date={date} amount={amount} description={description} id={id}/>
        )}
      </Flex>
    </Flex>
  )
}

export default Main
