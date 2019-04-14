
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
	_id: String, // 注意:要先將原本json檔的"id"改為"_id"後,再用這個寫法. 因為mongo的insert id key預設為_id, 所以若不先改為"_id"會出現error. (下面 L7~L10 為此行的一種寫法)
	// _id: {
	// 	type: String,
	// 	required: true
	// },
	name: String,
	name_en: String,
	category: String,
	image: String,
	location: String,
	phone: String,
	google_map: String,
	rating: Number,
	description: String
})

// const restaurantSchema = new Schema({
// 	_id: {
// 		type: String,
// 		required: true
// 	},
// 	name: {
// 		type: String,
// 		required: true
// 	},
// 	name_en: {
// 		type: String
// 	},
// 	category: {
// 		type: String,
// 		required: true
// 	},
// 	image: {
// 		type: String,
// 		required: true
// 	},
// 	location: {
// 		type: String,
// 		required: true
// 	},
// 	phone: {
// 		type: String
// 	},
// 	google_map: {
// 		type: String
// 	},
// 	rating: {
// 		type: Number,
// 		required: true
// 	},
// 	description: {
// 		type: String
// 	}
// })

module.exports = mongoose.model('Restaurant', restaurantSchema, 'restaurants')

