const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userName: String,
    comment: String,
    rating: Number,
    date: {
        type: Date,
        default: Date.now,
    },
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String },
    category: {
        main: { type: String, required: true }, // Kadın,Erkek
        type: { type: String, required: true }, // Sneaker,koşu vs.
    },
    brand: { type: String }, // Nike,Adidas
    color: { type: String }, // Siyah,Beyaz
    size: [{ type: Number }],  // 36-45 arası
    comments: [commentSchema], // yorumlar 
});

module.exports = mongoose.model("Product", productSchema);
