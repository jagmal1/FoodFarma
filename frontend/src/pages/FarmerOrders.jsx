import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../helpers/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaMapMarkerAlt, FaShoppingCart, FaMoneyBillWave, FaCreditCard, FaCheckCircle } from "react-icons/fa";

const FarmerOrders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchOrders();
    }, [user]);

    const fetchOrders = () => {
        axiosInstance.get(`/orders/farmer/${user.email}/`)
            .then((res) => setOrders(res.data))
            .catch(() => alert("Failed to fetch orders"));
    };

    const confirmOrder = (orderId) => {
        axiosInstance.post(`/orders/confirm/${orderId}/`)
            .then(() => {
                alert("✅ Order confirmed successfully!");
                fetchOrders(); // Refresh order list after confirmation
            })
            .catch(() => alert("❌ Failed to confirm order"));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
                <FaShoppingCart className="inline-block mb-2 text-green-600" /> Your Orders
            </h1>

            <div className="max-w-4xl mx-auto space-y-6">
                {orders.length === 0 ? (
                    <p className="text-gray-500 text-center text-lg">No orders found.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                            <div className="border-b pb-4 mb-4">
                                <p className="text-lg font-semibold text-gray-700 flex items-center">
                                    <FaUser className="text-green-600 mr-2" />
                                    <b>Customer Name:</b> <span className="text-gray-900 ml-2">{order.full_name}</span>
                                </p>
                                <p className="text-gray-600 text-sm flex items-center">
                                    <FaMapMarkerAlt className="text-red-500 mr-2" />
                                    <b>Order Location:</b> <span className="ml-2">{order.address}, {order.items[0]?.pincode || "N/A"}</span>
                                </p>
                                <p className="mt-2 text-gray-700">
                                    <b>Order Status:</b>
                                    <span className={`ml-2 px-3 py-1 text-sm font-medium rounded-full ${order.status === "Pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : order.status === "Confirmed"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-green-100 text-green-700"
                                        }`}>
                                        {order.status}
                                    </span>
                                </p>
                                <p className="text-gray-700 flex items-center">
                                    <FaMoneyBillWave className="text-green-600 mr-2" />
                                    <b>Total Price:</b> <span className="ml-2">₹{order.total_price}</span>
                                </p>
                                <p className="text-gray-700 flex items-center">
                                    <FaCreditCard className="text-blue-600 mr-2" />
                                    <b>Payment:</b> <span className="ml-2">{order.payment_method}</span>
                                </p>
                            </div>

                            <p className="text-lg font-semibold mb-2 flex items-center">
                                <FaShoppingCart className="text-green-600 mr-2" /> Ordered Items:
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {order.items.map((item, index) => (
                                    <li key={index} className="flex items-center bg-gray-100 p-3 rounded-lg shadow-sm hover:bg-gray-200 transition duration-300">
                                        <img
                                            src={item.image_url}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                                        />
                                        <div className="ml-4">
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-600">
                                                <b>Quantity:</b> {item.quantity}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <b>Price:</b> ₹{item.price}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* Confirm Order Button */}
                            {order.status === "Pending" && (
                                <button
                                    onClick={() => confirmOrder(order._id)}
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center justify-center"
                                >
                                    <FaCheckCircle className="mr-2" /> Confirm Order
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FarmerOrders;
