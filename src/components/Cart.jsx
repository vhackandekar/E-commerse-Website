import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
    const navigate = useNavigate();

    const shipping = 0; // Free shipping
    const total = cartTotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart is Empty</h2>
                <Link to="/all-products" className="bg-[#DB4444] text-white px-8 py-3 rounded-sm font-medium hover:bg-red-700 transition-colors">
                    Return To Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pb-20 pt-32">
            <div className="container mx-auto px-4 lg:px-20">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-16">
                    <Link to="/" className="hover:text-black">Home</Link>
                    <span>/</span>
                    <span className="text-black font-medium">Cart</span>
                </nav>

                {/* Cart Table Header */}
                <div className="hidden md:grid grid-cols-4 bg-white shadow-sm border border-black/5 p-6 rounded-sm mb-10 font-medium">
                    <div>Product</div>
                    <div className="text-center">Price</div>
                    <div className="text-center">Quantity</div>
                    <div className="text-right">Subtotal</div>
                </div>

                {/* Cart Items */}
                <div className="flex flex-col gap-8 mb-12">
                    {cartItems.map((item) => (
                        <div key={item._id} className="grid grid-cols-1 md:grid-cols-4 bg-white shadow-sm border border-black/5 p-6 rounded-sm items-center relative group">
                            {/* Remove Icon */}
                            <button 
                                onClick={() => removeFromCart(item._id)}
                                className="absolute -top-2 -left-2 bg-[#DB4444] text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gray-100 p-2 flex items-center justify-center rounded-sm">
                                    <img src={item.images?.[0] || item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                                </div>
                                <span className="font-medium text-sm line-clamp-1">{item.name}</span>
                            </div>

                            <div className="text-center mt-4 md:mt-0">
                                ${item.price}
                            </div>

                            <div className="flex justify-center mt-4 md:mt-0">
                                <div className="flex items-center border border-black/30 rounded-sm overflow-hidden h-10 w-24">
                                    <input 
                                        type="number" 
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                                        className="w-full text-center outline-none bg-transparent font-medium"
                                    />
                                    <div className="flex flex-col border-l border-black/30">
                                        <button 
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            className="h-1/2 px-1 hover:bg-gray-100"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                                            className="h-1/2 px-1 border-t border-black/30 hover:bg-gray-100"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right font-medium mt-4 md:mt-0">
                                ${item.price * item.quantity}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-20">
                    <Link to="/all-products" className="border border-black px-12 py-4 rounded-sm font-medium hover:bg-gray-50 transition-colors">
                        Return To Shop
                    </Link>
                    <button className="border border-black px-12 py-4 rounded-sm font-medium hover:bg-gray-50 transition-colors">
                        Update Cart
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Coupon */}
                    <div className="flex flex-wrap items-start gap-4 h-fit">
                        <input 
                            type="text" 
                            placeholder="Coupon Code"
                            className="w-[300px] border border-black p-4 rounded-sm outline-none"
                        />
                        <button className="bg-[#DB4444] text-white px-12 py-4 rounded-sm font-medium hover:bg-red-700 transition-colors">
                            Apply Coupon
                        </button>
                    </div>

                    {/* Cart Total Box */}
                    <div className="border-2 border-black rounded-md p-8 flex flex-col gap-6">
                        <h3 className="text-xl font-bold">Cart Total</h3>
                        
                        <div className="flex justify-between border-b border-black/10 pb-4">
                            <span>Subtotal:</span>
                            <span>${cartTotal}</span>
                        </div>

                        <div className="flex justify-between border-b border-black/10 pb-4">
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>

                        <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span>${total}</span>
                        </div>

                        <button 
                            onClick={() => navigate(`/checkout/${cartItems[0]._id}`)} // Simplified for now
                            className="bg-[#DB4444] text-white py-4 rounded-sm font-medium hover:bg-red-700 transition-colors mt-2"
                        >
                            Process to checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
