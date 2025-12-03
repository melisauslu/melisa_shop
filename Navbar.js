import React from "react";
import { Link } from "react-router-dom";
import UserMenu from "./userMenu";

function Navbar() {
    return (
        <header className="bg-white shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-pink-500">
                    MelisaShop
                </Link>

                
                <nav className="flex items-center gap-4">
                    <Link
                        to="/products"
                        className="text-sm font-medium text-gray-700 hover:text-pink-500 transition"
                    >
                        Ürünler
                    </Link>
                    <Link
                        to="/cart"
                        className="text-sm font-medium text-gray-700 hover:text-pink-500 transition"
                    >
                        Sepetim 🛒
                    </Link>

                    
                    <UserMenu />
                </nav>
            </div>
        </header>
    );
}

export default Navbar;

