import React from "react";
import Logo from "../../assest/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#04092C] text-white py-10 px-6 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row flex-wrap justify-between gap-10 text-sm">
        
        {/* Brand */}
        <div className="flex-1 min-w-[200px]">
          <img src={Logo} alt="MetaTicket Logo" className="mb-4 w-32" />
          <p className="text-gray-400 mt-2">
            Your trusted partner for discovering and booking trending events.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1 min-w-[160px]">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:text-white transition-colors duration-200">Home</a></li>
            <li><a href="/aboutUs" className="hover:text-white transition-colors duration-200">About Us</a></li>
            <li><a href="/contactUs" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-gray-300">
            Email: <a href="mailto:sparessupport@metaticket.in" className="hover:text-white">sparessupport@metaticket.in</a>
          </p>
          <p className="text-gray-300">
            Phone: <a href="tel:8884518856" className="hover:text-white">8884518856</a>
          </p>
        </div>

        {/* Address & Hours */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-lg font-semibold mb-3">Visit Us</h3>
          <p className="text-gray-300">Working Days: Monday - Sunday</p>
          <p className="text-gray-300">Hours: 8:00AM - 8:00PM (IST)</p>
          <p className="text-gray-300 mt-2">
            1717 Harrison St,<br />
            San Francisco, CA 94103, INDIA
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-xs text-gray-500 mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} MetaTicket. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
