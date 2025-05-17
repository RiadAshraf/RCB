"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { navigateIfAuthenticated } from "../utils/navigation";

export default function UpcomingEventsSection() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  
  // Get the showLoginPopup function from a shared context or state management
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
  
  const featuredEvent = {
    title: "ArektaBoi Run for Palestine",
    date: "18th July, 2025",
    location: "CRB, Chattogram",
    image: "/palestine-run.jpg",
    slogan: "Run for a Cause. Run for Freedom. Run for Palestine.",
    description: "This July 18th, the iconic CRB, Chattogram will come alive with passion, energy, and unity as we lace up not just for fitness — but for solidarity. After last year's incredible success, Runners Community Bangladesh is proud to host the second edition of our community run.",
    categories: ["10K Challenge", "5K Fun Run"],
    registrationStatus: "Early Bird Registration Open"
  };

  return (
    <section id="upcoming-events" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Upcoming Event</h2>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          Join us for our next major running event in Chattogram. Be part of a movement that combines 
          fitness with solidarity and community support.
        </p>
        
        <div className="max-w-5xl mx-auto">
          <Card className="shadow-lg overflow-hidden">
            {/* Image Section - Full Width */}
            <div className="relative w-full h-[300px]">
              <Image
                src={featuredEvent.image}
                alt={featuredEvent.title}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-green-600">Upcoming</Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white font-bold text-2xl">{featuredEvent.title}</h3>
                <p className="text-white/90">📅 {featuredEvent.date} | {featuredEvent.location} 🇵🇸</p>
              </div>
            </div>
            
            {/* Content Section */}
            <CardContent className="p-6">
              <p className="text-red-600 font-medium italic mb-4">🕊️ {featuredEvent.slogan}</p>
              <p className="text-gray-600 mb-6">{featuredEvent.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredEvent.categories.map((category, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1 border-gray-300">
                    {category}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <Button 
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={handleViewDetailsClick}
                >
                  View Event Details
                </Button>

                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">{featuredEvent.registrationStatus}</Badge>
                  <Button 
                    variant="outline" 
                    className="border-red-600 text-red-600 hover:bg-red-50"
                    onClick={handleBookSlotClick}
                  >
                    Register Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}