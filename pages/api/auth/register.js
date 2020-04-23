import { User } from '../../../model.js'

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end() // METHOD not allowed
    return
  }

  try {
    const { email, password, passwordRepeat } = req.body
    const user = await User.create({ email, password })
    res.end(JSON.stringify({ status: 'success', message: 'User added' }))
  } catch (error) {
    res.end(JSON.stringify({ status: 'error', error }))
  }
}
