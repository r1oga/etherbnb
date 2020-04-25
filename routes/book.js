const { eachDayOfInterval, parse } = require('date-fns')
const Op = require('sequelize').Op

const User = require('../models/user')
const Booking = require('../models/booking')

exports.book = (req, res) => {
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

exports.booked = async ({ body: { flatId } }, res) => {
  const results = await Booking.findAll({
    where: { flatId: flatId, endDate: { [Op.gte]: new Date() } }
  })

  let bookedDates = []

  for (const result of results) {
    const dates = eachDayOfInterval({
      start: parse(result.startDate, 'yyyy-MM-dd', new Date()),
      end: parse(result.endDate, 'yyyy-MM-dd', new Date())
    })

    bookedDates = [...bookedDates, ...dates]
  }

  // remove duplicates
  bookedDates = [...new Set(bookedDates.map(date => date))]

  res.json({
    status: 'success',
    message: 'ok',
    dates: bookedDates
  })
}

exports.check = async ({ body: { starDate, enDate, flatId } }, res) => {
  const results = await Booking.findAll({
    where: {
      flatId: flatId,
      startDate: { [Op.lte]: new Date(endDate) },
      endDate: { [Op.gte]: new Date(startDate) }
    }
  })

  let message = 'free'
  if (!(results.length > 0)) {
    message = 'unavailable'
  }
  res.json({ status: 'success', message })
}
