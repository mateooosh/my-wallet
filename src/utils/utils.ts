import * as _ from 'lodash'

export const formatValue = (value: string | number): string => {
  return _.replace(_.toString(value), /\B(?=(\d{3})+(?!\d))/g, ' ')
}
