export default class TransactionModel {
  categoryName: string
  date: string
  amount: number

  constructor(categoryName: string, date: string, amount: number) {
    this.categoryName = categoryName
    this.date = date
    this.amount = amount
  }
}