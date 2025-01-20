import TransactionModel from '../models/TransactionModel.ts'
import { parseToDayJS } from '../utils/utils.ts'

export const transactions: TransactionModel[] = [
  new TransactionModel(1, 'Shopping', parseToDayJS('14-01-2025'), -256),
  new TransactionModel(2, 'Food', parseToDayJS('14-01-2025'), -156),
  new TransactionModel(3, 'Car', parseToDayJS('05-12-2024'), -800),
  new TransactionModel(4, 'Other', parseToDayJS('15-11-2024'), -350),
  new TransactionModel(5, 'Shopping', parseToDayJS('13-10-2024'), -622)
]