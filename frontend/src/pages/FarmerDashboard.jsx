import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../helpers/axiosInstance";
import {
    CheckCircleIcon,
    XCircleIcon,
    TrashIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/solid";

const predefinedCountries = ["India", "USA", "Canada", "UK", "Australia"];

const FarmerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: null,
        country: "",
        pincode: "",
    });

    const [imagePreview, setImagePreview] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axiosInstance.get("/products/farmer/");
            setProducts(res.data);
        } catch (error) {
            alert("Failed to load products");
        }
    };

    const handleAddProduct = async () => {
        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("price", newProduct.price);
        formData.append("image", newProduct.image);
        formData.append("country", newProduct.country);
        formData.append("pincode", newProduct.pincode);

        try {
            await axiosInstance.post("/products/farmer/add-product/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Product added!");
            fetchProducts();
            setNewProduct({ name: "", price: "", image: null, country: "", pincode: "" });
            setImagePreview(null);
            document.getElementById("imageUpload").value = "";
        } catch (error) {
            alert("Failed to add product");
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNewProduct({ ...newProduct, image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Toggle Availability
    const toggleAvailability = async (productId, currentAvailability) => {
        try {
            const newAvailability = !currentAvailability;
            const response = await axiosInstance.post("/products/farmer/update-availability/", {
                product_id: productId,
                is_available: newAvailability,
            });

            if (response.status === 200) {
                // ✅ Update UI immediately
                setProducts(products.map(product =>
                    product._id === productId ? { ...product, is_available: newAvailability } : product
                ));
            }
        } catch (error) {
            alert("Failed to update availability");
        }
    };

    // Delete Product
    const handleDeleteProduct = async (productId) => {
        try {
            const response = await axiosInstance.delete(`/products/farmer/delete/${productId}/`);

            if (response.status === 200) {
                // ✅ Remove from UI without reload
                setProducts(products.filter(product => product._id !== productId));
                alert("Product deleted!");
            }
        } catch (error) {
            alert("Failed to delete product");
        }
    };

    return (
        <div className="min-h-screen p-8 bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
                Farmer Dashboard 🌾
            </h2>

            {/* Add New Product Form */}
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                    Add a New Product
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
                    />

                    <select
                        value={newProduct.country}
                        onChange={(e) => setNewProduct({ ...newProduct, country: e.target.value })}
                        className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
                    >
                        <option value="">Select Country</option>
                        {predefinedCountries.map((country, index) => (
                            <option key={index} value={country}>{country}</option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder="Pincode"
                        value={newProduct.pincode}
                        onChange={(e) => setNewProduct({ ...newProduct, pincode: e.target.value })}
                        className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Image Upload */}
                <div className="mt-4">
                    <label className="block text-gray-600 font-semibold mb-2">Upload Image</label>
                    <div
                        className="border-2 border-dashed border-gray-300 p-4 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
                        onClick={() => document.getElementById("imageUpload").click()} // ✅ Trigger file input click
                    >
                        <input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="h-40 w-full object-contain shadow-md border-2 border-gray-300"
                            />

                        ) : (
                            <p className="text-gray-500">Click to upload an image</p>
                        )}
                    </div>
                </div>


                <button
                    onClick={handleAddProduct}
                    className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg flex items-center justify-center font-semibold"
                >
                    <PlusCircleIcon className="w-6 h-6 mr-2" /> Add Product
                </button>
            </div>

            {/* Display Products */}
            <h3 className="text-xl font-semibold mb-4">Your Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="bg-white p-4 shadow rounded">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded mb-3"
                        />
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <p className="text-gray-600">Price: ${product.price}</p>
                        <p className="text-gray-600">Location: {product.country}, {product.pincode}</p>
                        <p className={`mt-2 font-bold flex items-center ${product.is_available ? "text-green-600" : "text-red-600"}`}>
                            {product.is_available ? (
                                <>
                                    <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" /> Available
                                </>
                            ) : (
                                <>
                                    <XCircleIcon className="w-5 h-5 mr-2 text-red-500" /> Not Available
                                </>
                            )}
                        </p>

                        {/* Toggle Availability */}
                        <button
                            onClick={() => toggleAvailability(product._id, product.is_available)}
                            className={`mt-2 px-4 py-2 flex items-center rounded ${product.is_available ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
                        >
                            {product.is_available ? (
                                <>
                                    <XCircleIcon className="w-5 h-5 mr-2" /> Mark as Unavailable
                                </>
                            ) : (
                                <>
                                    <CheckCircleIcon className="w-5 h-5 mr-2" /> Mark as Available
                                </>
                            )}
                        </button>

                        {/* Delete Product */}
                        <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="mt-2 px-4 py-2 bg-gray-700 text-white rounded flex items-center"
                        >
                            <TrashIcon className="w-5 h-5 mr-2" /> Delete Product
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FarmerDashboard;
