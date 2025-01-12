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
}
