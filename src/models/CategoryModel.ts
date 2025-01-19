import * as _ from 'lodash'

export default class CategoryModel {
  id: number
  name: string
  icon: string
  color: string

  constructor(id: number, name: string, icon: string, color: string) {
    this.id = id
    this.name = name
    this.icon = icon
    this.color = color
  }

  static toJSON(model: CategoryModel): CategoryModel {
    return {
      id: model.id,
      name: model.name,
      icon: model.icon,
      color: model.color
    }
  }
}
