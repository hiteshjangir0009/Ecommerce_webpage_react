import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { API_url, GetAPI, PostAPI } from '../Utils/API_config';
import Cookies from "js-cookie";

const Checkout = () => {
    // Example state to manage products in the cart
    const [cartItems, setCartItems] = useState([]);
    const [shippingAddress, setShippingAddress] = useState({
        state: "",
        city: "",
        pincode: "",
        address: ""
    });
    

    useEffect(() => {
        cart_req();
    }, []);

    const cart_req = async () => {
        try {
            const response = await GetAPI(API_url.Get_Cart_data);
            console.log("cart==>>", response);
            setCartItems(response.data);
        } catch (error) {
            console.log("checkout error ==>>", error);
        }
    };

    const checkout_req = async () => {
        const token = Cookies.get("Access_token");

        if (!shippingAddress.state || !shippingAddress.city || !shippingAddress.pincode || !shippingAddress.address) {
            alert("Please fill in all shipping address fields.");
            return;
        }

        console.log(cartItems.flat());
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const raw = JSON.stringify({
            "cart": cartItems,
            "totalAmount": calculateTotal(),
            "paymentStatus": "Pending",
            "shippingAddress": shippingAddress
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch("http://3.110.244.96:8000/api/v1/checkout/checkout", requestOptions);
            const result = await response.json();
            console.log("result ==>>",result);
            if (result.success ==true) {
                alert("your order is on the way")
            }
        } catch (error) {
            console.error(error);
        };
    };


    // Function to calculate total price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto pt-30 p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Checkout</h2>

                {/* Cart Items */}
                <div className="mb-6 ">
                    <h3 className="text-xl font-semibold">Cart Items</h3>
                    <table className="min-w-full mt-4">
                        <thead>
                            <tr>
                                <th className="border-b px-4 py-2 text-left">Product</th>
                                <th className="border-b px-4 py-2 text-left">Price</th>
                                <th className="border-b px-4 py-2 text-left">Quantity</th>
                                <th className="border-b px-4 py-2 text-left">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item._id}>
                                    <td className="border-b px-4 py-2">{item.product_name}</td>
                                    <td className="border-b px-4 py-2">{item.price} ₹</td>
                                    <td className="border-b px-4 py-2">{item.quantity}</td>
                                    <td className="border-b px-4 py-2">{item.price * item.quantity} ₹</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Customer Information Form */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Customer Information</h3>
                    <form className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium">Full Name</label>
                            <input type="text" className="w-full p-2 border rounded" placeholder="Enter your full name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email Address</label>
                            <input type="email" className="w-full p-2 border rounded" placeholder="Enter your email address" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Phone Number</label>
                            <input type="tel" className="w-full p-2 border rounded" placeholder="Enter your phone number" />
                        </div>
                    </form>
                </div>

                {/* Shipping Address */}
                {/* Shipping Address */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Shipping Address</h3>

                    <div className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium">State</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="Enter your state"
                                value={shippingAddress.state}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">City</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="Enter your city"
                                value={shippingAddress.city}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Pincode</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="Enter your pincode"
                                value={shippingAddress.pincode}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Address</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="Enter your full address"
                                value={shippingAddress.address}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                            />
                        </div>
                    </div>
                </div>


                {/* Payment Information */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Payment Information</h3>
                    <form className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium">Card Number</label>
                            <input type="text" className="w-full p-2 border rounded" placeholder="Enter your card number" />
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium">Expiry Date</label>
                                <input type="text" className="w-full p-2 border rounded" placeholder="MM/YY" />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium">CVV</label>
                                <input type="text" className="w-full p-2 border rounded" placeholder="CVV" />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg font-semibold">Order Summary</h3>
                    <div className="flex justify-between mt-2">
                        <span className="text-sm">Subtotal</span>
                        <span className="font-semibold">{calculateTotal()} ₹</span>
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="text-sm">Shipping</span>
                        <span className="font-semibold">50 ₹</span>
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="text-sm">Total</span>
                        <span className="font-semibold">{calculateTotal() + 50} ₹</span>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    onClick={checkout_req}
                    className="w-full mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Proceed to Payment
                </button>
            </div>
        </Layout>
    );
};

export default Checkout;
