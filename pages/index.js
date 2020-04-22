import { Heading } from 'rimble-ui'

import flats from './flats.json'
import Flat from '../components/flat'

export default () => (
  <>
    <Heading.h2>Places to stay at</Heading.h2>
    <div className='flats'>
      {flats.map((flat, index) => <Flat key={index} {...flat} />)}
    </div>
  </>
)
