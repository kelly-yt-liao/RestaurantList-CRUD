// routes/sort.js

const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// sort by different type of infos (網頁呈現時為 由上至下,由左至右的sort結果)
// 1. by first English character  
router.get('/AtoZ', (req, res) => {
  Restaurant.find({})
    .sort({ name: 'asc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants })
    })
})
// 2. by category of cuisine 
router.get('/category', (req, res) => {
  Restaurant.find({})
    .sort({ category: 'asc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants })
    })
})
// 3. by location of restaurant 
router.get('/area', (req, res) => {
  Restaurant.find({})
    .sort({ location: 'asc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants })
    })
})

module.exports = router