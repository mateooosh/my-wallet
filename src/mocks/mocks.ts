import TransactionModel from '../models/TransactionModel.ts'
import { parseToDayJS } from '../utils/utils.ts'

export const transactions: TransactionModel[] = [
  new TransactionModel('Shopping', parseToDayJS('14-01-2025'), -256),
  new TransactionModel('Food', parseToDayJS('14-01-2025'), -156),
  new TransactionModel('Car', parseToDayJS('05-12-2024'), -800),
  new TransactionModel('Other', parseToDayJS('15-11-2024'), -350),
  new TransactionModel('Shopping', parseToDayJS('13-10-2024'), -622)
]