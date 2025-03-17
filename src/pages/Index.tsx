
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/ui/hero/HeroSection';
import FeaturesSection from '@/components/ui/features/FeaturesSection';
import CropRecommendationSection from '@/components/ui/recommendations/CropRecommendationSection';

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col pt-12"> {/* Added pt-12 to account for location banner */}
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <CropRecommendationSection />
      </main>
      <Footer />
    </div>
  );
}
