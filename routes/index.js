const register = require('./register')
const login = require('./login')
const Flat = require('../models/flat')
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

  server.get(`${ENDPOINT}flats`, (req, res) => {
    Flat.findAndCountAll().then(result => {
      const flats = result.rows.map(flat => flat.dataValues)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(flats))
    })
  })

  server.get(`${ENDPOINT}flats/:id`, ({ params: { id } }, res) => {
    Flat.findByPk(id).then(flat => {
      if (flat) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(flat.dataValues))
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Not found' }))
      }
    })
  })
}
