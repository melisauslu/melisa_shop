import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

const CartPage = () => {
    const { cartItems, removeFromCart, getTotalPrice, clearCart } = useContext(CartContext);

    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        address: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Lütfen giriş yapınız.");
            return;
        }

        // Sipariş verisini model ile uyumlu hale getiriyoruz
        const orderData = {
            items: cartItems.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                selectedSize: item.selectedSize,
            })),
            totalPrice: getTotalPrice(),
            address: formData.address || "Adres girilmedi",
        };

        try {
            // Siparişi backend'e gönder
            await axios.post("http://localhost:5000/api/orders", orderData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setPaymentSuccess(true);
            clearCart();
        } catch (error) {
            console.error("Ödeme sırasında hata:", error);
            alert("Ödeme işlemi başarısız oldu. Lütfen tekrar deneyiniz.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Sepetim</h1>

            {cartItems.length === 0 ? (
                <p>Sepetiniz boş.</p>
            ) : (
                <>
                    {cartItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between border-b py-4"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-gray-600">
                                        Numara: {item.selectedSize}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Adet: {item.quantity}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Fiyat: ₺{item.price} x {item.quantity}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id, item.selectedSize)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Kaldır
                            </button>
                        </div>
                    ))}

                    <div className="mt-6 text-right text-lg font-bold">
                        Toplam: ₺{getTotalPrice().toFixed(2)}
                    </div>

                    {!showPaymentForm && !paymentSuccess && (
                        <div className="text-right mt-4">
                            <button
                                onClick={() => setShowPaymentForm(true)}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Ödeme Yap
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* ✅ Ödeme Formu */}
            {showPaymentForm && !paymentSuccess && (
                <form
                    onSubmit={handlePaymentSubmit}
                    className="mt-6 bg-gray-100 p-6 rounded shadow-md"
                >
                    <h2 className="text-lg font-semibold mb-4">Ödeme Bilgileri</h2>

                    <div className="mb-3">
                        <label className="block font-medium">Ad Soyad</label>
                        <input
                            type="text"
                            name="fullName"
                            required
                            className="w-full p-2 border rounded"
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block font-medium">Adres</label>
                        <textarea
                            name="address"
                            required
                            className="w-full p-2 border rounded"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block font-medium">Kart Numarası</label>
                        <input
                            type="text"
                            name="cardNumber"
                            required
                            className="w-full p-2 border rounded"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex gap-4 mb-3">
                        <div className="w-1/2">
                            <label className="block font-medium">Son Kullanma Tarihi</label>
                            <input
                                type="text"
                                name="expiry"
                                required
                                placeholder="AA/YY"
                                className="w-full p-2 border rounded"
                                value={formData.expiry}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block font-medium">CVV</label>
                            <input
                                type="text"
                                name="cvv"
                                required
                                className="w-full p-2 border rounded"
                                value={formData.cvv}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Ödemeyi Tamamla
                    </button>
                </form>
            )}

            {/* ✅ Başarılı Ödeme Mesajı */}
            {paymentSuccess && (
                <div className="mt-6 p-4 border border-green-500 bg-green-100 text-green-800 rounded">
                    <p className="font-semibold">Ödeme başarılı! Siparişiniz alındı.</p>
                </div>
            )}
        </div>
    );
};

export default CartPage;
