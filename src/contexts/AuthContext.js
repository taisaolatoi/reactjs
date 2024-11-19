import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null); // Thêm state cho role

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded.username);
                setRole(decoded.role); // Cập nhật role từ token
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Token không hợp lệ hoặc hết hạn", error);
                localStorage.removeItem("token");
                setIsAuthenticated(false);
            }
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
        setRole(null); // Reset role
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                role,
                logout,
                setIsAuthenticated,
                setUser,
                setRole,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
