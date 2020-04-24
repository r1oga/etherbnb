const User = require('../models/user')
const Booking = require('../models/booking')

module.exports = (req, res) => {
  const userEmail = req.session.passport.user
  User.findOne({ where: { email: userEmail } }).then(user => {
    Booking.create({
      flatId: req.body.flatId,
      userId: user.id,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    }).then(() => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ status: 'success', message: 'ok' }))
    })
  })
}
