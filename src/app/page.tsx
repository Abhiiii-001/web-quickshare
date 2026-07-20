import AuroraBackground from "./_components/AuroraBackground";
import Navbar from "./_components/NavBar";
import TransferCard from "./_components/TransferCard";
import HeroSection from "./_components/HeroSection";
import Footer from "./_components/Footer";
import AdSlot from "./_components/AdSlot";

export default function Home() {
  return (
    <div className="flex h-[100dvh] w-full overflow-y-auto flex-col bg-[#110524]">
      <AuroraBackground />
      <Navbar />

      <main 
        id="main-content"
        role="main" 
        className="flex-1 flex flex-col justify-center items-center w-full px-4 md:px-6 pt-24 md:pt-32 pb-24 md:pb-16 relative z-10"
      >
        <AdSlot position="header-below" className="hidden md:block" />

        <div className="flex flex-col w-full max-w-7xl mx-auto md:flex-row items-start gap-8 md:gap-12 lg:gap-24 h-full">
          <div className="flex-1 w-full flex items-center justify-center lg:justify-start">
            <HeroSection />
          </div>
          <div className="flex-1 w-full max-w-md mx-auto md:max-w-none flex items-center justify-center lg:justify-end">
            <TransferCard />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
