import { useTheme } from 'styled-components'
import { Body1, Flex } from '../../components/styled'
import { FormItem, NavBar, TransactionItem } from '../../components'
import TransactionModel from '../../models/TransactionModel.ts'
import { Button, DatePicker, Input, InputNumber, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import * as _ from 'lodash'
import CategoryModel from '../../models/CategoryModel.ts'
import { useMemo, useState } from 'react'
import { dd_mm_yyyy, parseToDayJS } from '../../utils/utils.ts'
import { useNavigate } from 'react-router-dom'

const { TextArea } = Input

function EditTransaction() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [transaction, setTransaction] = useState(new TransactionModel(''))

  const categories = useSelector(({ settings }) => settings.categories)
  const currency = useSelector(({ settings }) => settings.currency)

  const categoriesDataSource = useMemo(() => {
    return _.map(categories, (category: CategoryModel) => {
      return {
        value: category.name,
        label: category.name
      }
    })
  }, [categories])

  const optionRender = (option) => {
    const category = _.find(categories, ['name', option.value])
    return <TransactionItem categoryName={category.name} backgroundColor="transparent"/>
  }

  const onCategoryChange = (categoryName: string): void => {
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      categoryName
    }))
  }

  const onAmountChange = (amount: number): void => {
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      amount: -amount
    }))
  }

  const onDateChange = (date): void => {
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      date: dd_mm_yyyy(date)
    }))
  }

  const onDescriptionChange = (event: any): void => {
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      description: event.target.value
    }))
  }

  const canSave: boolean = useMemo(() => {
    return !!(transaction.categoryName && transaction.date && transaction.amount)
  }, [transaction])

  const onSave = () => {
    dispatch({ type: 'transactions/addTransaction', payload: TransactionModel.toJSON(transaction) })
    navigate('/')
  }

  return (
    <div>
      <NavBar label="Add transaction"/>
      <Flex $direction="column" $gap="8px" style={{ padding: 20 }}>
        <FormItem label="Category">
          <Select size="large"
                  onChange={onCategoryChange}
                  options={categoriesDataSource}
                  optionRender={optionRender}/>
        </FormItem>

        <FormItem label="Amount">
          <InputNumber onChange={onAmountChange} size="large" min={-1000000} max={1000000} type="number"
                       suffix={currency} prefix="-" controls={false} style={{ width: '100%' }}/>
        </FormItem>

        <FormItem label="Date">
          <DatePicker onChange={onDateChange} size="large" defaultValue={parseToDayJS(transaction.date)}/>
        </FormItem>

        <FormItem label="Description">
          <TextArea onChange={onDescriptionChange} size="large" autoSize={{ minRows: 2, maxRows: 2 }}/>
        </FormItem>

        <Button onClick={onSave} disabled={!canSave} type="primary" size="large"
                style={{ background: canSave ? theme.theme.primary : '', marginTop: 12 }}>
          <Body1>Save</Body1>
        </Button>
      </Flex>
    </div>
  )
}

export default EditTransaction
