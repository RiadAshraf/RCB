"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { navigateIfAuthenticated } from "../utils/navigation";

export default function HeroSection() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  
  // Get the showLoginPopup function from a shared context
  const showLoginPopup = () => {
    // This will be implemented using global state
    window.dispatchEvent(new CustomEvent('show-login-popup'));
  };

  const handleBookSlotClick = () => {
    // Use the utility function to handle protected navigation
    navigateIfAuthenticated(router, "/booking", isAuthenticated, showLoginPopup);
  };
  
  const handleViewDetailsClick = () => {
    // Public route, anyone can access
    router.push("/palestine-run-2025");
  };

  return (
    <section className="h-[500px] relative flex items-center justify-center text-center text-white">
      <Image
        src="/parallax-hero.jpg"
        alt="Hero Background"
        fill
        style={{ objectFit: "cover" }}
        quality={100}
        className="z-0 brightness-50"
      />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-5"></div>
      <div className="relative z-10">
        <h1 className="text-5xl font-bold">Run with Purpose. Register for Marathons in Your City.</h1>
        <p className="mt-4 text-lg">Join thousands of runners and celebrate health, community, and achievement.</p>
        <div className="mt-6 space-x-4">
          <Button 
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={handleViewDetailsClick} 
          >
            View Event Details
          </Button>
          <Button
            className="border-white text-white hover:bg-white/20"
            onClick={handleBookSlotClick}
          >
            Register Now
          </Button>
        </div>
      </div>
    </section>
  );
}