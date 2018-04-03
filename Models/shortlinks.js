const mongoose = require('mongoose');
const keys = require('.././config/keys');
const {Schema} = mongoose;
const ShortUrl = new Schema({
	originalURL: {
		type:String,
		unique: true
	},
	createdDate: String,
	randomId:{
		type: String,
		unique: true
	}
})
mongoose.connect(keys.mongoURI);
const Links = module.exports = mongoose.model('ShortLinks', ShortUrl);
