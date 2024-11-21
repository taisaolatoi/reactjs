import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(null);

    console.log("check authcontext:", isAuthenticated, user, role, userId);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded.username);
                setRole(decoded.role);
                setUserId(decoded.userId);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Token không hợp lệ hoặc hết hạn", error);
                localStorage.removeItem("token");
                setIsAuthenticated(false);
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        try {
            const decoded = jwtDecode(token);
            setUser(decoded.username);
            setRole(decoded.role);
            setUserId(decoded.userId);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Token không hợp lệ hoặc hết hạn", error);
            localStorage.removeItem("token");
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
        setRole(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                role,
                userId,
                logout,
                login, // Add the login function to the context
                setIsAuthenticated,
                setUser,
                setRole,
                setUserId,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
