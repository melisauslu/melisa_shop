import React, { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";  

function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();  

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const response = await api.post("/auth/login", { email, password });
            const userData = response.data.user;
            
            login(userData);

            
            localStorage.setItem("token", response.data.token);

            navigate("/"); 

        } catch (err) {
            setError(err.response?.data?.message || "Giriş yapılamadı. Lütfen tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-6 text-center">Giriş Yap</h2>
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label className="block mb-2 font-medium" htmlFor="email">
                    E-posta
                </label>
                <input
                    id="email"
                    type="email"
                    className="w-full mb-4 px-3 py-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="username"
                />

                <label className="block mb-2 font-medium" htmlFor="password">
                    Şifre
                </label>
                <input
                    id="password"
                    type="password"
                    className="w-full mb-6 px-3 py-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 text-white rounded ${loading ? "bg-green-900 cursor-not-allowed" : "bg-green-600 hover:bg-pink-700"
                        } transition`}
                >
                    {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                </button>
            </form>
        </div>
    );
}

export default Login;





