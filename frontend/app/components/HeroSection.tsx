"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function HeroSection() {
  const router = useRouter(); // Initialize the router

  const handleBookSlotClick = () => {
    console.log("Book Slot button clicked"); // Log the button click
    router.push("/booking"); // Navigate to the BookingPage
  };
  
  const handleViewDetailsClick = () => {
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
      className="z-0 brightness-40"
      />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-5"></div>
      <div className="relative z-10">
      <h1 className="text-5xl font-bold">Run with Purpose. Register for Marathons in Your City.</h1>
      <p className="mt-4 text-lg">Join thousands of runners and celebrate health, community, and achievement.</p>
      <div className="mt-6 space-x-4">
        <Button className="bg-maroon-600 text-white px-6 py-3 rounded-lg"
        onClick={handleViewDetailsClick} 
        >
        View Event Details
        </Button>
        <Button
        className="bg-white text-green-600 border border-green-600 px-6 py-3 rounded-lg hover:text-white"
        onClick={handleBookSlotClick}
        >
        Register Now
        </Button>
      </div>
      </div>
    </section>
  );
}