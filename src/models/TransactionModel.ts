import { dd_mm_yyyy } from '../utils/utils.ts'
import dayjs from 'dayjs'

export default class TransactionModel {
  categoryName: string
  date: string
  amount: number
  description: string
  timestamp: number

  constructor(categoryName: string = '', date: dayjs = dayjs(), amount: number = 0, description: string = '') {
    this.categoryName = categoryName
    this.date = dd_mm_yyyy(date)
    this.amount = amount
    this.description = description
    this.timestamp = new Date().getTime()
  }

  static fromJSON(json: any): Partial<TransactionModel> {
    return {
      categoryName: json.categoryName,
      date: json.date,
      amount: json.amount,
      description: json.description,
      timestamp: json.timestamp
    }
  }

  static toJSON(model: TransactionModel): TransactionModel {
    return {
      categoryName: model.categoryName,
      date: model.date,
      amount: model.amount,
      description: model.description,
      timestamp: model.timestamp
    }
  }
}