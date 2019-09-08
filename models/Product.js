const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  title: String,
  sku: Number,
  description: String,
  imageURL: String,
});

module.exports = model('products', productSchema);