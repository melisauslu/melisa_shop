import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { FavoriteContext } from "../context/FavoriteContext";
import { AuthContext } from "../context/AuthContext";

function ProductList() {
    const [products, setProducts] = useState([]);
    const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoriteContext);
    const { user } = useContext(AuthContext);
    const { main, type } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
    const [selectedSize, setSelectedSize] = useState(searchParams.get("size") || "Tüm");
    const [selectedColor, setSelectedColor] = useState(searchParams.get("color") || "Tüm");
    const [selectedBrand, setSelectedBrand] = useState(searchParams.get("brand") || "Tüm");
    const [sortOrder, setSortOrder] = useState(searchParams.get("sort") || "none");
    const searchQuery = searchParams.get("search") || "";

    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
    const [totalPages, setTotalPages] = useState(1);

    const resetFilters = () => {
        setMinPrice("");
        setMaxPrice("");
        setSelectedSize("Tüm");
        setSelectedColor("Tüm");
        setSelectedBrand("Tüm");
        setSortOrder("none");
        setCurrentPage(1);
        setSearchParams({});
    };

    useEffect(() => {
        const params = {};
        if (main) params.main = main;
        if (type) params.type = type;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        if (selectedSize !== "Tüm") params.size = selectedSize;
        if (selectedColor !== "Tüm") params.color = selectedColor;
        if (selectedBrand !== "Tüm") params.brand = selectedBrand;
        if (sortOrder !== "none") params.sort = sortOrder;
        if (searchQuery.trim() !== "") params.search = searchQuery;
        if (currentPage) params.page = currentPage;

        setSearchParams(params); // URL güncelle

        const fetchProducts = async () => {
            try {
                const response = await api.get("/products", { params });
                const filtered = response.data.products.filter((p) => p.image && p.image.trim() !== "");
                setProducts(filtered);
                setTotalPages(response.data.totalPages || 1);
            } catch (err) {
                console.error("Ürünleri çekerken hata oluştu:", err);
            }
        };

        fetchProducts();
    }, [
        main, type,
        minPrice, maxPrice,
        selectedSize, selectedColor, selectedBrand,
        sortOrder, searchQuery,
        currentPage
    ]);

    const toggleFavorite = (product) => {
        if (!user) {
            alert("Favorilere eklemek için lütfen giriş yapın.");
            return;
        }

        const isFav = favorites.some((item) => item._id === product._id);
        if (isFav) {
            removeFromFavorites(product._id);
        } else {
            addToFavorites(product);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-6">
            {/* Sol Filtre Paneli */}
            <aside className="group relative transition-all duration-300 w-12 p-1 text-xs md:w-20 md:p-2 md:text-sm hover:w-64 hover:p-4 bg-white border rounded shadow-sm overflow-hidden">
                <div className="group-hover:block hidden md:block">
                    <h2 className="text-lg font-semibold mb-4">Filtrele</h2>

                    <div className="mb-3">
                        <label className="block font-medium mb-1">Fiyat Aralığı</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Min"
                                className="w-1/2 p-2 border rounded text-sm"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                className="w-1/2 p-2 border rounded text-sm"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="block font-medium mb-1">Numara</label>
                        <select
                            className="w-full p-2 border rounded text-sm"
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                        >
                            <option>Tüm</option>
                            {[...Array(10)].map((_, i) => {
                                const size = 36 + i;
                                return <option key={size} value={size}>{size}</option>;
                            })}
                            {[40.5, 41.5, 42.5, 44.5].map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="block font-medium mb-1">Renk</label>
                        <select
                            className="w-full p-2 border rounded text-sm"
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                        >
                            <option>Tüm</option>
                            <option>Beyaz</option>
                            <option>Siyah</option>
                            <option>Gri</option>
                            <option>Pembe</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="block font-medium mb-1">Marka</label>
                        <select
                            className="w-full p-2 border rounded text-sm"
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                        >
                            <option>Tüm</option>
                            <option>Nike</option>
                            <option>Adidas</option>
                            <option>Puma</option>
                            <option>New Balance</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="block font-medium mb-1">Sıralama</label>
                        <select
                            className="w-full p-2 border rounded text-sm"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="none">Varsayılan</option>
                            <option value="priceAsc">Fiyat (Artan)</option>
                            <option value="priceDesc">Fiyat (Azalan)</option>
                        </select>
                    </div>

                    <button
                        onClick={resetFilters}
                        className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-sm font-semibold py-2 px-4 rounded"
                    >
                        Filtreleri Temizle
                    </button>
                </div>
                <div className="block md:hidden text-center font-medium text-xs">Filtre</div>
            </aside>

            {/* Ürünler */}
            <section className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length === 0 ? (
                    <div className="text-center mt-4 col-span-full">Hiç ürün bulunamadı.</div>
                ) : (
                    products.map((product) => {
                        const isFavorite = favorites.some((item) => item._id === product._id);
                        return (
                            <div
                                key={product._id}
                                className="border rounded shadow p-4 hover:shadow-lg transition-shadow duration-200 relative"
                            >
                                <button
                                    onClick={() => toggleFavorite(product)}
                                    className={`absolute top-2 right-2 text-2xl ${isFavorite ? "text-pink-500" : "text-gray-400"}`}
                                    aria-label="Favorilere ekle"
                                >
                                    {isFavorite ? "❤️" : "🤍"}
                                </button>

                                <Link to={`/products/${product._id}`}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover rounded"
                                    />
                                    <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                                    <p className="text-gray-700 font-medium">₺{product.price}</p>
                                </Link>
                            </div>
                        );
                    })
                )}
            </section>

            {/* ✅ Sayfalama UI */}
            {totalPages > 1 && (
                <div className="col-span-full flex justify-center items-center gap-2 mt-6">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Önceki
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === index + 1 ? "bg-black text-white" : ""
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Sonraki
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProductList;
S