import { useTheme } from 'styled-components'
import { H1 } from '../../components/styled/fonts.ts'
import { Flex } from '../../components/styled/flexbox.ts'
import { TransactionItem } from '../../components/transaction-item/TransactionItem.tsx'
import { transactions } from '../../mocks/mocks.ts'
import TransactionModel from '../../models/TransactionModel.ts'
import { Grid } from '../../components/styled/grid.ts'
import { FormItem } from '../../components/form-item/FormItem.tsx'
import { DatePicker, InputNumber, Select } from 'antd'
import { useSelector } from 'react-redux'
import * as _ from 'lodash'
import CategoryModel from '../../models/CategoryModel.ts'
import { useMemo, useState } from 'react'
import { getDateObject } from '../../utils/utils.ts'
import dayjs from 'dayjs'

function Transactions() {
  const theme = useTheme()

  const [categoriesFilter, setCategoriesFilter] = useState([])
  const [dateFromFilter, setDateFromFilter] = useState(null)
  const [dateToFilter, setDateToFilter] = useState(null)
  const [amountFromFilter, setAmountFromFilter] = useState(null)
  const [amountToFilter, setAmountToFilter] = useState(null)

  const categories = useSelector(state => state.categories)

  const categoriesDataSource = useMemo(() => {
    return _.map(categories, (category: CategoryModel) => {
      return {
        value: category.name,
        label: category.name
      }
    })
  }, [categories])

  const filteredTransactions: TransactionModel[] = useMemo(() => {
    let result: TransactionModel[] = transactions

    if (_.size(categoriesFilter)) {
      result = _.filter(result, (transaction: TransactionModel) => _.includes(categoriesFilter, transaction.categoryName))
    }

    if (dateFromFilter) {
      const dateFrom: Date = new Date(dateFromFilter)
      result = _.filter(result, (transaction: TransactionModel): boolean => getDateObject(transaction.date) >= dateFrom)
    }

    if (dateToFilter) {
      const dateTo: Date = new Date(dateToFilter)
      result = _.filter(result, (transaction: TransactionModel): boolean => getDateObject(transaction.date) <= dateTo)
    }

    if (amountFromFilter) {
      result = _.filter(result, (transaction: TransactionModel): boolean => transaction.amount >= amountFromFilter)
    }

    if (amountToFilter) {
      result = _.filter(result, (transaction: TransactionModel): boolean => transaction.amount <= amountToFilter)
    }

    return result
  }, [categoriesFilter, dateFromFilter, dateToFilter, amountFromFilter, amountToFilter, transactions])


  const onCategoriesChange = (categories): void => {
    setCategoriesFilter(categories)
  }

  const onDateFromChange = (date, dateString): void => {
    setDateFromFilter(dateString)
  }

  const onDateToChange = (date, dateString): void => {
    setDateToFilter(dateString)
  }

  const onAmountFromChange = (amount): void => {
    setAmountFromFilter(amount)
  }

  const onAmountToChange = (amount): void => {
    setAmountToFilter(amount)
  }

  const optionRender = (option) => {
    const category = _.find(categories, ['name', option.value])
    return <TransactionItem categoryName={category.name} backgroundColor="transparent"/>
  }

  return (
    <Flex $direction="column" $gap="16px">
      <H1>Transactions</H1>
      <FormItem label="Category">
        <Select size="large"
                mode="multiple"
                onChange={onCategoriesChange}
                options={categoriesDataSource}
                optionRender={optionRender}/>
      </FormItem>

      <Grid $columns="1fr 1fr" $gap="16px">
        <FormItem label="From">
          <DatePicker onChange={onDateFromChange} size="large" maxDate={dayjs(dateToFilter)}/>
        </FormItem>
        <FormItem label="To">
          <DatePicker onChange={onDateToChange} size="large" minDate={dayjs(dateFromFilter)}/>
        </FormItem>
        <FormItem label="Amount from">
          <InputNumber onChange={onAmountFromChange} size="large" min={-1000000} max={1000000} type="number" style={{ width: '100%' }}/>
        </FormItem>
        <FormItem label="Amount to">
          <InputNumber onChange={onAmountToChange} size="large" min={-1000000} max={1000000} type="number" style={{ width: '100%' }}/>
        </FormItem>
      </Grid>
      <Flex $direction="column" $gap="1px" style={{ backgroundColor: theme.theme.divider }}>
        {/*<H3 style={{ padding: '4px 8px' }}>14 January 2024</H3>*/}
        {filteredTransactions.map(({ categoryName, date, amount }: TransactionModel, key: number) =>
          <TransactionItem key={key} categoryName={categoryName} date={date} amount={amount}/>
        )}
      </Flex>
    </Flex>
  )
}

export default Transactions
