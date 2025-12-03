import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        // backend'den gelen userData içinde username var
        const fixedUser = {
            ...userData,
            name: userData.username || userData.name || "Kullanıcı",
        };
        setUser(fixedUser);
        localStorage.setItem("user", JSON.stringify(fixedUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            const fixedUser = {
                ...parsedUser,
                name: parsedUser.username || parsedUser.name || "Kullanıcı",
            };
            setUser(fixedUser);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
