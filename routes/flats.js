const Flat = require('../models/flat')
const Review = require('../models/review')

exports.getFlats = (req, res) => {
  Flat.findAndCountAll().then(result => {
    const flats = result.rows.map(flat => flat.dataValues)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(flats))
  })
}

exports.getFlat = ({ params: { id } }, res) => {
  Flat.findByPk(id).then(flat => {
    if (flat) {
      Review
        .findAndCountAll({ where: { flatId: flat.id } })
        .then(reviews => {
          flat.dataValues.reviews = reviews.rows.map(review => review.dataValues)
          flat.dataValues.reviewsCount = reviews.count
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(flat.dataValues))
        })
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Not found' }))
    }
  })
}
