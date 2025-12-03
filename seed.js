// backend/seed.js
const mongoose = require("mongoose");
const Product = require("./models/product");
require("dotenv").config();

const sampleProducts = [
    {
        name: "Kadın Beyaz Tişört",
        price: 199,
        image: "https://via.placeholder.com/200x200?text=Tisort",
    },
    {
        name: "Erkek Kot Pantolon",
        price: 349,
        image: "https://via.placeholder.com/200x200?text=Pantolon",
    },
    {
        name: "Siyah Spor Ayakkabı",
        price: 599,
        image: "https://via.placeholder.com/200x200?text=Ayakkabi",
    },
];

mongoose
    .connect(process.env.MONGO_URL)
    .then(async () => {
        console.log("MongoDB bağlantısı başarılı, ürünler ekleniyor...");

        // Önce tüm ürünleri sil (sıfırla)
        await Product.deleteMany({});

        // Sample ürünleri ekle
        await Product.insertMany(sampleProducts);

        console.log("Ürünler başarıyla eklendi.");
        process.exit();
    })
    .catch((err) => {
        console.error("MongoDB bağlantı hatası:", err);
    });
