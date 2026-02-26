import HeroSection from '@/components/sections/HeroSection';
// import AboutSection from '../sections/about/AboutSection';
// import AboutSection2 from '../sections/AboutSection';
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
      {/* <AboutSection /> */}
      {/* <AboutSection2 /> */}
      <CategoriesSection />
      <Speaker />
      <HowItWorksSection />
      <WebinarShowcase />
      <CTAAndFooter />
    </main>
  );
}
