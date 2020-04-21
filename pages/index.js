import React from 'react'

import flats from './flats.json'
import Flat from '../components/flat'

export default () => (
  <div>
    <h2>Places to stay at</h2>
    <div className='flats'>
      {flats.map((flat, index) => <Flat key={index} {...flat} />)}
    </div>
  </div>
)
