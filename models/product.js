const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id: { type:String ,unique:true },
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    name: String,
    description: String,
    unit: Number
})

module.exports = mongoose.model('Product', ProductSchema);