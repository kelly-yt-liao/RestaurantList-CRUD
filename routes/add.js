// routes/add.js

const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// Add mode: (1) render (create a page) for typing the info for the new added restaurant
router.get('', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    const newId = restaurants.length + 1
    // 先給新資料 1個新id
    return res.render('new', { _id: newId })
  })
})

// Add mode: (2) post the added result and save it to mongodb.
router.post('', (req, res) => {
  const newRestaurant = Restaurant(req.body)

  if (req.files) {
    const { uploadFile } = req.files
    const imgUrl = `/stylesheets/images/${uploadFile.name}` // the root file is 'public/'
    newRestaurant.image = imgUrl
    uploadFile.mv(imgUrl, err => {
      if (err) return console.error(err)
    })
  }

  // Save the new restaurant
  newRestaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

module.exports = router