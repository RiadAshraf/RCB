"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoginPopup from "./LoginPopup";
import RegisterPopup from "./RegisterPopup";
import Link from "next/link";

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
    }, 1500);
  };

  const handleRegisterSuccess = (email: string) => {
    setLoggedInUser(email); // Set the logged-in user's email
    setShowProgress(true); // Show progress ring
    setTimeout(() => {
      closeRegisterPopup(); // Close the register popup
      setShowProgress(false); // Hide progress ring
    }, 1500);
  };

  const handleLogout = () => {
    setShowProgress(true); // Show progress ring
    setTimeout(() => {
      setLoggedInUser(null); // Clear the logged-in user's email
      setShowProgress(false); // Hide progress ring
    }, 1500);
  };

  const handleScrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }); // Smooth scrolling to the section
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <div className="text-blue-600 text-2xl font-bold">
            <Button asChild variant="link">
              <Link href="/">Logo</Link>
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <Button asChild variant="link">
              <Link href="/">Home</Link>
            </Button>
            <Button
              asChild
              variant="link"
              onClick={() => handleScrollToSection("upcoming-events")}
            >
              <a href="#upcoming-events">Upcoming Events</a>
            </Button>
            <Button
              asChild
              variant="link"
              onClick={() => handleScrollToSection("how-it-works")}
            >
              <a href="#how-it-works">How It Works</a>
            </Button>
            <Button
              asChild
              variant="link"
              onClick={() => handleScrollToSection("contact-us")}
            >
              <a href="#contact-us">Contact Us</a>
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
          <div className="loader animate-spin w-12 h-12 border-4 border-t-blue-500 border-gray-300 rounded-full"></div>
        </div>
      )}

      {/* Login Popup */}
      <LoginPopup
        onClose={closeLoginPopup}
        isVisible={showLoginPopup}
        onLoginSuccess={handleLoginSuccess} // Pass login success handler
      />

      {/* Register Popup */}
      <RegisterPopup
        onClose={closeRegisterPopup}
        isVisible={showRegisterPopup}
        onRegisterSuccess={handleRegisterSuccess} // Pass register success handler
      />
    </>
  );
}