import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    console.log('Loading:', loading, 'Authenticated:', isAuthenticated);

    if (loading) {
        return <div>Loading...</div>;  // ✅ Show loading instead of redirecting
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
