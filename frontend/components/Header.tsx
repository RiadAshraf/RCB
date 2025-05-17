"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import LoginPopup from "./LoginPopup";
import SignUpPopup from "./SignUpPopup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { handlePostLoginRedirect } from "../utils/navigation";

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, userEmail, login, logout } = useAuth();
  
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  // Listen for custom events to show login popup
  useEffect(() => {
    const handleShowLogin = () => {
      setShowLoginPopup(true);
    };
    
    window.addEventListener("show-login-popup", handleShowLogin);
    
    return () => {
      window.removeEventListener("show-login-popup", handleShowLogin);
    };
  }, []);

  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };

  const handleSignUpClick = () => {
    setShowSignUpPopup(true);
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  const closeSignUpPopup = () => {
    setShowSignUpPopup(false);
  };

  const switchToSignUp = () => {
    setShowLoginPopup(false);
    setShowSignUpPopup(true);
  };
  
  const switchToLogin = () => {
    setShowSignUpPopup(false);
    setShowLoginPopup(true);
  };

  const handleLoginSuccess = (email: string) => {
    setShowProgress(true);
    
    setTimeout(() => {
      login(email);
      closeLoginPopup();
      setShowProgress(false);
      
      // Handle redirection if needed
      handlePostLoginRedirect(router);
    }, 1500);
  };

  const handleSignUpSuccess = (email: string) => {
    setShowProgress(true);
    
    setTimeout(() => {
      login(email);
      closeSignUpPopup();
      setShowProgress(false);
    }, 1500);
  };

  const handleLogout = () => {
    setShowProgress(true);
    
    setTimeout(() => {
      logout();
      setShowProgress(false);
    }, 1500);
  };

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="text-blue-600 text-2xl font-bold">
            <Link href="/">
              <span>Runners Community Bangladesh</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700 font-medium">Hi, {userEmail}</span>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={handleLoginClick}>
                  Login
                </Button>
                <Button variant="ghost" onClick={handleSignUpClick}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {showProgress && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="loader animate-spin w-12 h-12 border-4 border-t-blue-500 border-gray-300 rounded-full"></div>
        </div>
      )}

      <LoginPopup
        onClose={closeLoginPopup}
        isVisible={showLoginPopup}
        onLoginSuccess={handleLoginSuccess}
        onSwitchToSignUp={switchToSignUp}
      />

      <SignUpPopup
        onClose={closeSignUpPopup}
        isVisible={showSignUpPopup}
        onSignUpSuccess={handleSignUpSuccess}
        onSwitchToLogin={switchToLogin}
      />
    </>
  );
}