const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: String,
  brand: String,
  description: String,
  initial_price: Number,
  final_price: Number,
  currency: String,
  availability: String,
  reviews_count: Number,
  categories: [String],
  asin: String,
  images: [String],
  variations: Array,
  rating: Number,
  is_available: Boolean
}, { strict: false });

module.exports = mongoose.model('Product', ProductSchema);