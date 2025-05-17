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
      <Header />
      <HeroSection />
      <PastEventsSection />
      <UpcomingEventsSection />
      <WhyRegisterSection />
      <HowItWorksSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}