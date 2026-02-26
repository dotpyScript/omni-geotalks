import LandingPage from '@/components/page/landingpage';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar transparent />
      <main>
        <LandingPage />
        {/* WebinarDiscovery, CategoriesSection, etc. */}
      </main>
      <Footer />
    </>
  );
}
