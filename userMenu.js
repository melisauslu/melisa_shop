import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FavoriteContext } from "../context/FavoriteContext"; // ⭐️ Favori context eklendi

function UserMenu() {
    const { user, logout } = useContext(AuthContext);
    const { clearFavorites } = useContext(FavoriteContext); // ⭐️ Favori temizleyici alındı
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef();

    // Dış tıklama ile menüyü kapatma
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!user) return null;

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
                <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold">
                    {user.name?.charAt(0).toUpperCase() || "👤"}
                </div>
                <span className="hidden sm:block font-semibold text-sm">
                    {user.name || "Kullanıcı"}
                </span>
            </button>

            {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50 py-2 text-sm">
                    <div className="px-4 py-2 font-semibold border-b"> {user.name}</div>
                    <Link
                        to="/favorites"
                        className="block px-4 py-2 hover:bg-gray-100 transition"
                        onClick={() => setMenuOpen(false)}
                    >
                        Favorilerim
                    </Link>
                    <Link
                        to="/orders"
                        className="block px-4 py-2 hover:bg-gray-100 transition"
                        onClick={() => setMenuOpen(false)}
                    >
                        Siparişlerim
                    </Link>
                    <Link
                        to="/settings"
                        className="block px-4 py-2 hover:bg-gray-100 transition"
                        onClick={() => setMenuOpen(false)}
                    >
                        Ayarlar
                    </Link>
                    <button
                        onClick={() => {
                            logout();              // Kullanıcı çıkışı
                            clearFavorites();      // ⭐️ Favorileri sıfırla
                            setMenuOpen(false);
                            navigate("/");
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                    >
                        Çıkış Yap
                    </button>
                </div>
            )}
        </div>
    );
}

export default UserMenu;
