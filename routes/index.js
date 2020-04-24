const register = require('./register')
const login = require('./login')
const House = require('../models/house')
const Review = require('../models/review')

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

  server.get(`${ENDPOINT}houses`, (req, res) => {
    House.findAndCountAll().then(result => {
      const houses = result.rows.map(house => house.dataValues)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(houses))
    })
  })
}
