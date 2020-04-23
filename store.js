import { createStore, action } from 'easy-peasy'

import { tomorrow } from './lib/dates'

export default createStore({
  modals: {
    showModal: false,
    showLogin: false,
    showRegistration: false,
    closeModal: action(state => {
      state.showModal = false
    }),
    openLogin: action(state => {
      state.showModal = true
      state.showLogin = true
      state.showRegistration = false
    }),
    openRegistration: action(state => {
      state.showModal = true
      state.showLogin = false
      state.showRegistration = true
    })
  },
  user: {
    user: null,
    setUser: action((state, payload) => {
      state.user = payload
    })
  }
})
