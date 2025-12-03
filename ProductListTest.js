import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductListTest() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, []);

    if (products.length === 0) return <div>Hiç ürün bulunamadı.</div>;

    return (
        <ul>
            {products.map(p => (
                <li key={p._id}>{p.name} - {p.price} ₺</li>
            ))}
        </ul>
    );
}

export default ProductListTest;
