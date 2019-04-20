// routes/edit.js

const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')



// Edit mode: (1) modify restaurant infos
router.get('/:_id', (req, res) => {
  Restaurant.findById(req.params._id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.imgStr = restaurant.image.split('/').find(imgUrl => imgUrl.includes('.jpg'))
    return res.render('edit', { restaurant })
  })
})

// Edit mode: (2) post the modified result 
// TODO: post the new uploaded image and save it to mongodb
router.put('/:_id', (req, res) => {
  Restaurant.findById(req.params._id, (err, restaurant) => {
    if (err) return console.error(err)
    for (item in req.body) {
      restaurant[item] = req.body[item]
    }

    // Save the editted data into mongodb, and return to home page
    restaurant.save(err => {
      if (err) return console.error(err)
      // return res.redirect(`/restaurants/${req.params._id}`)
      return res.redirect('/')  // return to home page
    })
  })
})

module.exports = router