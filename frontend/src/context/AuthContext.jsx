import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../helpers/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  // ✅ Add loading state

    const loginUser = async (email, password) => {
        try {
            const response = await axiosInstance.post("/auth/login/", { email, password });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                setUser({ email: response.data.email, role: response.data.role });
                setIsAuthenticated(true);

                return {
                    success: true,
                    message: "Login successful",
                    role: response.data.role
                };
            } else {
                return { success: false, message: "Invalid credentials" };
            }
        } catch (error) {
            return { success: false, message: "Login failed" };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
    };

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await axiosInstance.get("/auth/me/", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIsAuthenticated(true);
                setUser({ email: res.data.email, role: res.data.role });
            } catch {
                logout();
            } finally {
                setLoading(false);  // ✅ Set loading to false after check
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, loginUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
