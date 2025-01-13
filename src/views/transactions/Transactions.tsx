import { useTheme } from 'styled-components'
import { H1 } from '../../components/styled/fonts.ts'
import { Flex } from '../../components/styled/flexbox.ts'
import { TransactionItem } from '../../components/transaction-item/TransactionItem.tsx'
import { transactions } from '../../mocks/mocks.ts'
import TransactionModel from '../../models/TransactionModel.ts'
import { Grid } from '../../components/styled/grid.ts'
import { DatePicker, InputNumber, Select } from 'antd'
import { useSelector } from 'react-redux'
import * as _ from 'lodash'
import CategoryModel from '../../models/CategoryModel.ts'
import { useMemo } from 'react'
import { CategoryItem } from '../../components/category-item/CategoryItem.tsx'

function Transactions() {
  const theme = useTheme()

  const categories = useSelector(state => state.categories)

  const categoriesDataSource = useMemo(() => {
    return _.map(categories, (category: CategoryModel) => {
      return {
        value: category.name,
        label: category.name
      }
    })
  }, [categories])

  const onFromChange = (date, dateString): void => {
    console.log(date, dateString)
  }

  const onToChange = (date, dateString): void => {
    console.log(date, dateString)
  }

  const optionRender = (option) => {
    const category = _.find(categories, ['name', option.value])
    return <TransactionItem categoryName={category.name} backgroundColor="transparent"/>
  }

  return (
    <Flex $direction="column" $gap="16px">
      <H1>Transactions</H1>
      <div>Type (segmented controls)</div>
      <div>Category</div>
      <Flex $direction="column" $gap="4px">
        <Select size="large"
                mode="multiple"
                options={categoriesDataSource}
                optionRender={optionRender}
        />
      </Flex>

      <Grid $columns="1fr 1fr" $gap="16px">
        <Flex $direction="column" $gap="4px">
          <div>From</div>
          <DatePicker onChange={onFromChange} size="large"/>
        </Flex>
        <Flex $direction="column" $gap="4px">
          <div>To</div>
          <DatePicker onChange={onToChange} size="large"/>
        </Flex>
        <Flex $direction="column" $gap="4px">
          <div>Amount from</div>
          <InputNumber size="large" min={-1000000} max={1000000} style={{ width: '100%' }}/>
        </Flex>
        <Flex $direction="column" $gap="4px">
          <div>Amount to</div>
          <InputNumber size="large" min={-1000000} max={1000000} style={{ width: '100%' }}/>
        </Flex>
      </Grid>
      <Flex $direction="column" $gap="1px" style={{ backgroundColor: theme.theme.divider }}>
        {/*<H3 style={{ padding: '4px 8px' }}>14 January 2024</H3>*/}
        {transactions.map(({ categoryName, date, amount }: TransactionModel, key: number) =>
          <TransactionItem key={key} categoryName={categoryName} date={date} amount={amount}/>
        )}
      </Flex>
    </Flex>
  )
}

export default Transactions
