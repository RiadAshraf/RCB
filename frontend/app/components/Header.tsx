"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoginPopup from "./LoginPopup";
import RegisterPopup from "./RegisterPopup";

export default function Header() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };

  const handleRegisterClick = () => {
    setShowRegisterPopup(true);
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  const closeRegisterPopup = () => {
    setShowRegisterPopup(false);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <div className="text-blue-600 text-2xl font-bold">
            <Button asChild variant="link">
              <a href="/">Logo</a>
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <Button asChild variant="link">
              <a href="/">Home</a>
            </Button>
            <Button asChild variant="link">
              <a href="/upcoming-marathons">Upcoming Marathons</a>
            </Button>
            <Button asChild variant="link">
              <a href="/how-it-works">How It Works</a>
            </Button>
            <Button asChild variant="link">
              <a href="/contact-us">Contact Us</a>
            </Button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Login Button */}
            <Button variant="ghost" onClick={handleLoginClick}>
              Login
            </Button>

            {/* Register Button */}
            <Button variant="ghost" onClick={handleRegisterClick}>
              Register
            </Button>
          </div>
        </div>
      </header>

      {/* Login Popup */}
      <LoginPopup onClose={closeLoginPopup} isVisible={showLoginPopup} />

      {/* Register Popup */}
      <RegisterPopup onClose={closeRegisterPopup} isVisible={showRegisterPopup} />
    </>
  );
}