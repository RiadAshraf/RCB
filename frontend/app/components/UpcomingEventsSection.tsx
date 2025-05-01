import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function UpcomingEventsSection() {
  const events = [
    {
      image: "/path-to-nyc-marathon.jpg",
      title: "New York City Marathon",
      description: "Experience the iconic route through all five boroughs of NYC.",
      date: "April 30, 2025",
    },
    {
      image: "/path-to-nyc-marathon.jpg",
      title: "Miami Beach Half Marathon",
      description: "Run along the beautiful coastline with ocean views.",
      date: "May 15, 2025",
    },
    {
      image: "/path-to-nyc-marathon.jpg",
      title: "Rocky Mountain Trail Run",
      description: "Challenge yourself on scenic mountain trails with breathtaking views.",
      date: "June 8, 2025",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center">Upcoming Events</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <Card key={index} className="shadow-lg">
            <div className="relative w-full h-0 pb-[56.25%]">
              <Image src={event.image} alt={event.title} layout="fill" objectFit="cover" />
            </div>
            <CardContent>
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-600 mt-2">{event.description}</p>
              <p className="text-gray-500 mt-4">{event.date}</p>
              <Button className="mt-4">Register</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}