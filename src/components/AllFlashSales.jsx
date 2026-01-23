import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllFlashSales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlashSales = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('http://localhost:5000/api/products/flash-sales');
        const flashSaleProducts = response.data.data || [];
        setProducts(flashSaleProducts);
        
      } catch (err) {
        console.error('Error fetching flash sales:', err);
        setError('Failed to load flash sale products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSales();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading amazing deals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-12 max-w-2xl mx-auto shadow-sm">
            <h2 className="text-2xl font-bold text-red-800 mb-2">Notice</h2>
            <p className="text-red-600 font-medium mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-black text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-black font-medium">Flash Sales</span>
        </nav>
      </div>

      <div className="container mx-auto px-4">
        {/* Standardized Premium Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 p-8 bg-gradient-to-r from-red-50 via-white to-white rounded-2xl border border-red-100 border-l-4 border-l-red-600 shadow-sm animate-fade-in-up">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="w-8 h-1 bg-red-600 rounded-full animate-pulse"></span>
              <h2 className="text-red-600 font-bold text-sm tracking-widest uppercase">Live Now</h2>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 leading-tight">Flash Sale <span className="text-red-600">Events</span></h1>
            <p className="text-gray-400 font-medium max-w-md mt-1">Limited time offers with unbeatable discounts. Grab them before they're gone!</p>
          </div>
          <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-red-50">
             <span className="text-gray-500 font-bold text-sm uppercase tracking-wider">Deals Found:</span>
             <span className="text-2xl font-black text-red-600">{products.length}</span>
          </div>
        </div>

        {/* Products Grid - 4 Columns */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
            {products.map((product) => (
              <div 
                key={product._id} 
                className="group cursor-pointer bg-white rounded-2xl border border-gray-100 hover:border-red-500/30 overflow-hidden hover:shadow-[0_20px_50px_rgba(220,38,38,0.1)] transition-all duration-700 animate-fade-in-up"
              >
                {/* Image Section */}
                <div className="bg-gray-50/50 h-[280px] relative flex items-center justify-center p-8 transition-colors duration-500 group-hover:bg-red-50/20 border-b border-gray-50 group-hover:border-red-50">
                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-red-600 text-white text-[11px] font-black px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-wider">
                      -{product.flashSale?.discountPercentage || 0}%
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-md border border-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </button>
                    <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-md border border-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>

                  <img 
                    src={product.images?.[0] || product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=Product'; }}
                  />
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col gap-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-base text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors uppercase tracking-tight">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black text-red-600">
                        {formatPrice(product.price)}
                      </span>
                      {product.flashSale?.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through font-bold">
                          {formatPrice(product.flashSale.originalPrice)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < Math.floor(product.averageRating || 5) ? "currentColor" : "#E5E7EB"} className="w-4 h-4">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-400 text-xs font-bold">({product.totalReviews || 0})</span>
                    </div>
                  </div>

                  {/* Add to Cart - Professional button below pricing, hidden by default */}
                  <button 
                    className="w-full bg-black hover:bg-red-600 text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-3 shadow-sm hover:shadow-xl active:scale-95 group/btn opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover/btn:scale-125 transition-transform duration-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
            <h3 className="text-3xl font-black text-gray-800 mb-4">No Flash Sales right now</h3>
            <p className="text-gray-400 font-medium text-lg mb-8">We're preparing new deals just for you. Please check back later!</p>
            <Link 
              to="/"
              className="bg-red-600 hover:bg-black text-white px-10 py-4 rounded-xl font-bold transition-all shadow-xl"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFlashSales;