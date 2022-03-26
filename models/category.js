const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {type: 'string', unique: true, lowercase: true},
})

module.exports = mongoose.model('Category', CategorySchema);