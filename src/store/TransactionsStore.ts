import { createSlice } from '@reduxjs/toolkit'
import TransactionModel from '../models/TransactionModel.ts'
import _ from 'lodash'
import { transactions } from '../mocks/mocks.ts'
import { getLast4Months, sortByDate } from '../utils/utils.ts'

const STORAGE_KEY = 'transactions'

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: _.map(transactions, TransactionModel.toJSON),
  // initialState: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [],
  reducers: {
    addTransaction: (state, { payload }) => {
      return [payload, ...state].sort(sortByDate)
    }
  }
})

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

export default transactionsSlice.reducer
