import HeroSection from '@/components/sections/HeroSection';
import AboutSection3 from '../sections/aboutSection/AboutSection';
import CategoriesSection from '../sections/categorySection/CategoriesSection';
import Speaker from '../sections/speakerSection/SpeakersSection';
import HowItWorksSection from '../sections/howItWorks/HowItWorksSection';
import CTAAndFooter from '../sections/CTA/CTASection';
import WebinarShowcase from './WebinerShowcase';

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <AboutSection3 />
      <CategoriesSection />
      <Speaker />
      <HowItWorksSection />
      <WebinarShowcase />
      <CTAAndFooter />
    </main>
  );
}
