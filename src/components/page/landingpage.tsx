import HeroSection from '@/components/sections/HeroSection';
import WebinarDiscovery from '../sections/WebinarDiscovery';
// import AboutSection from '../sections/about/AboutSection';
// import AboutSection2 from '../sections/AboutSection';
import AboutSection3 from '../sections/files3/AboutSection';
import CategoriesSection from '../sections/files/CategoriesSection';
import Speaker from '../sections/files1/SpeakersSection';

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <AboutSection3 />
      <WebinarDiscovery />
      {/* <AboutSection /> */}
      {/* <AboutSection2 /> */}
      <CategoriesSection />
      <Speaker />
    </main>
  );
}
