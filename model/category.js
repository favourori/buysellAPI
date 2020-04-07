const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
        name: {type: String, required: [true, 'Title is required']},
        description: {type: String, required: [true, 'Description is required']},
        image: {type: String, required: [true, 'Image is required']}
    },
    {
        timestamps: true
    }
)

const Category = mongoose.model('category', categorySchema)

module.exports = Category
