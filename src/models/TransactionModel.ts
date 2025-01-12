export default class TransactionModel {
  icon: string
  categoryName: string
  date: string
  amount: number
  backgroundColor: string

  constructor(icon: string, categoryName: string, date: string, amount: number, backgroundColor: string) {
    this.icon = icon
    this.categoryName = categoryName
    this.date = date
    this.amount = amount
    this.backgroundColor = backgroundColor
  }
}