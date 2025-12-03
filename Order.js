const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            id: { type: String, required: true }, // Ürün ID'si
            name: { type: String },
            price: { type: Number },
            quantity: { type: Number },
            selectedSize: { type: String }, // Seçilen ayakkabı numarası
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
        default: "Başarılı", // Ödeme işlemi başarılı olarak varsayılır
    },
    orderDate: {
        type: Date,
        default: Date.now, // Sipariş oluşturulma zamanı
    },
});

module.exports = mongoose.model("Order", orderSchema);

