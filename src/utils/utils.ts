import * as _ from 'lodash'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export const formatValue = (value: any): string => {
  return _.replace(_.toString(value), /\B(?=(\d{3})+(?!\d))/g, ' ')
}

// toDo do zmiany, zamienić na dayjs
export const getDateObject = (dateString: string): Date => {
  const [day, month, year] = dateString.split("-")
  const formattedDate: string = `${year}-${month}-${day}`
  return new Date(formattedDate)
}

export const dd_mm_yyyy = (date: dayjs): string => {
  return date && date.format('DD-MM-YYYY')
}

export const parseToDayJS = (dateString: string): dayjs => {
  return dayjs(dateString, 'DD-MM-YYYY')
}

export const sortByDate = (a, b) => {
  const dateA = parseToDayJS(a.date)
  const dateB = parseToDayJS(b.date)
  return dateB - dateA
}

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const getLast4Months = (): string[] => {
  const result: string[] = []
  const d: Date = new Date()
  d.setDate(1)

  for (let i: number = 0; i < 4; i++) {
    result.push(MONTHS[d.getMonth()])
    d.setMonth(d.getMonth() - 1)
  }

  return result
}