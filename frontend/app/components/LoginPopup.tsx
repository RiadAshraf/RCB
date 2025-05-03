"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface LoginPopupProps {
  onClose: () => void;
  isVisible: boolean;
  onLoginSuccess: (email: string) => void; // Callback for login success
}

export default function LoginPopup({ onClose, isVisible, onLoginSuccess }: LoginPopupProps) {
  const [loginStatus, setLoginStatus] = useState<"idle" | "success" | "failure">("idle");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isVisible) {
      setLoginStatus("idle"); // Reset login status when popup opens
    }
  }, [isVisible]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate login logic
    const isSuccess = Math.random() > 0.5; // Random success/failure for demonstration
    if (isSuccess) {
      setLoginStatus("success");
      onLoginSuccess(email); // Pass the email to the parent component
      setTimeout(() => {
        onClose(); // Close popup after success
      }, 1000); // Optional delay for showing success message
    } else {
      setLoginStatus("failure");
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
      role="dialog"
      aria-labelledby="login-title"
      aria-describedby="login-description"
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
          <h1 id="login-title" className="text-2xl font-bold mb-4">
            Login
          </h1>
          <p id="login-description" className="text-gray-500 mb-6">
            Enter your email and password to access your account.
          </p>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email Input */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Link
                href="#"
                className="text-sm text-blue-600 hover:underline mt-2 block text-right"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Login Button */}
            <Button type="submit" className="w-full bg-green-600">
              Login
            </Button>
          </form>

          {/* Login Status Messages */}
          {loginStatus === "success" && (
            <p className="mt-4 text-green-600 text-center">Login successful!</p>
          )}
          {loginStatus === "failure" && (
            <p className="mt-4 text-red-600 text-center">Login failed. Please try again.</p>
          )}

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Login Button */}
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <Image
              src="/google-icon.svg"
              alt="Google Icon"
              width={20}
              height={20}
            />
            Login with Gmail
          </Button>
        </div>
      </div>
    </div>
  );
}