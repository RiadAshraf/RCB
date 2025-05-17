"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SignUpPopupProps {
  onClose: () => void;
  isVisible: boolean;
  onSignUpSuccess: (email: string) => void; // Callback for sign up success
  onSwitchToLogin?: () => void; // New prop to switch to login popup
}

export default function SignUpPopup({ 
  onClose, 
  isVisible, 
  onSignUpSuccess,
  onSwitchToLogin 
}: SignUpPopupProps) {
  const [signUpStatus, setSignUpStatus] = useState<"idle" | "success" | "failure">("idle");
  const [email, setEmail] = useState(""); // Track email input

  useEffect(() => {
    if (isVisible) {
      setSignUpStatus("idle"); // Reset sign up status when popup opens
    }
  }, [isVisible]);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    setTimeout(() => {
      const isSuccess = Math.random() > 0.5; // Random success/failure for demonstration

      if (isSuccess) {
        setSignUpStatus("success");
        onSignUpSuccess(email); // Notify parent component of successful sign up
        setTimeout(() => {
          onClose(); // Close popup after success
        }, 1000); // Optional delay for showing success message
      } else {
        setSignUpStatus("failure");
      }
    }, 2000); // Simulate a 2-second loading delay
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
      role="dialog"
      aria-labelledby="signup-title"
      aria-describedby="signup-description"
      onClick={onClose} // Close popup when clicking outside
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Popup Content */}
        <div>
          <h1 id="signup-title" className="text-2xl font-bold mb-4">
            Sign Up
          </h1>
          <p id="signup-description" className="text-gray-500 mb-6">
            Enter your information to create an account.
          </p>

          {/* Sign Up Form */}
          <form className="space-y-4" onSubmit={handleSignUp}>
            {/* Full Name Input */}
            <div>
              <Label htmlFor="full-name">Full Name</Label>
              <Input
                id="full-name"
                placeholder="John Doe"
                required
                className="mt-1"
              />
            </div>

            {/* Email Input */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="me@example.com"
                required
                className="mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
              />
            </div>

            {/* Password Input */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                className="mt-1"
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Re-enter your password"
                required
                className="mt-1"
              />
            </div>

            {/* Sign Up Button */}
            <Button type="submit" className="w-full bg-green-600">
              Sign Up
            </Button>

            {/* Switch to Login */}
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Button 
                  variant="link" 
                  className="text-blue-600 p-0 h-auto font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onSwitchToLogin) {
                      onClose(); // Close signup popup
                      setTimeout(() => {
                        onSwitchToLogin(); // Open login popup after a brief delay
                      }, 100); // Small delay for smoother transition
                    }
                  }}
                >
                  Login
                </Button>
              </p>
            </div>
          </form>

          {/* Sign Up Status Messages */}
          {signUpStatus === "success" && (
            <p className="mt-4 text-green-600 text-center">Sign up successful!</p>
          )}
          {signUpStatus === "failure" && (
            <p className="mt-4 text-red-600 text-center">Sign up failed. Please try again.</p>
          )}

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Sign Up Button */}
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 mt-4"
          >
            <Image
              src="/google-icon.svg"
              alt="Google Icon"
              width={20}
              height={20}
            />
            Sign Up with Gmail
          </Button>
        </div>
      </div>
    </div>
  );
}