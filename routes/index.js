const register = require('./register')
const login = require('./login')
const session = require('./stripe')
const { getFlatsFromHost, addFlat, editFlat, handleImage } = require('./host')
const { book, booked, check } = require('./book')
const { getFlat, getFlats } = require('./flats')

const ENDPOINT = '/api/'

module.exports = (server, passport) => {
  // AUTH
  server.post(`${ENDPOINT}auth/register`, register)
  server.post(`${ENDPOINT}auth/logout`, (req, res) => {
    req.logout()
    req.session.destroy()
    return res.end(JSON.stringify({ status: 'success', message: 'Logged out' }))
  })
  server.post(`${ENDPOINT}auth/login`, login(passport))

  server.post(`${ENDPOINT}flats/book`, book)
  server.post(`${ENDPOINT}flats/booked`, booked)
  server.post(`${ENDPOINT}flats/check`, check)
  server.get(`${ENDPOINT}flats/:id`, getFlat)
  server.get(`${ENDPOINT}flats`, getFlats)

  // PAYMENT
  server.post(`${ENDPOINT}stripe/session`, session)

  // HOST
  server.get(`${ENDPOINT}host/list`, getFlatsFromHost)
  server.post(`${ENDPOINT}host/new`, addFlat)
  server.post(`${ENDPOINT}host/edit`, editFlat)
  server.post(`${ENDPOINT}host/image`, handleImage)
}
