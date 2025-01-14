import * as _ from 'lodash'

export const formatValue = (value: any): string => {
  return _.replace(_.toString(value), /\B(?=(\d{3})+(?!\d))/g, ' ')
}

export const getDateObject = (dateString: string): Date => {
  const [day, month, year] = dateString.split("-")
  const formattedDate: string = `${year}-${month}-${day}`
  return new Date(formattedDate)
}
