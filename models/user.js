const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  googleId: String
  // followedSets: [{type: mongoose.Schema.Types.ObjectId, ref: "Set"}]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);