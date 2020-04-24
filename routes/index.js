const register = require('./register')
const login = require('./login')
const book = require('./book')
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

  server.get(`${ENDPOINT}flats`, getFlats)
  server.get(`${ENDPOINT}flats/:id`, getFlat)

  server.post(`${ENDPOINT}flats/book`, book)
}
