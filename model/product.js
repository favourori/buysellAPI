const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
        },
        user: {
            type: String,
            required: [true, "user is required"],
            ref: "user",
        },
        desc: {
            type: String,
            required: [true, "desc is required"],
        },
        status: {
            type: String,
            enum: ["Available", "Sold", "Expired"],
            default: "Available",
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            ref: "category",
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
        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
