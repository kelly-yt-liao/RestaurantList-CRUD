
const express = require('express')
const exphbs = require('express-handlebars')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = 3000

const Restaurant = require('./models/restaurant.js')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting for the existing file and the importing library
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }), fileUpload(), express.static('public'))

// mongodb connection setting
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })

const db = mongoose.connection


db.on('error', () => {
	console.log('mongodb connection error!')
})

db.once('open', () => {
	console.log('mongodb connection success~!:)')
})

// home page
app.get('/', (req, res) => {
	Restaurant.find((err, restaurants) => {
		if (err) return console.error(err)

		return res.render('index', { restaurants })
	})
})

// search keyword for restaurant
app.get('/search', (req, res) => {
	const keyWord = new RegExp(req.query.keyword, 'i')  // 使用RegExp取代大小寫轉換
	Restaurant.find(
		{ $or: [{ name: { $regex: keyWord } }, { category: { $regex: keyWord } }, { name_en: { $regex: keyWord } }] },
		(err, restaurants) => (err ? console.error(err) : res.render('index', { restaurants, keyword: req.query.keyword }))
	)
})

// Show mode: show detail info for each restaurant by the "_id" tags.
app.get('/restaurants/:_id', (req, res) => {
	Restaurant.findById(req.params._id, (err, place) => {
		if (err) return console.error(err)
		// console.log(place)
		return res.render('show', { place })
	})
})

// Edit mode: (1) modify restaurant infos
app.get('/edit/:_id', (req, res) => {
	Restaurant.findById(req.params._id, (err, restaurant) => {
		if (err) return console.error(err)
		restaurant.imgStr = restaurant.image.split('/').find(imgUrl => imgUrl.includes('.jpg'))
		return res.render('edit', { restaurant })
	})
})

// TODO: post the uploaded image and save it to mongodb.
// Edit mode: (2) post the modified result 
app.post('/edit/:_id', (req, res) => {
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


// Add mode: create a page for typing the info for the new added restaurant
app.get('/add', (req, res) => {
	Restaurant.find((err, restaurants) => {
		if (err) console.error(err)
		const newId = restaurants.length + 1
		res.render('new', { _id: newId })
	})
})

// Add mode: post the added result and save it to mongodb.
app.post('/add', (req, res) => {
	const newRestaurant = Restaurant(req.body)

	if (req.files) {
		const { uploadFile } = req.files
		const imgUrl = `/stylesheets/images/${uploadFile.name}` // the root file is 'public/'
		newRestaurant.image = imgUrl
		uploadFile.mv(imgUrl, err => {
			if (err) console.error(err)
		})
	}

	// Save the new restaurant
	newRestaurant.save(err => {
		if (err) return console.error(err)
		return res.redirect('/')
	})
})

// Delete mode: use post to delete a resaurant from mogodb.
app.post('/delete/:_id', (req, res) => {
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



app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`)
})