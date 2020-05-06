const next = require('next')
const error500 = (res, message) => {
  res.statusCode = 500
  return res.end(JSON.stringify({ status: 'error', message }))
}

module.exports = passport => async (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return error500(res, err.toString()) }

    if (!user) { return error500(res, 'No user matching credentials') }

    req.login(user, err => {
      if (err) { return error500(res, err) }
      return res.end(JSON.stringify({ status: 'success', message: 'Logged in' }))
    })
  })(req, res, next)
}
