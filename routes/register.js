const User = require('../model.js').User

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end() // METHOD not allowed
    return
  }

  const { email, password, passwordRepeat } = req.body

  if (password !== passwordRepeat) {
    return res.end(JSON.stringify({
      status: 'error',
      message: 'Passwords do not match'
    }))
  }

  try {
    const user = await User.create({ email, password })

    req.login(user, err => {
      if (err) {
        res.statusCode = 500
        return res.end(JSON.stringify({ status: 'error', message: err }))
      }
      return res.end(JSON.stringify({ status: 'success', message: 'User logged in' }))
    })
  } catch (error) {
    res.statusCode = 500
    let message = 'Error'
    if (error.name === 'SequelizeUniqueConstraintError') {
      message = 'User already exists'
    }
    res.end(JSON.stringify({ status: 'error', message }))
  }
}
