
// routes/home.js

const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// homepage
router.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)

    return res.render('index', { restaurants })
  })
})

module.exports = router
