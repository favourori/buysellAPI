const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'name is required']},
    desc: {type: String, required: [true, 'desc is required']},
    price: {type: String, required: [true, 'price is required']},
    condition: {type: String, required: [true, 'condition is required']},
    stock: {type: String, required: [true, 'stock is required']}
});

const Product = mongoose.model('product', productSchema);

module.exports = Product
