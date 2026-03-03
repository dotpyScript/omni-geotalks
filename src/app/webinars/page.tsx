import Footer from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import WebinarDiscovery from '@/components/sections/webinerDiscovery';
export default function WebinarsPage() {
  return (
    <>
      <Navbar />
      <main>
        <WebinarDiscovery />
      </main>
      <Footer />
    </>
  );
}
