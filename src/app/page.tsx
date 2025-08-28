import Navigation from '@/components/shared/Navigation';
import BackgroundWrapper from '@/components/shared/BackgroundWrapper';
import HeroSection from '@/components/page-specific/hero/HeroSection';

export default function Home() {
  return (
    <BackgroundWrapper showFlowerShower={true} backgroundImage="/wedding-background.png">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
    </BackgroundWrapper>
  );
}