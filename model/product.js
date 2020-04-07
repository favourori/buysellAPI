const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
        },
        desc: {
            type: String,
            required: [true, "desc is required"],
        },
        price: {
            type: Number,
            required: [true, "price is required"],
        },
        stock: Number,
        condition: {
            type: String,
            required: [true, "condition is required"],
            enum: ["new", "used"],
        },
        photos: {
            type: Array,
            required: [true, "photos is required"],
        },
        location: {
            type: String,
            required: [true, "location is required"],
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
