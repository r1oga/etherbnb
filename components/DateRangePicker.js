import { Card, Table, Heading } from 'rimble-ui'
import { useState } from 'react'
import { userStoreActions } from 'easy-peasy'
import { differenceInCalendarDays } from 'date-fns'
import dateFnsFormat from 'date-fns/format'

import DayPickerInput from './DayPickerInput'
import { tomorrow, format } from '../lib/dates'

export default ({ datesChanged }) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(tomorrow(new Date()))

  return (
    <>
      <Card
        width='auto' maxWidth='800px'
        mx='auto'
        p={0}
        borderRadius={8}
      >
        <Heading.h2 p={3}>Select dates</Heading.h2>
        <Table border='none' boxShadow='none'>
          <tbody>
            <tr>
              <td>From:</td>
              <td>
                <DayPickerInput
                  date={startDate}
                  dayPickerProps={{
                    modifiers: {
                      disabled: {
                        before: new Date()
                      }
                    }
                  }}
                  onDayChange={day => {
                    setStartDate(day)
                    let newEndDate = endDate
                    if (differenceInCalendarDays(day, endDate) > 0) {
                      newEndDate = tomorrow(day)
                      setEndDate(newEndDate)
                    }
                    // datesChanged(day, newEndDate)
                  }}
                  placeholder={`${dateFnsFormat(new Date(), format)}`}
                />
              </td>
            </tr>
            <tr>
              <td>To:</td>
              <td>
                <DayPickerInput
                  date={endDate}
                  dayPickerProps={{
                    modifiers: {
                      disabled: [
                        startDate,
                        { before: startDate }
                      ]
                    }
                  }}
                  onDayChange={day => {
                    setEndDate(day)
                    // datesChanged(startDate, day)
                  }}
                  placeholder={`${dateFnsFormat(endDate, format)}`}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </Card>
      <style jsx>{`
        tbody {
          border: none!important;
        }
        tr {
          border: none!important;
          padding: 1em;
        }

        td {
          padding: 1em;
          border: none!important;
        }

        .DayPickerInput {
          text-align: 'center';
          vertical-align: 'center';
        }
        `}
      </style>
    </>
  )
}
