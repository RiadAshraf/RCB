import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8 bg-black text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo and Description */}
        <div>
          <h3 className="text-lg font-bold text-green-500">Runners Community Bangladesh</h3>
          <p className="mt-2 text-gray-400">
            Promoting running as a lifestyle in Bangladesh since 2020.
          </p>
          <div className="flex justify-center md:justify-start mt-4 space-x-4">
            <a 
              href="https://www.facebook.com/profile.php?id=61557362787443" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook" 
              className="text-gray-400 hover:text-green-500"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a 
              href="#" 
              aria-label="Instagram" 
              className="text-gray-400 hover:text-green-500"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Events */}
        <div>
          <h3 className="text-lg font-bold text-red-500">Events</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/palestine-run-2025" className="text-gray-400 hover:text-green-500">
                Palestine Run 2025
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-green-500">
                Past Events
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-green-500">
                Register for Events
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold text-red-500">Contact</h3>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li>
              <i className="fas fa-map-marker-alt"></i> CRB, Chattogram, Bangladesh
            </li>
            <li>
              <i className="fas fa-envelope"></i> info@runnerscommunitybd.com
            </li>
            <li>
              <i className="fas fa-phone"></i> +880 1XXX XXXXXX
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500">
        &copy; 2025 Runners Community Bangladesh. All rights reserved.
      </div>
    </footer>
  );
}