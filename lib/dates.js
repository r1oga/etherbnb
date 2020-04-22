import dateFnsFormat from 'date-fns/format'
import dateFnsParse from 'date-fns/parse'
import { DateUtils } from 'react-day-picker'

export const parseDate = (str, format, locale) => {
  const parsed = dateFnsParse(str, format, new Date(), { locale })
  return DateUtils.isDate(parsed) ? parsed : null
}

export const formatDate = (date, format, locale) =>
  dateFnsFormat(date, format, { locale })

export const format = 'dd MM yyyy'
