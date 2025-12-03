import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FavoriteContext } from "../context/FavoriteContext"; // 💡 Eklendi
import UserMenu from "./userMenu";

function Header() {
    const { user } = useContext(AuthContext);
    const { clearFavorites } = useContext(FavoriteContext); // 💡 Favorileri sıfırlamak için
    const [activeMenu, setActiveMenu] = useState(null);

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const categories = {
        Kadın: ["Sneaker", "Koşu", "Bot", "Basketbol", "Outdoor", "Terlik"],
        Erkek: ["Sneaker", "Koşu", "Bot", "Basketbol", "Outdoor", "Terlik"],
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
        setSearchOpen(false);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== "") {
            navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
            setSearchOpen(false);
            setActiveMenu(null);
        }
    };

    return (
        <header className="bg-white shadow relative z-50">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link to="/" className="text-xl font-bold text-pink-600">
                    MELİSA SHOP
                </Link>

                <nav className="flex gap-6 items-center relative">
                    {/* Arama */}
                    <div className="relative">
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="p-2 hover:text-pink-600 select-none"
                            aria-label="Ürünlerde ara"
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
                            </svg>
                        </button>
                        {searchOpen && (
                            <form onSubmit={handleSearchSubmit} className="absolute top-full left-0 mt-2 bg-white border rounded shadow p-2 flex">
                                <input
                                    type="text"
                                    placeholder="Ara..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    autoFocus
                                    className="px-2 py-1 border rounded focus:outline-none"
                                    onBlur={() => setSearchOpen(false)}
                                />
                                <button type="submit" className="ml-2 px-3 py-1 bg-pink-600 text-white rounded hover:bg-pink-700">
                                    Ara
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Kategoriler */}
                    {["Kadın", "Erkek"].map((gender) => (
                        <div key={gender} className="relative">
                            <button
                                className="hover:text-pink-600 select-none"
                                onClick={() => handleMenuClick(gender)}
                            >
                                {gender}
                            </button>
                            {activeMenu === gender && (
                                <div className="absolute top-full left-0 bg-white border shadow rounded mt-1 w-40 z-50">
                                    {categories[gender].map((type) => (
                                        <Link
                                            key={type}
                                            to={`/category/${gender}/${type}`}
                                            className="block px-4 py-2 hover:bg-pink-100"
                                            onClick={() => setActiveMenu(null)}
                                        >
                                            {type}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <Link to="/favorites" className="hover:text-pink-600">Favorilerim</Link>
                    <Link to="/cart" className="hover:text-pink-600">Sepetim</Link>

                    {user ? (
                        <UserMenu clearFavorites={clearFavorites} /> // 💡 Favori sıfırlayıcıyı UserMenu'ya gönderiyoruz
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-pink-600">Giriş Yap</Link>
                            <Link to="/register" className="hover:text-pink-600">Kayıt Ol</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;
