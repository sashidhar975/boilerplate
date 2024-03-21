const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: String,
  path: String,
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
