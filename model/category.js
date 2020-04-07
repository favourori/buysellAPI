 const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
   name: {type: String, required: [true, 'Title is required']},
   description: {type: String, required: [true, 'Description is required']}
},
    {
    timestamps: true
})
