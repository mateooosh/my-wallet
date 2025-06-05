import { useTheme } from 'styled-components'
import { Body1, Flex } from '../../components/styled'
import { FormItem, NavBar, TransactionItem } from '../../components'
import TransactionModel from '../../models/TransactionModel.ts'
import { AutoComplete, Button, DatePicker, Input, InputNumber, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import * as _ from 'lodash'
import CategoryModel from '../../models/CategoryModel.ts'
import { useEffect, useMemo, useState } from 'react'
import { dd_mm_yyyy, parseToDayJS } from '../../utils/utils.ts'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getAllUniqDescriptions, getNewTransactionID, getTransactionByID } from '../../store/TransactionsStore.ts'
import './edit-transaction.css'

const { TextArea } = Input

function EditTransaction() {
  const { id } = useParams()
  const location = useLocation()

  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const newTransactionID = useSelector(getNewTransactionID)
  const transactionToEdit: TransactionModel = useSelector((state) => getTransactionByID(state, _.toNumber(id)))

  const [transaction, setTransaction] = useState(_.isNil(id) ? new TransactionModel(newTransactionID) : transactionToEdit)

  const categories = useSelector(({ settings }) => settings.categories)
  const currency = useSelector(({ settings }) => settings.currency)
  const descriptionOptions = useSelector(getAllUniqDescriptions)

  useEffect(() => {
    if (location?.state) {
      onCategoryChange(location.state?.categoryName)
      onAmountChange(-location.state?.amount)
      onDescriptionChange(location.state?.description)
    }
  }, [])

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

  const onDescriptionChange = (description: any): void => {
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      description
    }))
  }

  const autoCompleteFilter = ((inputValue, option) => {
    return option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
  })

  const canSave: boolean = useMemo(() => {
    return !!(transaction.categoryName && transaction.date && transaction.amount)
  }, [transaction])

  const onSave = () => {
    const actionType: string = id ? 'transactions/editTransaction' : 'transactions/addTransaction'
    dispatch({ type: actionType, payload: TransactionModel.toJSON(transaction) })
    navigate('/my-wallet')
  }

  const navBarLabel: string = useMemo(() => _.isNil(id) ? 'Add transaction' : 'Edit transaction', [id])

  return (
    <div>
      <NavBar label={navBarLabel}/>
      <Flex $direction="column" $gap="8px" style={{ padding: 20 }}>
        <FormItem label="Category">
          <Select size="large"
                  value={transaction.categoryName}
                  onChange={onCategoryChange}
                  options={categoriesDataSource}
                  optionRender={optionRender}/>
        </FormItem>

        <FormItem label="Amount">
          <InputNumber value={Math.abs(transaction.amount)} onChange={onAmountChange}
                       size="large" min={-1000000} max={1000000} type="number" suffix={currency} prefix="-"
                       controls={false} style={{ width: '100%' }}/>
        </FormItem>

        <FormItem label="Date">
          <DatePicker onChange={onDateChange} size="large" defaultValue={parseToDayJS(transaction.date)}/>
        </FormItem>

        <FormItem label="Description">
          <AutoComplete value={transaction.description} onChange={onDescriptionChange} size="large"
                        options={descriptionOptions} filterOption={autoCompleteFilter}
          />
          {/*<TextArea value={transaction.description} onChange={onDescriptionChange} size="large"*/}
          {/*          autoSize={{ minRows: 2, maxRows: 2 }}/>*/}
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
