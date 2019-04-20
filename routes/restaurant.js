// routes/restaurant.js

const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// Show mode: show detail info for each restaurant by the "_id" tags.
router.get('/:_id', (req, res) => {
  Restaurant.findById(req.params._id, (err, place) => {
    if (err) return console.error(err)
    // console.log(place)
    return res.render('show', { place })
  })
})

module.exports = router