const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  id: String,
  referals: Number,
  favoriteProducts: [String],
  purchases: [{ type: Schema.Types.ObjectId, ref: 'Purchase' }],
});

module.exports = model('User', userSchema);