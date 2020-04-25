const Flat = require('../models/flat')
const User = require('../models/user')

module.exports = async (req, res) => {
  if (!req.session.passport || !req.session.passport.user) {
    return res.satus(403).json({ status: 'error', message: 'Unauthorized' })
  }

  const userEmail = req.session.passport.user
  const user = await User.findOne({ where: { email: userEmail } })

  const flats = await Flat.findAll({ where: { host: user.id } })

  return res.status(200).json({ flats })
}
