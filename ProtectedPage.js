// src/components/ProtectedPage.js
import React, { useEffect, useState } from "react";
import api from "../api";

function ProtectedPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/protected")
            .then(res => setData(res.data))
            .catch(err => {
                console.error(err);
                setError("Yetkisiz erişim. Lütfen giriş yapın.");
            });
    }, []);

    if (error) return <div>{error}</div>;
    if (!data) return <div>Yükleniyor...</div>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">🔐 Korumalı Sayfa</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default ProtectedPage;

