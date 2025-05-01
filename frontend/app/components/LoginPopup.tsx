"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface LoginPopupProps {
  onClose: () => void;
  isVisible: boolean;
}

export default function LoginPopup({ onClose, isVisible }: LoginPopupProps) {
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
          <form className="space-y-4">
            {/* Email Input */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="mt-1"
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
            <img
              src="/google-icon.svg"
              alt="Google Icon"
              className="w-5 h-5"
            />
            Login with Gmail
          </Button>
        </div>
      </div>
    </div>
  );
}