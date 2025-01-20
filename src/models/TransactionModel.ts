import { dd_mm_yyyy } from '../utils/utils.ts'
import dayjs from 'dayjs'

export default class TransactionModel {
  id: number
  categoryName: string
  date: string
  amount: number
  description: string
  timestamp: number

  constructor(id: number, categoryName: string = '', date: dayjs = dayjs(), amount: number = undefined, description: string = '') {
    this.id = id
    this.categoryName = categoryName
    this.date = dd_mm_yyyy(date)
    this.amount = amount
    this.description = description
    this.timestamp = new Date().getTime()
  }

  static fromJSON(json: any): TransactionModel {
    return {
      id: json.id,
      categoryName: json.categoryName,
      date: json.date,
      amount: json.amount,
      description: json.description,
      timestamp: json.timestamp
    }
  }

  static toJSON(model: TransactionModel): TransactionModel {
    return {
      id: model.id,
      categoryName: model.categoryName,
      date: model.date,
      amount: model.amount,
      description: model.description,
      timestamp: model.timestamp
    }
  }
}