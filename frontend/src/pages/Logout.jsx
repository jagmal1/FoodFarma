import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";

const Logout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-6">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm text-center">
                <FiLogOut className="w-12 h-12 mx-auto text-red-500 mb-4" />
                <h2 className="text-2xl font-bold text-green-600 mb-6">
                    Are you sure you want to logout?
                </h2>
                <div className="flex justify-between gap-4">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition duration-200"
                    >
                        Logout
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg transition duration-200"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;
