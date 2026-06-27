import AuroraBackground from './_components/AuroraBackground';
import Navbar from './_components/NavBar';
import TransferCard from './_components/TransferCard';
import HeroSection from './_components/HeroSection';

export default function Home() {
  return (
    <>
      <main className="flex items-center w-full h-screen overflow-y-auto md:overflow-hidden md:px-6">
        <AuroraBackground />
        <Navbar />

        <div className="z-10 flex flex-col w-full md:flex-row items-center pt-28">
          <div className='flex-1 md:flex-2'>
            <HeroSection />
          </div>
          <div className="flex-1 pb-12 md:pb-0">
            <TransferCard />
          </div>
        </div>
      </main>
    </>
  );
}
