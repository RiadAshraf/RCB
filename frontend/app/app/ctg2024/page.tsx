"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Import the extracted components and data
import StorySection from "@/components/ctg-run/StorySection"; 
import StatItem from "@/components/ctg-run/StatItem";
import { eventDetails } from "../data/ctg-run-details";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center text-white">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4 text-center px-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {eventDetails.title}
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-200 mb-2 text-center px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {eventDetails.date}
              </motion.p>
            </div>
            <div className="bg-slate-200 h-full w-full flex items-center justify-center">
              <Image
                src="/ctg-run-10k.jpg"
                alt="CTG Run 2024 Hero"
                fill
                priority
                className="object-cover"
              />
            </div>
          </motion.div>
          
          {/* Event Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Event Overview</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {eventDetails.description}
            </p>
            
            {/* Statistics */}
            <div className="grid grid-cols-3 gap-6 my-10">
              <StatItem value={eventDetails.stats.participants} label="Participants" />
              <StatItem value={eventDetails.stats.distance} label="Distance" />
              <StatItem value={eventDetails.stats.finishers} label="Finishers" />
            </div>
            
            {/* Event Highlights */}
            <Card className="p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Event Highlights:</h3>
              <ul className="list-disc pl-5 space-y-2">
                {eventDetails.highlights.map((highlight, index) => (
                  <li key={index} className="text-gray-700">{highlight}</li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900">Contact Information:</h4>
                <p className="text-gray-700 mt-1">{eventDetails.contactInfo}</p>
              </div>
            </Card>
          </motion.div>
          
          <Separator className="my-16" />
          
          {/* Photo Gallery Section */}
          <motion.h2
            className="text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Event Photo Gallery
          </motion.h2>
          
          <motion.p 
            className="text-lg text-slate-600 mb-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Follow our journey through this exciting marathon event
          </motion.p>
          
          {/* Gallery Items - Mapped from data file */}
          {eventDetails.gallery.map((item) => (
            <StorySection key={item.id}>
              <div className="aspect-[16/9] relative bg-slate-200">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  className={`object-${item.objectFit || 'cover'}`}
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3">{item.title}</h2>
                <p className="text-slate-600">{item.description}</p>
              </div>
            </StorySection>
          ))}
          
          {/* Call to Action */}
          <motion.div 
            className="mt-12 mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-6">Join Our Next Running Event</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Don&apos;t miss out on our upcoming events. Register now and be part of our growing running community in Bangladesh.
            </p>
            <Button 
              className="bg-red-600 text-white hover:bg-red-700 px-8 py-2.5 rounded-md text-lg"
            >
              View Upcoming Events
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}