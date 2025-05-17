"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card"; // Removed CardContent since it's unused
import Image from "next/image"; // Added missing Image import
import { Button } from "@/components/ui/button"; // Added missing Button import

// Featured past event data
const featuredPastEvent = {
  title: "CTG RUN 10K - Chattogram",
  description: "The Chattogram 10K run brought together runners from across Bangladesh in a celebration of community and athleticism. Organized by Runners Community Bangladesh & Athletico, this event featured a scenic route through the beautiful port city.",
  date: "Friday, May 24, 2024 at 5:00am",
  image: "/ctg-run-10k.jpg",
  stats: {
    participants: "1,000+",
    distance: "10 km",
    finishers: "950+"
  },
  highlights: [
    "Event organized by Runners Community Bangladesh & Athletico",
    "Scenic route showcasing Chattogram's iconic landmarks",
    "Powered by Athletico with full support for runners"
  ],
  contactInfo: "01857518845"
};

// Sample past events data - commenting out since it's currently unused
// Alternatively, you could remove it completely if you don't plan to use it
/*
const pastEvents = [
  {
    title: "CTG RUN 10K - Chattogram",
    description: "A 10K run through the beautiful port city of Chattogram.",
    date: "Friday, May 24, 2024",
    image: "/ctg-run-10k.jpg",
  },
  {
    title: "Dhaka Marathon 2024",
    description: "The annual Dhaka Marathon attracted over 5,000 runners in a celebration of fitness and community.",
    date: "February 15, 2024",
    image: "/past-event-1.jpg",
  },
  {
    title: "Sylhet Trail Run",
    description: "Runners explored the beautiful tea gardens and hills in this challenging trail running event.",
    date: "August 5, 2023",
    image: "/past-event-3.jpg",
  },
];
*/

export default function PastEventsSection() {
  const router = useRouter(); // Initialize the router
  
  // Handler function to navigate to ctg2024 page
  const handleViewGallery = () => {
    router.push("/ctg-run-2024");
  };

  return (
    <section id="past-events" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Featured Past Event</h2>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          Relive the memories from our most successful running event in Chattogram. 
          This run showcased the spirit and determination of our running community.
        </p>
        
        <div className="max-w-5xl mx-auto">
          <Card className="shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="relative w-full h-full min-h-[300px]">
                  <Image
                    src={featuredPastEvent.image}
                    alt={featuredPastEvent.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              
              <div className="md:w-1/2 p-6">
                <h3 className="text-2xl font-bold">{featuredPastEvent.title}</h3>
                <p className="text-gray-500 mt-1 font-medium">{featuredPastEvent.date}</p>
                <p className="text-gray-600 mt-4">{featuredPastEvent.description}</p>
                
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="font-semibold">{featuredPastEvent.stats.participants}</p>
                    <p className="text-sm text-gray-600">Participants</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="font-semibold">{featuredPastEvent.stats.distance}</p>
                    <p className="text-sm text-gray-600">Distance</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="font-semibold">{featuredPastEvent.stats.finishers}</p>
                    <p className="text-sm text-gray-600">Finishers</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Event Highlights:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {featuredPastEvent.highlights.map((highlight, index) => (
                      <li key={index} className="text-gray-600">{highlight}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <Button onClick={handleViewGallery} className="bg-blue-600 text-white hover:bg-blue-700">
                    View Gallery
                  </Button>
                  <p className="text-sm text-gray-500">Contact: {featuredPastEvent.contactInfo}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Commented out section for past events grid */}
      </div>
    </section>
  );
}