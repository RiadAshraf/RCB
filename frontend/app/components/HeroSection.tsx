import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
  return (
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
          <Button className="bg-maroon-600 text-white px-6 py-3 rounded-lg">View Upcoming Marathons</Button>
          <Button className="bg-white text-green-600 border border-green-600 px-6 py-3 rounded-lg hover:text-white">Book Your Slot</Button>
        </div>
      </div>
    </section>
  );
}