import { createStore, action } from 'easy-peasy'

import { tomorrow } from './lib/dates'

export default createStore({
  dates: {
    startDate: new Date(),
    endDate: tomorrow(new Date())
  }
})
