import LandingPage from '@/components/page/landingpage';
import { Navbar } from '@/components/layout/Navbar';

export default function HomePage() {
  return (
    <>
      <Navbar transparent />
      <main>
        <LandingPage />
        {/* WebinarDiscovery, CategoriesSection, etc. */}
      </main>
    </>
  );
}
