import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaArrowLeft } from "react-icons/fa";
import axiosInstance from "../helpers/axiosInstance";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("customer");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/auth/register/", {
                email,
                password,
                role: userType
            });
            alert("✅ Registration Successful! Please log in.");
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.error || "❌ Registration Failed. Try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-green-800 mb-4"
                >
                    <FaArrowLeft className="mr-2" /> Back
                </button>
                <h2 className="text-3xl font-extrabold text-center text-green-600  mb-6">Create Your Account</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                        >
                            <option value="customer">Customer</option>
                            <option value="farmer">Farmer</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
