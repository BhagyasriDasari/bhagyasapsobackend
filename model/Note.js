const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  tags: [String],
  backgroundColor: String,
  isArchived: Boolean,
  reminder: Date,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Note', noteSchema);