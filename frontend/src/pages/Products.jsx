import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { FaShoppingCart, FaTag, FaGlobe, FaMapPin } from "react-icons/fa";
import axiosInstance from "../helpers/axiosInstance";
import { AuthContext } from "../context/AuthContext";

const predefinedCountries = [
  { value: "India", label: "India" },
  { value: "USA", label: "USA" },
  { value: "Canada", label: "Canada" },
  { value: "UK", label: "UK" },
  { value: "Australia", label: "Australia" }
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [pincode, setPincode] = useState("");

  const { user } = useContext(AuthContext);

  // Fetch products from backend
  useEffect(() => {
    axiosInstance.get("/products/")
      .then((res) => {
        console.log("Products: ", res.data);
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(() => alert("Failed to load products"));
  }, []);

  // Filter products whenever selectedCountry, pincode, or products change
  useEffect(() => {
    let filtered = products;

    if (selectedCountry) {
      filtered = filtered.filter(
        (product) => product.country === selectedCountry.value
      );
    }

    if (pincode) {
      filtered = filtered.filter((product) => product.pincode.startsWith(pincode));
    }

    setFilteredProducts(filtered);
  }, [selectedCountry, pincode, products]);

  // Add to cart function
  const addToCart = async (productId) => {
    setLoading((prev) => ({ ...prev, [productId]: true }));
    try {
      await axiosInstance.post("/cart/add/", { product_id: productId });
      alert("✅ Product added to cart!");
    } catch (error) {
      alert("❌ Failed to add product");
    }
    setLoading((prev) => ({ ...prev, [productId]: false }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
        Our Products
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-center items-center mb-6 gap-4">
        <div className="w-full md:w-1/3">
          <Select
            options={predefinedCountries}
            value={selectedCountry}
            onChange={setSelectedCountry}
            placeholder="Select Country..."
            isClearable
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Enter Pincode..."
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-black"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          product.is_available && (
            <div
              key={product._id}
              className="bg-white p-4 rounded-lg shadow-md transform transition duration-500 hover:scale-105"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FaTag className="text-green-500 mr-2" /> {product.name}
              </h2>
              <p className="text-green-600 text-lg font-bold flex items-center">
                <FaShoppingCart className="mr-2" /> ${product.price}
              </p>

              {/* Country & Pincode */}
              <p className="text-gray-700 mt-1 flex items-center">
                <FaGlobe className="mr-2" /> <b>Country:</b> {product.country || "N/A"}
              </p>
              <p className="text-gray-700 flex items-center">
                <FaMapPin className="mr-2" /> <b>Pincode:</b> {product.pincode || "N/A"}
              </p>

              {user && user.role === 'customer' && (
                <button
                  onClick={() => addToCart(product._id)}
                  disabled={loading[product._id]}
                  className={`mt-4 px-4 py-2 rounded-md transition flex items-center justify-center ${loading[product._id]
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                >
                  {loading[product._id] ? "Adding..." : <><FaShoppingCart className="mr-2" /> Add to Cart</>}
                </button>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Products;