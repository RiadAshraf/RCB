import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="h-[500px] relative flex items-center justify-center text-center text-white">
      <Image
        src="/parallax-hero.jpg"
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0 brightness-40"
      />
      <div className="relative z-10">
        <h1 className="text-5xl font-bold">Run with Purpose. Register for Marathons in Your City.</h1>
        <p className="mt-4 text-lg">Join thousands of runners and celebrate health, community, and achievement.</p>
        <div className="mt-6 space-x-4">
        <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg">View Upcoming Marathons</Button>
        <Button className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg">Register Now</Button>
        </div>
      </div>
      </section>

      {/* Why Register Section */}
      <section className="py-16 text-center bg-white">
        <h2 className="text-3xl font-bold">Why Register Through Us?</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: "📝", title: "Easy Registration", description: "Simple process to sign up for any marathon in just a few clicks." },
            { icon: "🔒", title: "Secure Payment", description: "Your transaction details are encrypted and protected at all times." },
            { icon: "📡", title: "Real-time Updates", description: "Get notifications about event changes, weather alerts, and more." },
            { icon: "🎽", title: "Free T-shirt & Bib Kit", description: "Receive a complimentary race kit with every registration." },
          ].map((item, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <div className="text-blue-600 text-4xl mb-4">{item.icon}</div>
                <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center">Upcoming Events</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
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
          ].map((event, index) => (
        <Card key={index} className="shadow-lg">
          <div className="relative w-full h-0 pb-[56.25%]">
            <Image src={event.image} alt={event.title} layout="fill" objectFit="cover" />
          </div>
          <CardContent>
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-600 mt-2">{event.description}</p>
            <p className="text-gray-500 mt-4">{event.date}</p>
            <Button className="mt-4 bg-blue-600 text-white">Register</Button>
          </CardContent>
        </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold">How It Works</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: "1️⃣", title: "Sign Up", description: "Create your account in less than a minute." },
            { step: "2️⃣", title: "Browse Marathons", description: "Find events that match your schedule and preferences." },
            { step: "3️⃣", title: "Register & Pay", description: "Complete your registration with secure payment options." },
            { step: "4️⃣", title: "Collect Bib & Run", description: "Pick up your race kit and enjoy the event!" },
          ].map((item, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <div className="text-blue-600 text-4xl mb-4">{item.step}</div>
                <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold">What Runners Say</h2>
        <div className="mt-8">
          <Card className="max-w-xl mx-auto shadow-lg">
            <CardContent>
              <blockquote className="text-gray-600 italic">
                "I love how easy it is to find races that match my preferences. The detailed event information helps me prepare properly, and the community aspect makes running even more enjoyable."
              </blockquote>
              <p className="mt-4 font-semibold">- Sarah Chen, Seattle, WA</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold">Stay Updated on the Next Big Run</h2>
        <p className="mt-4 text-gray-600">Join our newsletter to receive updates about upcoming marathons and exclusive offers.</p>
        <div className="mt-6 flex justify-center items-center space-x-4">
          <Input type="email" placeholder="Enter your email" className="w-64" />
          <Button className="bg-blue-600 text-white">Subscribe</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white text-center">
        <p>&copy; 2025 Marathon Registration Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}