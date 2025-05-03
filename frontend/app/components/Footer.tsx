import React from "react";

export default function Footer() {
  return (
    <footer className="py-8 bg-black text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Logo and Description */}
        <div>
          <h3 className="text-lg font-bold text-green-500">Logo</h3>
          <p className="mt-2 text-gray-400">
            Connecting runners with marathons worldwide since 2020.
          </p>
          <div className="flex justify-center md:justify-start mt-4 space-x-4">
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-green-500">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-green-500">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-green-500">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-green-500">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-red-500">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-green-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-green-500">
                Upcoming Marathons
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-green-500">
                How It Works
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-green-500">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-bold text-red-500">Support</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-green-500">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-green-500">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-green-500">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-green-500">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold text-red-500">Contact</h3>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li>
              <i className="fas fa-map-marker-alt"></i> 123 Runner&#39;s Way, Marathon City
            </li>
            <li>
              <i className="fas fa-envelope"></i> info@marathonplatform.com
            </li>
            <li>
              <i className="fas fa-phone"></i> +1 (555) 123-4567
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500">
        &copy; 2025 ArektaBoi ©. All rights reserved.
      </div>
    </footer>
  );
}