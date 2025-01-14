import TransactionModel from '../models/TransactionModel.ts'

export const transactions: TransactionModel[] = [
  new TransactionModel('Shopping', '14-01-2025', -256),
  new TransactionModel('Food', '14-01-2025', -156),
  new TransactionModel('Car', '13-01-2025', -100),
  new TransactionModel('Salary', '13-01-2025', 3660),
  new TransactionModel('Shopping', '13-01-2025', -122)
]