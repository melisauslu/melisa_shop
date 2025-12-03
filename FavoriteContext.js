import React, { createContext, useState } from "react";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (product) => {
        const alreadyFavorite = favorites.find((item) => item._id === product._id);
        if (!alreadyFavorite) {
            setFavorites((prev) => [...prev, product]);
        }
    };

    const removeFromFavorites = (productId) => {
        setFavorites((prev) => prev.filter((item) => item._id !== productId));
    };

    const clearFavorites = () => {
        setFavorites([]); 
    };

    return (
        <FavoriteContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                clearFavorites,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};


