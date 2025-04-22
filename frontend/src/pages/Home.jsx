import React from "react";
import { Link } from "react-router-dom";
import { FaCarrot, FaLeaf, FaShoppingBasket } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-green-600 text-white text-center py-16 px-6">
        <h1 className="text-5xl font-extrabold">Welcome to FoodFarma</h1>
        <p className="mt-4 text-lg font-light max-w-2xl mx-auto">
          Experience the freshness of farm-to-table organic produce. Eat healthy, stay fit, and enjoy nature's best!
        </p>
        <Link
          to="/products"
          className="mt-6 inline-block bg-yellow-500 text-green-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition"
        >
          Shop Fresh Now
        </Link>
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop"
          alt="Fresh Organic Vegetables"
          className="mt-8 mx-auto rounded-lg shadow-lg w-full max-w-3xl"
        />
      </div>

      {/* Why Choose Us? */}
      <div className="text-center my-16">
        <h2 className="text-3xl font-bold text-green-700">Why Choose FoodFarma?</h2>
        <p className="text-gray-600 mt-2">
          The best organic and farm-fresh products delivered to your doorstep.
        </p>
        <div className="flex justify-center gap-10 mt-6">
          <div className="flex flex-col items-center">
            <FaCarrot className="text-4xl text-orange-500" />
            <h3 className="font-semibold mt-2">100% Organic</h3>
          </div>
          <div className="flex flex-col items-center">
            <FaLeaf className="text-4xl text-green-500" />
            <h3 className="font-semibold mt-2">Eco-Friendly Farming</h3>
          </div>
          <div className="flex flex-col items-center">
            <FaShoppingBasket className="text-4xl text-blue-500" />
            <h3 className="font-semibold mt-2">Fresh & Local</h3>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-white py-10">
        <h2 className="text-center text-3xl font-bold text-green-700 mb-6">Featured Products</h2>
        <div className="flex justify-center gap-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/1280px-Tomato_je.jpg"
              alt="Fresh Tomatoes"
              className="w-32 h-32 mx-auto rounded-full"
            />
            <h3 className="mt-2 font-semibold">Fresh Tomatoes</h3>
            <p className="text-gray-600">Rich in vitamins & antioxidants.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <img
              src="https://parentsafrica.com/wp-content/uploads/2017/01/bite-me-mIr3jL-770x470.jpeg"
              alt="Crunchy Carrots"
              className="w-32 h-32 mx-auto rounded-full"
            />
            <h3 className="mt-2 font-semibold">Crunchy Carrots</h3>
            <p className="text-gray-600">Good for eyes & immunity.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <img
              src="https://www.orgpick.com/cdn/shop/products/spnach_large_01cac1a1-246f-433c-b02b-e2c7986fe95c.jpg?v=1569550040"
              alt="Organic Spinach"
              className="w-32 h-32 mx-auto rounded-full"
            />
            <h3 className="mt-2 font-semibold">Organic Spinach</h3>
            <p className="text-gray-600">Iron-rich & super healthy.</p>
          </div>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="py-10 bg-green-50">
        <h2 className="text-center text-3xl font-bold text-green-700">What Our Customers Say</h2>
        <div className="flex justify-center gap-8 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <p className="text-gray-700">
              “I love how fresh the vegetables are! FoodFarma has changed the way my family eats.”
            </p>
            <h4 className="mt-4 font-semibold text-green-600">- Sarah J.</h4>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <p className="text-gray-700">
              “The best organic food store I’ve ever used! Highly recommended.”
            </p>
            <h4 className="mt-4 font-semibold text-green-600">- Michael R.</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
