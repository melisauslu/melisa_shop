import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState("");
    const [rating, setRating] = useState(5);
    const [comments, setComments] = useState([]);
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [selectedSize, setSelectedSize] = useState("");
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
                setComments(response.data.comments || []);
                setLoading(false);
            } catch (err) {
                console.error("Ürün getirme hatası:", err);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddComment = async () => {
        if (!commentText.trim()) return alert("Yorum boş olamaz.");
        try {
            const response = await api.post(`/products/${id}/comments`, {
                comment: commentText,
                rating,
                userName: user?.name || "Anonim",
            });
            setComments((prev) => [...prev, response.data]);
            setCommentText("");
            setRating(5);
        } catch (err) {
            console.error("Yorum ekleme hatası:", err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await api.delete(`/products/${id}/comments/${commentId}`);
            setComments((prev) => prev.filter((c) => c._id !== commentId));
        } catch (err) {
            console.error("Yorum silme hatası:", err);
        }
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Lütfen numara seçin.");
            return;
        }
        addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            selectedSize,
        });
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    if (loading) return <div className="text-center mt-6">Ürün Yükleniyor...</div>;
    if (!product) return <div className="text-center mt-6 text-red-500">Ürün Bulunamadı.</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* ✅ Bildirim */}
            {showNotification && (
                <div className="bg-black-100 border border-pink-400 text-white-700 px-4 py-2 rounded mb-4 text-center">
                    Ürün Sepete Eklendi
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-6">
                <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-80 object-cover rounded" />

                <div className="flex-1">
                    <h2 className="text-2xl font-bold">{product.name}</h2>
                    <p className="text-gray-600 mt-2">{product.description}</p>
                    <p className="text-lg font-semibold text-green-700 mt-2">₺{product.price}</p>
                    <p className="text-sm mt-2 text-gray-500">Marka: {product.brand}</p>
                    <p className="text-sm text-gray-500">Renk: {product.color}</p>

                    <div className="mt-4">
                        <label className="block mb-1 font-medium">Numara Seç:</label>
                        <select
                            className="p-2 border rounded w-full"
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                        >
                            <option value="">Seçiniz</option>
                            {product.size.map((s, index) => (
                                <option key={index} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Sepete Ekle
                    </button>
                </div>
            </div>

            {/* ✅ Yorumlar */}
            <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4">Yorumlar</h3>

                {comments.length === 0 && (
                    <p className="text-gray-500">Henüz yorum yapılmamış.</p>
                )}

                {comments.map((c) => (
                    <div key={c._id} className="border-t pt-3 mt-3">
                        <div className="flex justify-between items-center">
                            <strong>{c.userName || "Anonim"}</strong>
                            <span className="text-yellow-500">{"★".repeat(c.rating)}</span>
                        </div>
                        <p className="text-gray-800">{c.comment}</p>
                        {user?.name === c.userName && (
                            <button
                                onClick={() => handleDeleteComment(c._id)}
                                className="text-red-500 text-sm mt-1"
                            >
                                Yorumu Sil
                            </button>
                        )}
                    </div>
                ))}

                {/* ✅ Yorum Ekleme Alanı */}
                {user ? (
                    <div className="mt-6">
                        <textarea
                            className="w-full p-2 border rounded"
                            rows="3"
                            placeholder="Yorumunuzu yazın..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <div className="flex items-center mt-2 gap-4">
                            <div>
                                <label className="mr-2">Puan:</label>
                                <select
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                    className="border p-1 rounded"
                                >
                                    {[5, 4, 3, 2, 1].map((r) => (
                                        <option key={r} value={r}>{r}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={handleAddComment}
                                className="bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700"
                            >
                                Yorumu Ekle
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-600 mt-4">Yorum yazmak için giriş yapmalısınız.</p>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;
