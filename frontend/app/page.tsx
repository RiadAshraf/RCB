import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhyRegisterSection from "@/components/WhyRegisterSection";
import UpcomingEventsSection from "@/components/UpcomingEventsSection";
import PastEventsSection from "@/components/PastEventsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-gray-100">
      {/* Header is now positioned fixed */}
      <div className="fixed top-0 left-0 right-0 z-50 shadow-md">
        <Header />
      </div>

      {/* Add padding to the top to account for the fixed header */}
      <div className="pt-16">
        <HeroSection />
        <PastEventsSection />
        <UpcomingEventsSection />
        <WhyRegisterSection />
        <HowItWorksSection />
        <NewsletterSection />
        <Footer />
      </div>
    </div>
  );
}