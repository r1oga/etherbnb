import DayPickerInput from 'react-day-picker/DayPickerInput'
import { Card, Table, Heading } from 'rimble-ui'

export default () => {
  return (
    <Card
      width='auto'
      maxWidth='800px'
      mx='auto'
      p={0}
      borderRadius={8}
    >
      <Heading.h2 p={3}>Select dates</Heading.h2>
      <Table border='none' boxShadow='none'>
        <tbody>
          <tr>
            <td>From:</td>
            <td className='date-range-picker'>
              <DayPickerInput />
            </td>
          </tr>
          <tr>
            <td>To:</td>
            <td className='date-range-picker'>
              <DayPickerInput />
            </td>
          </tr>
        </tbody>
      </Table>
      <style jsx>{`
          tbody {
            border: none;
          }
          tr {
            border: none;
            padding: 1em;
          }
          
          td {
            padding: 1em;
            border: none;
          }
          
          .DayPickerInput {
            text-align: 'center';
            vertical-align: 'center';
          }
          `}
      </style>
    </Card>
  )
}
