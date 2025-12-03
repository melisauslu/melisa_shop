import React, { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import { Link } from "react-router-dom";

function FavoritesPage() {
    const { favorites, removeFromFavorites } = useContext(FavoriteContext);

    if (favorites.length === 0) {
        return <div className="text-center mt-4 text-gray-600">Favori ürününüz bulunmamaktadır.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
            {favorites.map((product) => (
                <div key={product._id} className="border border-pink-300 rounded shadow p-4">
                    <Link to={`/products/${product._id}`}>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-cover mb-3 rounded"
                        />
                        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                        <p className="text-gray-700 font-medium">₺{product.price}</p>
                    </Link>
                    <button
                        onClick={() => removeFromFavorites(product._id)}
                        className="mt-2 text-sm text-pink-600 hover:underline"
                    >
                        Kaldır
                    </button>
                </div>
            ))}
        </div>
    );
}

export default FavoritesPage;
