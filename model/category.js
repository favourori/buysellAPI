const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
        name: {type: String, required: [true, 'name is required']},
        description: {type: String, required: [true, 'description is required']},
        image: {type: String, required: [true, 'image is required']}
    },
    {
        timestamps: true
    }
)

const Category = mongoose.model('category', categorySchema)

module.exports = Category
