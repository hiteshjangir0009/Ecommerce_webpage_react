import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Khet connect</h2>
          <p className="text-gray-400">Your go-to online store for the organic grains & exclusive deals.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li><NavLink className="hover:text-gray-200" to={'/'}>Home</NavLink></li>
            <li><NavLink className="hover:text-gray-200" to={'/product'}>Shop</NavLink></li>
            <li><NavLink className="hover:text-gray-200" to={'/about'}>About Us</NavLink></li>
            <li><NavLink className="hover:text-gray-200" to={'/contact'}>Contact</NavLink></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Support</h3>
          <ul className="text-gray-400 space-y-2">
            <li><a href="#" className="hover:text-gray-200">FAQs</a></li>
            <li><a href="#" className="hover:text-gray-200">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-gray-200">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-200">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaFacebookF /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
