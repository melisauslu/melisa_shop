import React, { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

function Settings() {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const res = await api.put("/users/me", {
                name,
                email,
                currentPassword,
                newPassword,
            });

            setMessage("Bilgileriniz başarıyla güncellendi.");
            setCurrentPassword("");
            setNewPassword("");
        } catch (err) {
            setError(err.response?.data?.message || "Bir hata oluştu.");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-6">⚙️ Hesap Ayarları</h1>

            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block font-medium">Adınız</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">E-posta</label>
                    <input
                        type="email"
                        className="w-full p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="pt-4 border-t">
                    <label className="block font-medium">Mevcut Şifre (şifre değiştirmek için)</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block font-medium">Yeni Şifre</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
                >
                    Güncelle
                </button>
            </form>

            {message && <div className="text-green-600 mt-4">{message}</div>}
            {error && <div className="text-red-600 mt-4">{error}</div>}
        </div>
    );
}

export default Settings;
