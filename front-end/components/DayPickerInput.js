import DayPickerInput from 'react-day-picker/DayPickerInput'
import dateFnsFormat from 'date-fns/format'

import { formatDate, parseDate, format } from '../lib/dates'

export default ({ dayPickerProps, placeholder, onDayChange, date }) => {
  return (
    <DayPickerInput
      formatDate={formatDate}
      format={format}
      parseDate={parseDate}
      dayPickerProps={dayPickerProps}
      placeholder={placeholder}
      onDayChange={onDayChange}
      value={date}
    />
  )
}
