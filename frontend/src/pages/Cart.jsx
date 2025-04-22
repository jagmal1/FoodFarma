import React, { useState, useEffect } from "react";
import axiosInstance from "../helpers/axiosInstance";
import { FaTrash, FaShoppingCart, FaShoppingBag } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";

const Cart = () => {
  const [cart, setCart] = useState({ items: [], total_price: 0 });

  // Fetch cart on mount
  useEffect(() => {
    axiosInstance.get("/cart/")
      .then(res => setCart(res.data.cart))
      .catch(() => alert("Failed to load cart"));
  }, []);

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      await axiosInstance.post("/cart/remove/", { product_id: productId });
      setCart(prevCart => ({
        ...prevCart,
        items: prevCart.items.filter(item => item.product_id !== productId),
        total_price: prevCart.items
          .filter(item => item.product_id !== productId)
          .reduce((acc, item) => acc + item.price * item.quantity, 0),
      }));
    } catch (error) {
      alert("Failed to remove item");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Cart Header */}
      <h1 className="text-3xl font-bold text-center text-green-600 flex items-center justify-center gap-2 mb-6">
        <FaShoppingCart className="text-3xl" /> Your Cart
      </h1>

      {cart.items.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          {cart.items.map((item) => (
            <div key={item.product_id} className="flex justify-between items-center border-b py-4">
              <div className="flex items-center">
                {/* Product Image */}
                {item.image_url && (
                  <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded-lg border" />
                )}

                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600 text-sm">💵 Price: ₹{item.price}</p>
                  <p className="text-gray-600 text-sm">🔢 Quantity: {item.quantity}</p>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.product_id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center gap-2 transition"
              >
                <FaTrash /> Remove
              </button>
            </div>
          ))}

          {/* Cart Footer */}
          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <MdOutlinePayments className="text-green-600 text-3xl" />
              Total: ₹{cart.total_price.toFixed(2)}
            </h2>
            <a href="/checkout" className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 flex items-center gap-2 transition">
              <FaShoppingBag /> Proceed to Checkout
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
