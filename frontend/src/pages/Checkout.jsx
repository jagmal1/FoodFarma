import React, { useContext, useState } from "react";
import axiosInstance from "../helpers/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaMapMarkerAlt, FaMoneyBillWave, FaShoppingBag } from "react-icons/fa";

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });

  const [loading, setLoading] = useState(false);
  const { user, cart } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post("/orders/create/", {
        customer: user._id,
        items: cart,
        full_name: formData.fullName,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
      });

      alert("✅ Order placed successfully!");
      navigate("/products");
    } catch (error) {
      alert("❌ Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-6 flex items-center justify-center gap-2">
        <FaShoppingBag className="text-3xl" /> Checkout
      </h1>

      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>

          {/* Full Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
            <div className="relative">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg pl-10"
                placeholder="Enter your full name"
                required
              />
              <FaUser className="absolute left-3 top-4 text-gray-400" />
            </div>
          </div>

          {/* Address Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Address</label>
            <div className="relative">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg pl-10"
                placeholder="Enter your address"
                required
              />
              <FaMapMarkerAlt className="absolute left-3 top-4 text-gray-400" />
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Payment Method</label>
            <div className="relative">
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg pl-10"
              >
                <option>Cash on Delivery</option>
                <option>UPI Payment</option>
                <option>Credit/Debit Card</option>
              </select>
              <FaMoneyBillWave className="absolute left-3 top-4 text-gray-400" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 transition"
            disabled={loading}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
