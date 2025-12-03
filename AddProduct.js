// src/components/AddProduct.js
import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const [form, setForm] = useState({ name: "", price: "", image: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.name || !form.price || !form.image) {
            setError("Lütfen tüm alanları doldurun.");
            return;
        }

        try {
            await api.post("/products", {
                name: form.name,
                price: parseFloat(form.price),
                image: form.image,
            });
            alert("Ürün başarıyla eklendi!");
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Ürün eklenirken hata oluştu.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Yeni Ürün Ekle</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Ürün Adı"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Fiyat"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                    min="0"
                    step="0.01"
                />

                <input
                    type="text"
                    name="image"
                    placeholder="Resim URL'si"
                    value={form.image}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Ürün Ekle
                </button>
            </form>
        </div>
    );
}

export default AddProduct;

