"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RegisterPopupProps {
  onClose: () => void;
  isVisible: boolean;
}

export default function RegisterPopup({ onClose, isVisible }: RegisterPopupProps) {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
      role="dialog"
      aria-labelledby="register-title"
      aria-describedby="register-description"
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
          <h1 id="register-title" className="text-2xl font-bold mb-4">
            Register
          </h1>
          <p id="register-description" className="text-gray-500 mb-6">
            Enter your information to create an account.
          </p>

          {/* Register Form */}
          <form className="space-y-4">
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

            {/* Register Button */}
            <Button type="submit" className="w-full bg-green-600">
              Register
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
            className="w-full flex items-center justify-center gap-2 mt-4"
          >
            <img
              src="/google-icon.svg"
              alt="Google Icon"
              className="w-5 h-5"
            />
            Register with Gmail
          </Button>
        </div>
      </div>
    </div>
  );
}