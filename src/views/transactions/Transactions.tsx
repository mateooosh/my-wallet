import { useTheme } from 'styled-components'
import { Flex, Grid } from '../../components/styled'
import { FormItem, NavBar, TransactionItem } from '../../components'
import TransactionModel from '../../models/TransactionModel.ts'
import { DatePicker, Input, InputNumber, Select } from 'antd'
import { useSelector } from 'react-redux'
import * as _ from 'lodash'
import CategoryModel from '../../models/CategoryModel.ts'
import { useMemo, useState } from 'react'
import { getDateObject } from '../../utils/utils.ts'
import dayjs from 'dayjs'

function Transactions() {
  const theme = useTheme()

  const [queryFilter, setQueryFilter] = useState('')
  const [categoriesFilter, setCategoriesFilter] = useState([])
  const [dateFromFilter, setDateFromFilter] = useState(null)
  const [dateToFilter, setDateToFilter] = useState(null)
  const [amountFromFilter, setAmountFromFilter] = useState(null)
  const [amountToFilter, setAmountToFilter] = useState(null)

  const categories = useSelector(({ settings }) => settings.categories)
  const currency = useSelector(({ settings }) => settings.currency)
  const transactions = useSelector(({ transactions }) => transactions)

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

    if (queryFilter) {
      result = _.filter(result, (transaction: TransactionModel): boolean => {
        const query = _.lowerCase(queryFilter)
        const categoryMatched: boolean = _.includes(_.lowerCase(transaction.categoryName) as any, query)
        const amountMatched: boolean = _.includes(_.lowerCase(_.toString(transaction.amount)) as any, query)
        const dateMatched: boolean = _.includes(transaction.date as any, query)
        const descriptionMatched: boolean = _.includes(_.lowerCase(transaction.description) as any, query)

        return categoryMatched || amountMatched || dateMatched || descriptionMatched
      })
    }

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
  }, [queryFilter, categoriesFilter, dateFromFilter, dateToFilter, amountFromFilter, amountToFilter, transactions])

  const onQueryFromChange = (event: any): void => {
    setQueryFilter(event.target.value)
  }

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
    <div>
      <NavBar label="Transactions"/>
      <Flex $direction="column" $gap="8px" style={{ padding: 20 }}>
        <FormItem label="Query">
          <Input onChange={onQueryFromChange} size="large"/>
        </FormItem>
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
            <DatePicker onChange={onDateToChange} size="large" minDate={dayjs(dateFromFilter)} defaultValue={dayjs()}/>
          </FormItem>
          <FormItem label="Amount from">
            <InputNumber onChange={onAmountFromChange} size="large" min={-1000000} max={1000000} type="number"
                         suffix={currency} controls={false} style={{ width: '100%' }}/>
          </FormItem>
          <FormItem label="Amount to">
            <InputNumber onChange={onAmountToChange} size="large" min={-1000000} max={1000000} type="number"
                         suffix={currency} controls={false} style={{ width: '100%' }}/>
          </FormItem>
        </Grid>
        <Flex $direction="column" $gap="1px" style={{ backgroundColor: theme.theme.divider }}>
          {/*<H3 style={{ padding: '4px 8px' }}>14 January 2024</H3>*/}
          {filteredTransactions.map(({ categoryName, date, amount, description, id }: TransactionModel, key: number) =>
            <TransactionItem key={key} categoryName={categoryName} description={description} date={date} amount={amount} id={id}/>
          )}
        </Flex>
      </Flex>
    </div>
  )
}

export default Transactions
