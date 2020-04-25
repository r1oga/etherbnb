const Op = require('sequelize').Op

const Flat = require('../models/flat')
const User = require('../models/user')
const Booking = require('../models/booking')

module.exports = async (req, res) => {
  if (!req.session.passport || !req.session.passport.user) {
    return res.satus(403).json({ status: 'error', message: 'Unauthorized' })
  }

  const userEmail = req.session.passport.user
  const user = await User.findOne({ where: { email: userEmail } })

  const flats = await Flat.findAll({ where: { host: user.id } })
  const flatIds = flats.map(flat => flat.dataValues.id)

  const bookingsData = await Booking.findAll({
    where: {
      paid: true,
      flatId: { [Op.in]: flatIds },
      endDate: { [Op.gte]: new Date() }
    },
    order: [['startDate', 'ASC']]
  })
  const bookings = await Promise.all(bookingsData.map(async booking => {
    return {
      booking: booking.dataValues,
      flat: flats.filter(flat => flat.dataValues.id === booking.dataValues.flatId)[0].dataValues
    }
  }))
  return res.status(200).json({ flats, bookings })
}
