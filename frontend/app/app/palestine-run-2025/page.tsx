"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { navigateIfAuthenticated } from "../../utils/navigation";

export default function Page() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });
  const { ref: infoRef, inView: infoInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: categoriesRef, inView: categoriesInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: benefitsRef, inView: benefitsInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  // Show login popup function
  const showLoginPopup = () => {
    window.dispatchEvent(new CustomEvent("show-login-popup"));
  };

  // Handle registration button click
  const handleRegisterClick = () => {
    navigateIfAuthenticated(router, "/booking", isAuthenticated, showLoginPopup);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="relative h-[60vh] bg-black"
      >
        <Image 
          src="/palestine-run.jpg" 
          alt="Palestine Run 2025" 
          fill 
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
        
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16 relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Badge className="bg-green-600 mb-4">July 18th, 2025</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              ArektaBoi Run for Palestine
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-6">
              🕊️ Run for a Cause. Run for Freedom. Run for Palestine.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg"
              onClick={handleRegisterClick}
              >
                Register Now
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white z-30 shadow-md">
        <div className="container mx-auto px-4">
          <Tabs 
            defaultValue="overview" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="registration">Registration</TabsTrigger>
              <TabsTrigger value="details">Event Details</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            {/* Overview Tab */}
            <TabsContent value="overview">
              <motion.div 
                ref={infoRef}
                initial={{ y: 50, opacity: 0 }}
                animate={infoInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Event Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-lg">
                      This July 18th, the iconic CRB, Chittagong will come alive with passion, energy, and 
                      unity as we lace up not just for fitness — but for solidarity.
                    </p>
                    <p>
                      After last year&apos;s incredible success, Runners Community Bangladesh is proud to host 
                      the second edition of our community run — one that carries a message far beyond the 
                      finish line.
                    </p>
                    <p>
                      Every footstep you take will echo with hope, resilience, and support for the people 
                      of Palestine. 🇵🇸
                    </p>
                    <p>
                      We won&apos;t just be running — we&apos;ll be standing shoulder to shoulder, hearts aligned, 
                      voices raised through movement.
                    </p>
                    <p>
                      Join us in making a powerful statement of unity and peace. 🕊️
                    </p>
                    
                    <div className="pt-4">
                      <Button className="bg-red-600 hover:bg-red-700"
                              onClick={handleRegisterClick}>
                        Register Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Event Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">📆</div>
                        <div>
                          <p className="font-medium">Date</p>
                          <p className="text-gray-600">18th July, 2025</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">📍</div>
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-gray-600">CRB, Chittagong</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">🏃‍♂️</div>
                        <div>
                          <p className="font-medium">Distances</p>
                          <p className="text-gray-600">5K and 10K</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">🎬</div>
                        <div>
                          <p className="font-medium">Start Time</p>
                          <p className="text-gray-600">5:30 AM</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">📞</div>
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-gray-600">+880 1XXXXXXXXX</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">✉️</div>
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-gray-600">palestinerun@rcb.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">🌐</div>
                        <div>
                          <p className="font-medium">Website</p>
                          <p className="text-gray-600">www.runnersbd.com</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
              
              {/* Countdown Section */}
              <div className="mt-12">
                <EventCountdown targetDate="2025-07-18T05:30:00" />
              </div>
              
              {/* What Participants Will Receive */}
              <motion.div
                ref={benefitsRef}
                initial={{ y: 40, opacity: 0 }}
                animate={benefitsInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-12"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="text-xl mr-2">🎁</span> What Participants Will Receive
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="text-3xl mb-2">👕</div>
                        <h3 className="font-medium mb-1">Palestine-Themed Premium Jersey</h3>
                        <p className="text-gray-600 text-sm">Exclusive running kit designed specially for this event</p>
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="text-3xl mb-2">🥇</div>
                        <h3 className="font-medium mb-1">Finisher Medal</h3>
                        <p className="text-gray-600 text-sm">Beautiful, mesmerizing medal for all finishers</p>
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="text-3xl mb-2">💧</div>
                        <h3 className="font-medium mb-1">Hydration & Refreshments</h3>
                        <p className="text-gray-600 text-sm">Unlimited hydration at aid stations throughout the course</p>
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="text-3xl mb-2">🍎</div>
                        <h3 className="font-medium mb-1">Food Pack</h3>
                        <p className="text-gray-600 text-sm">Delicious post-race food pack for recovery</p>
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="text-3xl mb-2">✊</div>
                        <h3 className="font-medium mb-1">Inspiring Run</h3>
                        <p className="text-gray-600 text-sm">A run with a powerful message of solidarity</p>
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="text-3xl mb-2">❓</div>
                        <h3 className="font-medium mb-1">More to Come</h3>
                        <p className="text-gray-600 text-sm">Stay tuned for more exciting surprises!</p>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Safety Section */}
              <div className="mt-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="text-xl mr-2">🛡️</span> Safety First – We&apos;ve Got You Covered
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white p-4 rounded-lg shadow-sm border flex items-start">
                        <div className="text-3xl mr-3">🚑</div>
                        <div>
                          <h3 className="font-medium mb-1">On-site Ambulance Service</h3>
                          <p className="text-gray-600 text-sm">Emergency medical transport available if needed</p>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm border flex items-start">
                        <div className="text-3xl mr-3">👨‍⚕️</div>
                        <div>
                          <h3 className="font-medium mb-1">Doctors & Medical Team</h3>
                          <p className="text-gray-600 text-sm">Professional medical staff throughout the course</p>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm border flex items-start">
                        <div className="text-3xl mr-3">🩺</div>
                        <div>
                          <h3 className="font-medium mb-1">First Aid & Medical Booths</h3>
                          <p className="text-gray-600 text-sm">Strategically placed medical stations</p>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-center font-medium mt-6">Your safety is our top priority!</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Categories Tab */}
            <TabsContent value="categories">
              <motion.div
                ref={categoriesRef}
                initial={{ opacity: 0 }}
                animate={categoriesInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="text-xl mr-2">🏁</span> Event Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="text-3xl mb-3">👟</div>
                        <h3 className="text-xl font-medium mb-2">10K Challenge</h3>
                        <p className="text-gray-600">Perfect for seasoned runners ready to test their endurance.</p>
                      </div>
                      
                      <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="text-3xl mb-3">👟</div>
                        <h3 className="text-xl font-medium mb-2">5K Fun Run</h3>
                        <p className="text-gray-600">A great choice for beginners and casual runners alike!</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>👥 Age & Gender Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6">
                      To celebrate all age groups and abilities, we&apos;ve structured the event into following categories:
                    </p>
                    
                    <h3 className="text-lg font-semibold mb-4">Categories Eligible for Prize Money</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {[
                        { number: "1️⃣", name: "Male Open – 5K", age: "18–45 yrs", prize: true },
                        { number: "2️⃣", name: "Male Open – 10K", age: "18–45 yrs", prize: true },
                        { number: "3️⃣", name: "Female Open – 5K", age: "18–45 yrs", prize: true },
                        { number: "4️⃣", name: "Female Open – 10K", age: "18–45 yrs", prize: true }
                      ].map((category, index) => (
                        <motion.div 
                          key={index}
                          whileHover={{ scale: 1.03 }}
                          className="bg-white p-4 rounded-lg shadow-sm border flex items-center"
                        >
                          <div className="bg-red-600 text-white h-10 w-10 rounded-full flex items-center justify-center mr-4">
                            {category.number}
                          </div>
                          <div>
                            <h4 className="font-medium">{category.name}</h4>
                            <p className="text-gray-600">({category.age}) 🎁</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-4">Categories Only For Podiums</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { number: "5️⃣", name: "Young Stars – 5K", age: "0–17 yrs", prize: false },
                        { number: "6️⃣", name: "Young Stars – 10K", age: "0–17 yrs", prize: false },
                        { number: "7️⃣", name: "Veterans – 5K", age: "45+ yrs", prize: false },
                        { number: "8️⃣", name: "Veterans – 10K", age: "45+ yrs", prize: false }
                      ].map((category, index) => (
                        <motion.div 
                          key={index}
                          whileHover={{ scale: 1.03 }}
                          className="bg-white p-4 rounded-lg shadow-sm border flex items-center"
                        >
                          <div className="bg-blue-600 text-white h-10 w-10 rounded-full flex items-center justify-center mr-4">
                            {category.number}
                          </div>
                          <div>
                            <h4 className="font-medium">{category.name}</h4>
                            <p className="text-gray-600">({category.age})</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>🏆 Prize Money Eligibility</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">🎁</div>
                        <p>Only the Open Category (18–45 yrs) is eligible for prize money.</p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">🎖️</div>
                        <p>All other categories will be honoured with podium recognition and beautiful crests.</p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">🥇</div>
                        <p>And don&apos;t worry — every finisher receives a stunning medal as a badge of honour!</p>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-6">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">📢</div>
                        <p>Prize amounts will be announced later — just a small gesture to inspire our brilliant runners!</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            {/* Registration Tab */}
            <TabsContent value="registration">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>💳 Registration Fees</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <span className="text-xl mr-2">🎫</span> Early Bird (Limited Slots)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div 
                          whileHover={{ scale: 1.03 }}
                          className="bg-white p-6 rounded-lg shadow-sm border border-green-100 bg-green-50"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-xl font-medium">5K</h4>
                              <p className="text-green-800 font-bold text-2xl mt-2">949 BDT</p>
                            </div>
                            <div className="text-green-600">✅</div>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          whileHover={{ scale: 1.03 }}
                          className="bg-white p-6 rounded-lg shadow-sm border border-green-100 bg-green-50"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-xl font-medium">10K</h4>
                              <p className="text-green-800 font-bold text-2xl mt-2">1049 BDT</p>
                            </div>
                            <div className="text-green-600">✅</div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <span className="text-xl mr-2">🎫</span> Standard Registration
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div 
                          whileHover={{ scale: 1.03 }}
                          className="bg-white p-6 rounded-lg shadow-sm border"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-xl font-medium">5K</h4>
                              <p className="text-gray-800 font-bold text-2xl mt-2">1049 BDT</p>
                            </div>
                            <div className="text-green-600">✅</div>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          whileHover={{ scale: 1.03 }}
                          className="bg-white p-6 rounded-lg shadow-sm border"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-xl font-medium">10K</h4>
                              <p className="text-gray-800 font-bold text-2xl mt-2">1149 BDT</p>
                            </div>
                            <div className="text-green-600">✅</div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-8">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">🎓</div>
                      <p>Student discounts may be announced soon — stay tuned!</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button className="bg-red-600 hover:bg-red-700 text-lg px-8 py-6" 
                            onClick={handleRegisterClick}>
                        Register Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Event Details Tab */}
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>📍 Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                          <span className="text-xl mr-2">🗺️</span> Location
                        </h3>
                        <p className="text-gray-700 mb-2">CRB, Chittagong</p>
                        <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                          <p className="text-gray-600">Map will be available soon</p>
                        </div>
                      </div>
                      
                      <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                          <span className="text-xl mr-2">⏰</span> Schedule
                        </h3>
                        <div className="space-y-3">
                          <div className="flex">
                            <div className="w-24 font-medium">5:00 AM</div>
                            <div>Reporting Time</div>
                          </div>
                          <div className="flex">
                            <div className="w-24 font-medium">5:30 AM</div>
                            <div>Starting Ceremony</div>
                          </div>
                          <div className="flex">
                            <div className="w-24 font-medium">6:00 AM</div>
                            <div>10K Race Start</div>
                          </div>
                          <div className="flex">
                            <div className="w-24 font-medium">6:15 AM</div>
                            <div>5K Race Start</div>
                          </div>
                          <div className="flex">
                            <div className="w-24 font-medium">8:30 AM</div>
                            <div>Award Ceremony</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Column */}
                    <div className="space-y-6">
                      <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                          <span className="text-xl mr-2">🚰</span> Aid Stations
                        </h3>
                        <p className="text-gray-700 mb-4">We&apos;ll have well-stocked aid stations along the course:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Water stations every 2.5 km</li>
                          <li>Sports drinks available at all stations</li>
                          <li>Medical assistance at key points</li>
                          <li>Energy gels at 5km point (10K race only)</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                          <span className="text-xl mr-2">📱</span> Stay Connected
                        </h3>
                        <p className="text-gray-700 mb-4">Follow us on social media for the latest updates:</p>
                        <div className="flex gap-4">
                          <Button variant="outline" className="flex-1">Facebook</Button>
                          <Button variant="outline" className="flex-1">Instagram</Button>
                        </div>
                        <p className="mt-4 text-gray-700">Tag your photos with:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary">#RunForPalestine</Badge>
                          <Badge variant="secondary">#ArektaboiRun</Badge>
                          <Badge variant="secondary">#RCB2025</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-lg font-semibold mb-2">✊ This is more than a run.</p>
                        <p className="text-gray-600">It&apos;s a movement. A message. A mission.</p>
                        <p className="text-gray-600 mt-2">Join us in running for something greater — for freedom, unity, and Palestine.</p>
                        <p className="text-gray-600 mt-2">Be part of a powerful cause. Let your stride speak louder than words.</p>
                        
                        <div className="mt-6">
                          <Button className="bg-red-600 hover:bg-red-700 mx-auto" 
                            onClick={handleRegisterClick}>Register Now</Button>
                        </div>
                        
                        <p className="mt-6 text-sm text-gray-500">📣 Stay tuned for registration links, exciting announcements, and surprises!</p>
                        <p className="mt-2 text-sm text-gray-500">🔖 Mark your calendars now — July 18th. We run together. 🇵🇸</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

// Event Countdown Component
function EventCountdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Event Countdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 text-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-red-600 rounded-lg p-4 text-white"
          >
            <p className="text-3xl font-bold">{timeLeft.days}</p>
            <p className="text-sm">Days</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-red-600 rounded-lg p-4 text-white"
          >
            <p className="text-3xl font-bold">{timeLeft.hours}</p>
            <p className="text-sm">Hours</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-red-600 rounded-lg p-4 text-white"
          >
            <p className="text-3xl font-bold">{timeLeft.minutes}</p>
            <p className="text-sm">Minutes</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-red-600 rounded-lg p-4 text-white"
          >
            <p className="text-3xl font-bold">{timeLeft.seconds}</p>
            <p className="text-sm">Seconds</p>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}