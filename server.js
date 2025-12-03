const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB bağlantısı başarılı!"))
  .catch((err) => console.error("❌ MongoDB bağlantı hatası:", err));


app.use("/api/products", require("./routes/products"));
app.use("/api/auth", require("./routes/auth"));


app.use("/api/orders", require("./routes/orderRoutes"));


app.get("/", (req, res) => {
  res.send("Backend çalışıyor...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
