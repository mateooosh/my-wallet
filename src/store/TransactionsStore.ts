import { createSlice } from '@reduxjs/toolkit'
import TransactionModel from '../models/TransactionModel.ts'
import _ from 'lodash'
import { getLast4Months, sortByDate } from '../utils/utils.ts'

const STORAGE_KEY = 'my-wallet|transactions'

const transactions = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: transactions,
  // initialState: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [],
  reducers: {
    addTransaction: (state, { payload }) => {
      const result = [payload, ...state].sort(sortByDate)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result))
      return result
    },

    editTransaction: (state, { payload }) => {
      const index: number = _.findIndex(state, ['id', payload.id])
      const result = [...state]
      result[index] = payload
      return result
    },

    clearState: () => {
      localStorage.removeItem(STORAGE_KEY)
      return []
    }
  }
})

export const getNewTransactionID = (state): number => {
  return (_.maxBy(state.transactions, 'id')?.id + 1) || 0
}

export const getTransactionByID = (state: any, id: number): TransactionModel => {
  return _.find(state.transactions, ['id', id]) as TransactionModel
}

export const getMappedTransactions = (state): { [key: string]: { [key: string]: TransactionModel[] } } => {
  const groupedByYear = _.groupBy(state.transactions, (transaction: TransactionModel) => _.split(transaction.date, '-')[2])
  const groupedByYearAndMonth = _.mapValues(groupedByYear, (transactions) => _.groupBy(transactions, (transaction: TransactionModel) => _.split(transaction.date, '-')[1]))
  return groupedByYearAndMonth
}

export const getTransactionsSumForLast4Months = (state) => {
  const months: number = 4
  const result = []
  const d: Date = new Date()
  d.setDate(1)

  for (let i: number = 0; i < months; i++) {
    const yearKey: number = d.getFullYear()
    const monthKey: string = _.padStart(_.toString(d.getMonth() + 1), 2, '0')
    let allTransactionsInMonth: any = getMappedTransactions(state)?.[yearKey]?.[monthKey]

    let valuesByMonth = _.reduce(allTransactionsInMonth, (result, transaction: TransactionModel) => {
      return result + transaction.amount
    }, 0)

    result.push({
      value: Math.abs(_.round(valuesByMonth, 1)),
      label: getLast4Months()[i]
    })
    d.setMonth(d.getMonth() - 1)
  }

  return _.reverse(result)
}

export const getCurrentMonthBalance = (state): number => {
  const d: Date = new Date()
  const yearKey: number = d.getFullYear()
  const monthKey: string = _.padStart(_.toString(d.getMonth() + 1), 2, '0')
  const currentMonthTransactions = getMappedTransactions(state)?.[yearKey]?.[monthKey]
  return _.reduce(currentMonthTransactions, (result, transaction: TransactionModel) => {
    return result + Math.abs(transaction.amount)
  }, 0)
}

export const getAllUniqDescriptions = (state) => {
  return _.map(_.uniq(_.map(state.transactions, 'description')).sort(), (description) => {
    return { value: description }
  })
}

export default transactionsSlice.reducer
