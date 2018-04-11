const mongoose = require('mongoose');
const keys = require('.././config/keys');
const {Schema} = mongoose;
const ShortUrl = new Schema({
	originalURL: {
		type:String,
		unique: true
	},
	createdDate: {
	 	type: String
	 },
	shortId:{
		type: String,
		unique: true
	},
});
const Links = module.exports = mongoose.model('ShortLinks', ShortUrl);
