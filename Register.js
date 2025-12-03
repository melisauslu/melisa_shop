import React, { useState } from "react";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Buraya API kayıt isteği gelecek
        alert(`Kayıt denemesi: ${name}, ${email}`);
    };

    return (
        <div className="max-w-md mx-auto p-6 mt-8 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Kayıt Ol</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="İsim"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="email"
                    placeholder="E-posta"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">
                    Kayıt Ol
                </button>
            </form>
        </div>
    );
}

export default RegisterPage;
