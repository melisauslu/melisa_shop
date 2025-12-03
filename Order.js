const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            id: { type: String, required: true }, 
            name: { type: String },
            price: { type: Number },
            quantity: { type: Number },
            selectedSize: { type: String }, 
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        default: "Adres girilmedi",
    },
    paymentStatus: {
        type: String,
        default: "Başarılı", 
    },
    orderDate: {
        type: Date,
        default: Date.now, 
    },
});

module.exports = mongoose.model("Order", orderSchema);


