import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import api from "../api"; // api axios instance'ı
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
    const [success, setSuccess] = useState(false);
    const { cartItems, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handlePayment = async (e) => {
        e.preventDefault();

        
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Ödeme yapabilmek için giriş yapmalısınız.");
            return;
        }

       
        const orderData = {
            userId: user._id,
            products: cartItems.map((item) => ({
                productId: item.id,
                name: item.name,
                quantity: item.quantity,
                size: item.size,
                price: item.price,
            })),
            totalPrice: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
            orderDate: new Date(),
            paymentStatus: "paid",
            address: "Adres bilgisi örnek", // burayı daha sonra detaylı alabilirsin
        };

       
        try {
            await api.post("/orders", orderData);
            clearCart(); 
            setSuccess(true); 
        } catch (error) {
            console.error("Sipariş kaydedilemedi:", error);
            alert("Sipariş kaydedilirken bir hata oluştu.");
        }
    };

    if (success) {
        return (
            <div className="p-4 text-center">
                <h2 className="text-2xl font-bold mb-4">Ödeme Başarılı!</h2>
                <p>Teşekkürler, siparişiniz alındı.</p>
                <button
                    onClick={() => navigate("/orders")}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Siparişlerimi Görüntüle
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Ödeme Sayfası</h2>
            <form onSubmit={handlePayment} className="space-y-4">
                <div>
                    <label className="block mb-1">Kart Numarası</label>
                    <input
                        type="text"
                        required
                        placeholder="0000 0000 0000 0000"
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">Son Kullanma Tarihi</label>
                    <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">CVV</label>
                    <input
                        type="password"
                        required
                        placeholder="123"
                        className="w-full border p-2 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-full"
                >
                    Ödemeyi Tamamla
                </button>
            </form>
        </div>
    );
}

export default CheckoutPage;

