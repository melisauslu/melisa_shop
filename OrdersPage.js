import React, { useEffect, useState } from "react";
import api from "../api";

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await api.get("/orders", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(res.data);
            } catch (error) {
                console.error("Siparişler alınamadı:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p className="p-4">Yükleniyor...</p>;

    if (orders.length === 0) {
        return (
            <div className="p-4 text-center">
                <h2 className="text-xl font-semibold">Henüz hiç siparişiniz yok.</h2>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Siparişlerim</h2>
            {orders.map((order) => (
                <div
                    key={order._id}
                    className="border rounded p-4 mb-4 shadow-sm bg-white"
                >
                    <div className="text-sm text-gray-600 mb-2">
                        Sipariş Tarihi:{" "}
                        {new Date(order.orderDate).toLocaleDateString("tr-TR")}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                        Toplam Tutar: <strong>{order.totalPrice.toFixed(2)}₺</strong>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                        Ödeme Durumu:{" "}
                        <span className="font-medium text-green-600">
                            {order.paymentStatus}
                        </span>
                    </div>
                    <div>
                        <h4 className="font-semibold">Ürünler:</h4>
                        <ul className="list-disc pl-5">
                            {order.products.map((item, index) => (
                                <li key={index}>
                                    {item.name} - {item.selectedSize} numara - {item.quantity} adet
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OrdersPage;
