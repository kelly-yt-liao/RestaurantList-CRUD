// routes/delete.js

const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// Delete mode: use post to delete a resaurant from mogodb.
router.delete('/:_id', (req, res) => {
  console.log(req.params._id)
  Restaurant.findById(req.params._id, (err, restaurant) => {
    if (err) return console.error(err)
    console.log(restaurant)
    restaurant.remove(err => {
      if (err) return console.error(err)

      return res.redirect('/')
    })
  })
})

module.exports = router