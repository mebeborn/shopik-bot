const { Schema, model } = require('mongoose');

const purchaseSchema = new Schema({
  sku: String,
  userID: String,
  userDB: { type: Schema.Types.ObjectId, ref: 'User' },
  succeeded: Boolean,
  userPhone: String,
  isFree: Boolean,
  zipCode: String
}, {
    timestamps: true,
  });

module.exports = model('Purchase', purchaseSchema);