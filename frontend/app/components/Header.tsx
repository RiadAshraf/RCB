"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoginPopup from "./LoginPopup";
import RegisterPopup from "./RegisterPopup";

export default function Header() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null); // Track logged-in user email
  const [showProgress, setShowProgress] = useState(false); // State to control progress ring visibility

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

  const handleLoginSuccess = (email: string) => {
    setLoggedInUser(email); // Set the logged-in user's email
    setShowProgress(true); // Show progress ring
    setTimeout(() => {
      closeLoginPopup(); // Close the login popup
      setShowProgress(false); // Hide progress ring
    }, 1000);
  };

  const handleLogout = () => {
    setShowProgress(true); // Show progress ring
    setTimeout(() => {
      setLoggedInUser(null); // Clear the logged-in user's email
      setShowProgress(false); // Hide progress ring
    }, 1000);
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
            {loggedInUser ? (
              <>
                <span className="text-gray-700 font-medium">Hi, {loggedInUser}</span>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Button variant="ghost" onClick={handleLoginClick}>
                  Login
                </Button>

                {/* Register Button */}
                <Button variant="ghost" onClick={handleRegisterClick}>
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Progress Ring */}
      {showProgress && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="loader"></div>
          <span className="text-white mt-4">Loading...</span>
        </div>
      )}

      {/* Login Popup */}
      <LoginPopup
        onClose={closeLoginPopup}
        isVisible={showLoginPopup}
        onLoginSuccess={handleLoginSuccess} // Pass login success handler
      />

      {/* Register Popup */}
      <RegisterPopup onClose={closeRegisterPopup} isVisible={showRegisterPopup} />
    </>
  );
}