import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhyRegisterSection from "@/components/WhyRegisterSection";
import UpcomingEventsSection from "@/components/UpcomingEventsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Header />
      <HeroSection />
      <WhyRegisterSection />
      <UpcomingEventsSection />
      <HowItWorksSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}