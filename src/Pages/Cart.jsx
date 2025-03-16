import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Wheat, IndianRupee, Trash2 } from "lucide-react";
import Layout from "../Layout/Layout";
import { API_url, GetAPI, PostAPI } from "../Utils/API_config";

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        API_data();
    }, []);

    const API_data = async () => {
        try {
            const response = await GetAPI(API_url.Get_Cart_data);
            if (response.data) {
                setCart(response.data);
                calculateSubtotal(response.data);
            }
        } catch (error) {
            console.log("cart_error ==>>", error);
        }
    };

    const calculateSubtotal = (cartItems) => {
        let total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setSubtotal(total);
    };

    // ✅ API to increase quantity
    const Add_to_cart = async (name, price, quantity) => {
        const formdata = new FormData();
        formdata.append("product_name", name);
        formdata.append("price", price);
        formdata.append("quantity", quantity);

        try {
            await PostAPI(API_url.AddCard, formdata);
        } catch (error) {
            console.log("product_error ==>>", error);
        }
    };

    // ✅ API to decrease quantity
    const Reduce_from_cart = async (name, quantity) => {
        const formdata = new FormData();
        formdata.append("product_name", name);
        formdata.append("quantity", quantity);

        try {
            await PostAPI(API_url.ReduceQuantity, formdata);
        } catch (error) {
            console.log("reduce_item_error ==>>", error);
        }
    };

    const handleQuantityChange = async (item, delta) => {
        let newQuantity = item.quantity + delta;
    
        if (newQuantity < 1) {
            handleRemoveItem(item.product_name);
            return;
        }
    
        if (delta > 0) {
            await Add_to_cart(item.product_name, item.price, newQuantity);
        } else {
            await Reduce_from_cart(item.product_name, newQuantity);
        }
    
        // Reload page to reflect changes
        window.location.reload();
    };
    

    const handleRemoveItem = async (name) => {
        try {
            const formdata = new FormData();
            formdata.append("product_name", name);
    
            await PostAPI(API_url.RemoveCard, formdata);
    
            // Reload page to reflect changes
            window.location.reload();
        } catch (error) {
            console.log("remove_item_error ==>>", error);
        }
    };
    

    const shipping = subtotal > 0 && subtotal < 3000 ? 250 : 0;
    const total = subtotal + shipping;

    return (
        <Layout>
            <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
                <div className="container mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
                        Your Shopping Cart
                    </h1>

                    {cart.length === 0 ? (
                        <div className="text-center py-16">
                            <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 opacity-30 mb-4" />
                            <h2 className="text-xl md:text-2xl font-semibold mb-4">Your cart is empty</h2>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                Looks like you haven’t added anything to your cart yet. Browse our premium farm products and start shopping!
                            </p>
                            <button
                                onClick={() => navigate("/product")}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center mx-auto"
                            >
                                <Wheat className="mr-2 h-5 w-5" />
                                Browse Products
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6">
                                <div className="mb-4 flex justify-between items-center">
                                    <h2 className="text-lg md:text-xl font-semibold">{cart.length} Items</h2>
                                    <button className="text-red-500 hover:underline">Clear Cart</button>
                                </div>

                                {/* Cart Items List */}
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <div key={item._id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                                            <div className="flex items-center gap-4">
                                                {/* <img src={item.product_img || "https://via.placeholder.com/80"} alt={item.product_name} className="h-16 w-16 object-cover rounded-md" /> */}
                                                <div>
                                                    <h3 className="font-semibold">{item.product_name}</h3>
                                                    <p className="text-gray-500 text-sm">₹ {item.price.toFixed(2)} per unit</p>
                                                </div>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => handleQuantityChange(item, -1)}
                                                    className="border px-3 py-1 rounded-md"
                                                >
                                                    -
                                                </button>
                                                <span className="mx-3">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item, 1)}
                                                    className="border px-3 py-1 rounded-md"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Total Price & Remove Button */}
                                            <div className="flex items-center gap-4">
                                                <span className="font-semibold text-gray-700">₹ {(item.price * item.quantity).toFixed(2)}</span>
                                                <button onClick={() => handleRemoveItem(item.product_name)} className="text-red-500">
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1 bg-white shadow-md rounded-lg p-6 sticky top-24">
                                <h2 className="text-lg md:text-xl font-semibold mb-4">Order Summary</h2>

                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Subtotal</span>
                                        <span className="flex items-center">
                                            <IndianRupee className="h-3 w-3 mr-1" />
                                            {subtotal.toFixed(2)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Shipping</span>
                                        <span className="flex items-center">
                                            {shipping === 0 ? "Free" : (
                                                <>
                                                    <IndianRupee className="h-3 w-3 mr-1" />
                                                    {shipping.toFixed(2)}
                                                </>
                                            )}
                                        </span>
                                    </div>

                                    <div className="flex justify-between pt-3 text-lg font-semibold">
                                        <span>Total</span>
                                        <span className="flex items-center">
                                            <IndianRupee className="h-4 w-4 mr-1" />
                                            {total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <button onClick={() => navigate("/checkout")} className="bg-blue-600 text-white w-full py-3 rounded-lg mt-4">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
