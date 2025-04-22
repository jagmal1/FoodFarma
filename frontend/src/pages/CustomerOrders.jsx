import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../helpers/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { FaShoppingCart, FaMoneyBillWave, FaCreditCard, FaTruck, FaCheckCircle } from "react-icons/fa";

const CustomerOrders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchOrders();
    }, [user]);

    const fetchOrders = () => {
        axiosInstance.get(`/orders/customer/${user.email}`)
            .then((res) => {
                setOrders(res.data)
                console.log('res',res.data)
            })
            .catch(() => alert("Failed to fetch orders"));
        
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
                <FaShoppingCart className="inline-block mb-2 text-green-600" /> Your Orders
            </h1>

            <div className="max-w-4xl mx-auto space-y-6">
                {orders.length === 0 ? (
                    <p className="text-gray-500 text-center text-lg">You haven't placed any orders yet.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                            <div className="border-b pb-4 mb-4">
                                <p className="text-lg font-semibold text-gray-700 flex items-center">
                                    <FaTruck className="text-green-600 mr-2" />
                                    <b>Delivery Address:</b> <span className="text-gray-900 ml-2">{order.address}</span>
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
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CustomerOrders;
