const { eachDayOfInterval, parse } = require('date-fns')
const Op = require('sequelize').Op

const User = require('../models/user')
const Booking = require('../models/booking')

const canBook = async (flatId, startDate, endDate) => {
  const results = await Booking.findAll({
    where: {
      flatId: flatId,
      startDate: { [Op.lte]: new Date(endDate) },
      endDate: { [Op.gte]: new Date(startDate) }
    }
  })
  return !(results.length > 0)
}

// const isAuthenticated = (req, res) => {
//   if (!req.session.passport) {
//   res.writeHead(403, { 'Content-Type': 'application/json' })
//   res.end(JSON.stringify({ status: 'error', message: 'Unauthorized' }))
//   return
//   }
// }

exports.book = async (req, res) => {
  // NOT AUTHENTICATED
  if (!req.session.passport) {
    res.writeHead(403, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'error', message: 'Unauthorized' }))
    return
  }

  // PREVENT BOOKING ON SERVER SIDE IF BUSY
  if (!(await canBook())) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    return res.json({ status: 'error', message: 'Flat already booked' })
  }

  const { body: { flatId, startDate, endDate } } = req
  const userEmail = req.session.passport.user
  User.findOne({ where: { email: userEmail } }).then(user => {
    Booking.create({
      flatId: flatId,
      userId: user.id,
      startDate: startDate,
      endDate: endDate
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

exports.check = async ({ body: { starDate, endDate, flatId } }, res) => {
  let message = 'free'
  if (!(await canBook())) {
    message = 'unavailable'
  }
  res.json({ status: 'success', message })
}
