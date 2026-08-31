import HeroSection from '@/components/HeroSection';
import ServicesOverview from '@/components/ServicesOverview';
import FeaturedProjects from '@/components/FeaturedProjects';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <main className="min-h-screen bg-blueprint-dark text-white">
      {/* Hero Section - Blueprint Stage */}
      <section className="relative h-screen overflow-hidden blueprint-stage">
        {/* Technical depth overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/30" />

        <HeroSection />
      </section>

      {/* Services Overview */}
      <ServicesOverview />

      {/* Featured Projects */}
      <FeaturedProjects />

      {/* Call to Action */}
      <CTASection />
    </main>
  );
}
