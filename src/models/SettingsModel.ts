import CategoryModel from './CategoryModel.ts'
import * as _ from 'lodash'

const defaultCategories: CategoryModel[] = [
  new CategoryModel(1, 'Car', 'FaCar', '#58BDFF'),
  new CategoryModel(2, 'Travel', 'FaPlaneDeparture', '#03A9F4'),
  new CategoryModel(3, 'Health', 'FaHeartPulse', '#20C997'),
  new CategoryModel(4, 'Transport', 'FaBusSimple', '#FFD700'),
  new CategoryModel(5, 'Shopping', 'FaCartShopping', '#FFA500'),
  new CategoryModel(6, 'Entertainment', 'FaGamepad', '#FF4081'),
  new CategoryModel(7, 'Media', 'FaTv', '#FF6347'),
  // new CategoryModel(8, 'Love', 'FaHeart', '#DC143C'),
  new CategoryModel(8, 'Gifts', 'FaGift', '#DC143C'),
  new CategoryModel(9, 'Food', 'FaBurger', '#8B4513'),
  new CategoryModel(10, 'Other', 'FaQuestion', '#B0BEC5')
]

// 00E396
// 2F4F4F
// 8B4513
// 2979FF

export default class SettingsModel {
  darkMode: boolean
  categories: CategoryModel[]
  limit: number
  currency: string

  constructor(darkMode: boolean, categories: CategoryModel[], limit: number, currency: string) {
    this.darkMode = darkMode || false
    this.categories = categories || defaultCategories
    this.limit = limit || 700
    this.currency = currency || 'PLN'
  }

  static getCategoriesMap(categories: CategoryModel[]) {
    return _.keyBy(categories, 'name')
  }

  static fromJSON(json: any): SettingsModel {
    return {
      darkMode: json.darkMode || false,
      categories: json.categories || defaultCategories,
      limit: json.limit || 700,
      currency: json.currency || 'PLN'
    }
  }

  static toJSON(model: SettingsModel): SettingsModel {
    return {
      darkMode: model.darkMode,
      categories: _.map(model.categories, CategoryModel.toJSON),
      limit: model.limit,
      currency: model.currency
    }
  }
}