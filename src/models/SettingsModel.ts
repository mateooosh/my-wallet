import CategoryModel from './CategoryModel.ts'
import * as _ from 'lodash'

const defaultCategories: CategoryModel[] = [
  // new CategoryModel(1, 'Shopping', 'FaCartShopping', '#FDC323'),
  new CategoryModel(1, 'Shopping', 'FaCartShopping', '#FFA500'),
  new CategoryModel(2, 'Food', 'FaBurger', '#8B4513'),
  new CategoryModel(3, 'Car', 'FaCar', '#58BDFF'),
  new CategoryModel(4, 'Salary', 'FaWallet', '#FF4560'),
  new CategoryModel(5, 'Health', 'FaHeartPulse', '#20C997'),
  new CategoryModel(6, 'Transport', 'FaBusSimple', '#FFD700'),
  new CategoryModel(7, 'Love', 'FaHeart', '#DC143C')


  // 00E396
  // 2F4F4F
  // 8B4513
]

export default class SettingsModel {
  darkMode: boolean
  categories: CategoryModel[]
  limit: number
  currency: string

  constructor(darkMode: boolean, categories: CategoryModel[], limit: number, currency: string) {
    this.darkMode = darkMode || false
    this.categories = categories || defaultCategories
    this.limit = limit || 1000
    this.currency = currency || 'PLN'
  }

  static getCategoriesMap (categories: CategoryModel[]) {
    return _.keyBy(categories, 'name')
  }

  static fromJSON(json: any): Partial<SettingsModel> {
    return {
      darkMode: json.darkMode || false,
      categories: json.categories || defaultCategories,
      limit: json.limit || 1000,
      currency: json.currency || 'PLN'
    }
  }
}