// routes/search.js

const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// Search mode: search keyword for target restaurant
router.get('', (req, res) => {
  const keyWord = new RegExp(req.query.keyword, 'i')  // 使用RegExp取代大小寫轉換
  Restaurant.find(
    { $or: [{ name: { $regex: keyWord } }, { category: { $regex: keyWord } }, { name_en: { $regex: keyWord } }] },
    (err, restaurants) => (err ? console.error(err) : res.render('index', { restaurants, keyword: req.query.keyword }))
  )
})

module.exports = router