import Hero from "@/components/Hero";
import Apps from "@/components/Apps";
import Philosophy from "@/components/Philosophy";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="relative z-40 bg-cream-50">
        <Apps />
        <Philosophy />
        <Footer />
      </div>
    </main>
  );
}
