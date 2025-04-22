import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { FaShoppingBag, FaClipboardList, FaSignOutAlt, FaSignInAlt, FaTruck } from "react-icons/fa";

const Navbar = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <nav className="bg-green-600 p-4 text-white flex justify-between items-center shadow-md">
      {/* Logo & Home Link */}
      <Link to="/" className="text-2xl font-bold flex items-center space-x-2 hover:text-gray-200 transition duration-200">
        <AiOutlineHome className="text-white text-2xl" />
        <span>FoodFarma</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        {isAuthenticated && user?.role === 'customer' && (
          <>
            <Link to="/products" className="flex items-center space-x-2 hover:text-gray-200 transition duration-200">
              <FaShoppingBag className="text-xl" /> <span>Products</span>
            </Link>

            <Link to="/cart" className="flex items-center space-x-2 hover:text-gray-200 transition duration-200">
              <AiOutlineShoppingCart className="text-xl" /> <span>Cart</span>
            </Link>

            {/* My Orders Link for Customers */}
            <Link to="/myorders" className="flex items-center space-x-2 hover:text-gray-200 transition duration-200">
              <FaTruck className="text-xl" /> <span>My Orders</span>
            </Link>
          </>
        )}

        {isAuthenticated && user?.role === 'farmer' && (
          <>
            <Link to="/dashboard" className="flex items-center space-x-2 hover:text-gray-200 transition duration-200">
              <AiOutlineUser className="text-xl" /> <span>Dashboard</span>
            </Link>

            <Link to="/orders" className="flex items-center space-x-2 hover:text-gray-200 transition duration-200">
              <FaClipboardList className="text-xl" /> <span>Orders</span>
            </Link>
          </>
        )}

        {/* Auth Buttons */}
        {isAuthenticated ? (
          <Link to="/logout" className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 flex items-center space-x-2 transition duration-200">
            <FaSignOutAlt /> <span>Logout</span>
          </Link>
        ) : (
          <Link to="/login" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2 transition duration-200">
            <FaSignInAlt /> <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
