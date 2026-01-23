import React from 'react';
import { Link } from 'react-router-dom';
import storyImg from '../assets/about/story.png';
import founderImg from '../assets/about/founder.png';
import directorImg from '../assets/about/director.png';
import designerImg from '../assets/about/designer.png';

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-black font-medium">About</span>
        </nav>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 space-y-8 animate-fade-in-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tighter">Our Story</h1>
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed text-lg font-light">
              Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers across the region.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg font-light">
              Exclusive has more than 1 Million products to offer, growing at a very fast rate. Exclusive offers a diverse assortment in categories ranging from consumer electronics to household goods, beauty, fashion, sports equipment, and groceries.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 animate-fade-in-right">
          <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
            <img 
              src={storyImg} 
              alt="Professional team in South Asia" 
              className="w-full h-[550px] object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0"></div>
          </div>
        </div>
      </div>

      {/* Statistics Section - Redesigned (No Orange Box) */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { icon: '🏢', label: 'Sellers active our site', value: '10.5k' },
            { icon: '💰', label: 'Monthly Product Sale', value: '33k', active: true },
            { icon: '👥', label: 'Customer active in our site', value: '45.5k' },
            { icon: '🛍️', label: 'Anual gross sale in our site', value: '25k' }
          ].map((stat, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center justify-center p-10 rounded-2xl border transition-all duration-500 group relative overflow-hidden ${
                stat.active 
                ? 'border-red-600 bg-white shadow-[0_20px_50px_rgba(220,38,38,0.15)] -translate-y-3' 
                : 'border-gray-100 bg-gray-50/50 hover:bg-white hover:border-red-500/50 hover:-translate-y-2 hover:shadow-2xl'
              }`}
            >
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 blur-3xl rounded-full transition-opacity duration-500 ${
                stat.active ? 'bg-red-500/10 opacity-100' : 'bg-red-500/5 opacity-0 group-hover:opacity-100'
              }`}></div>
              
              <div className={`w-20 h-20 flex items-center justify-center rounded-2xl text-4xl mb-6 transition-all duration-500 ${
                stat.active 
                ? 'bg-red-600 text-white shadow-lg shadow-red-200 rotate-6' 
                : 'bg-white text-black shadow-sm group-hover:bg-red-600 group-hover:text-white group-hover:rotate-12'
              }`}>
                {stat.icon}
              </div>
              <h3 className="text-4xl font-extrabold mb-2 tracking-tight">{stat.value}</h3>
              <p className="text-sm text-center font-medium text-gray-400 group-hover:text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col items-center mb-16 space-y-4">
             <span className="text-red-600 font-bold tracking-widest uppercase text-sm">Founders & Leadership</span>
             <h2 className="text-4xl font-black text-black">Our Professional Team</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { name: 'Tom Cruise', role: 'Founder & Chairman', img: founderImg },
            { name: 'Emma Watson', role: 'Managing Director', img: directorImg },
            { name: 'Will Smith', role: 'Product Designer', img: designerImg }
          ].map((member, idx) => (
            <div key={idx} className="group animate-fade-in" style={{ animationDelay: `${idx * 200}ms` }}>
              <div className="bg-gray-50 rounded-3xl overflow-hidden h-[450px] mb-8 relative group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-all duration-700 border border-transparent hover:border-red-100">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex justify-center space-x-6">
                    <a href="#" className="text-white hover:text-red-500 transition-colors transform hover:scale-125">
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </a>
                    <a href="#" className="text-white hover:text-red-500 transition-colors transform hover:scale-125">
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    <a href="#" className="text-white hover:text-red-500 transition-colors transform hover:scale-125">
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-black mb-1 tracking-tighter">{member.name}</h3>
                <p className="text-gray-400 font-medium">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-24 border-t border-gray-100 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { icon: '🚚', title: 'FREE AND FAST DELIVERY', desc: 'Free delivery for all orders over $140' },
            { icon: '🎧', title: '24/7 CUSTOMER SERVICE', desc: 'Friendly 24/7 customer support' },
            { icon: '🛡️', title: 'MONEY BACK GUARANTEE', desc: 'We return money within 30 days' }
          ].map((service, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group transition-all duration-300">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-8 border-[10px] border-gray-200 group-hover:bg-red-600 group-hover:border-red-100 transition-all duration-500 shadow-sm">
                <span className="text-4xl group-hover:scale-125 transition-transform duration-500">{service.icon}</span>
              </div>
              <h3 className="text-xl font-black mb-3 group-hover:text-red-600 transition-colors tracking-tight">{service.title}</h3>
              <p className="text-gray-400 text-sm font-medium">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
