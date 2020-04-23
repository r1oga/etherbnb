const register = require('./register')

const ENDPOINT = '/api/auth/'

module.exports = server => {
  server.post(`${ENDPOINT}register`, register)

  server.post(`${ENDPOINT}logout`, (req, res) => {
    req.logout()
    req.session.destroy()
    return res.end(JSON.stringify({ status: 'success', message: 'Logged out' }))
  })
}
