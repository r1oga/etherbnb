import { User } from '../../../model.js'

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end() // METHOD not allowed
    return
  }

  const { email, password, passwordRepeat } = req.body

  if (password !== passwordRepeat) {
    res.end(JSON.stringify({
      status: 'error',
      message: 'Passwords do not match'
    }))
    return
  }
  try {
    const user = await User.create({ email, password })
    res.end(JSON.stringify({ status: 'success', message: 'User added' }))
  } catch (error) {
    res.statusCode = 500
    let message = 'Error'
    if (error.name === 'SequelizeUniqueConstraintError') {
      message = 'User already exists'
    }
    res.end(JSON.stringify({ status: 'error', message }))
  }
}
