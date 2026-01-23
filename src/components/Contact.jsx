import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-black font-medium">Contact</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">
          
          {/* Left Sidebar: Contact Info */}
          <div className="lg:w-1/3 space-y-8 animate-fade-in-left">
            <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all duration-500 group">
              {/* Call Section */}
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-100 group-hover:scale-110 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black">Call To Us</h3>
              </div>
              <div className="space-y-4 text-gray-600 font-medium ml-1">
                <p className="leading-relaxed">We are available 24/7, 7 days a week.</p>
                <a href="tel:+8801611112222" className="block text-black hover:text-red-600 transition-colors text-lg font-semibold">Phone: +8801611112222</a>
              </div>
              
              <div className="my-10 border-t border-gray-100"></div>
              
              {/* Email Section */}
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-100 group-hover:scale-110 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black">Write To Us</h3>
              </div>
              <div className="space-y-4 text-gray-600 font-medium ml-1">
                <p className="leading-relaxed">Fill out our form and we will contact you within 24 hours.</p>
                <div className="space-y-2">
                  <a href="mailto:customer@exclusive.com" className="block text-black hover:text-red-600 transition-colors text-lg font-semibold">customer@exclusive.com</a>
                  <a href="mailto:support@exclusive.com" className="block text-black hover:text-red-600 transition-colors text-lg font-semibold">support@exclusive.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Contact Form */}
          <div className="lg:w-2/3 animate-fade-in-right">
            <div className="bg-white p-10 md:p-14 rounded-2xl border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all duration-500">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-black mb-2">Send Us a Message</h2>
                <p className="text-gray-400 font-medium">Have a specific inquiry? Our team is ready to help.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Name Input */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full bg-gray-50/50 border-2 border-gray-100 py-4 px-5 rounded-xl focus:bg-white focus:border-red-600 focus:outline-none transition-all duration-300 placeholder:text-gray-300 font-medium"
                    />
                  </div>
                  {/* Email Input */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="w-full bg-gray-50/50 border-2 border-gray-100 py-4 px-5 rounded-xl focus:bg-white focus:border-red-600 focus:outline-none transition-all duration-300 placeholder:text-gray-300 font-medium"
                    />
                  </div>
                  {/* Phone Input */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone"
                      required
                      className="w-full bg-gray-50/50 border-2 border-gray-100 py-4 px-5 rounded-xl focus:bg-white focus:border-red-600 focus:outline-none transition-all duration-300 placeholder:text-gray-300 font-medium"
                    />
                  </div>
                </div>
                
                {/* Message Input */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Detailed Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Describe your inquiry in detail..."
                    required
                    className="w-full bg-gray-50/50 border-2 border-gray-100 py-4 px-5 rounded-xl focus:bg-white focus:border-red-600 focus:outline-none transition-all duration-300 placeholder:text-gray-300 font-medium resize-none shadow-sm"
                  ></textarea>
                </div>
                
                {/* Submit Button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="group relative overflow-hidden bg-red-600 hover:bg-black text-white px-14 py-5 rounded-2xl font-bold tracking-widest uppercase transition-all duration-700 shadow-2xl shadow-red-200 hover:shadow-none transform hover:-translate-y-2 flex items-center gap-4"
                  >
                    <span className="relative z-10">Submit Inquiry</span>
                    <div className="relative z-10 bg-white/20 p-2 rounded-lg group-hover:bg-red-500 transition-colors duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
