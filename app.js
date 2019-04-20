
const express = require('express')
const exphbs = require('express-handlebars')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const app = express()
const port = 3000

const Restaurant = require('./models/restaurant.js')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// settings for the file root and the imported libraries
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }), fileUpload(), express.static('public'))
app.use(methodOverride('_method'))
app.use('/', require('./routes/home.js'))
app.use('/sort', require('./routes/sort.js'))
app.use('/search', require('./routes/search.js'))
app.use('/restaurants', require('./routes/restaurant.js'))
app.use('/add', require('./routes/add.js'))
app.use('/edit', require('./routes/edit.js'))
app.use('/delete', require('./routes/delete.js'))

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

app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`)
})