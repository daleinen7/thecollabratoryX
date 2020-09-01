const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
  category: {type: String, enum: ['effect', 'instrument', 'role', 'universal'], required: true},
  description: {type: String, required: true}, 
  weight: {type: Number, default: 3, min: 1, max: 5}
}, {
  timestamps: true
});

const setSchema = new Schema({
  title: {type: String, required: true},
  entries: [entrySchema],
  popularity: Number,
  followedBy: [{type: Schema.Types.ObjectId, ref: "User"}],
  createdBy: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
  timestamps: true
});

module.exports = mongoose.model('Set', setSchema);