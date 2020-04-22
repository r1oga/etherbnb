import DayPickerInput from 'react-day-picker/DayPickerInput'
import dateFnsFormat from 'date-fns/format'

import { formatDate, parseDate, format } from '../lib/dates'

export default () => (
  <DayPickerInput
    formatDate={formatDate}
    format={format}
    parseDate={parseDate}
    placeHolder={`${dateFnsFormat(new Date(), format)}`}
    dayPickerProps={{
      modifiers: {
        disabled: {
          before: new Date()
        }
      }
    }}
  />
)
