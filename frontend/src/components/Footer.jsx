import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white text-center py-6 mt-10">
      <p className="text-lg font-semibold">Join the Organic Revolution! 🌱</p>
      <div className="mt-3">
        <Link to="/about" className="mx-3 hover:underline">About Us</Link>
        <Link to="/contact" className="mx-3 hover:underline">Contact</Link>
        <Link to="/faq" className="mx-3 hover:underline">FAQ</Link>
      </div>
      <p className="mt-3 text-sm">&copy; {new Date().getFullYear()} FoodFarma. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
