import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existing = prevItems.find(
                (item) =>
                    item.id === product.id &&
                    item.name === product.name &&
                    item.selectedSize === product.selectedSize
            );

            if (existing) {
                return prevItems.map((item) =>
                    item.id === product.id &&
                        item.name === product.name &&
                        item.selectedSize === product.selectedSize
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id, selectedSize) => {
        setCartItems((prevCart) =>
            prevCart.filter(
                (item) => !(item.id === id && item.selectedSize === selectedSize)
            )
        );
    };


    const clearCart = () => {
        setCartItems([]);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                getTotalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
