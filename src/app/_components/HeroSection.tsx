import GlassCube from "./GlassCube";

export default function HeroSection() {
  return (
    <section 
      className="flex-1 flex flex-col items-center justify-center lg:items-start text-center lg:text-left"
      aria-labelledby="hero-heading"
    >
      <div className="inline-block px-6 py-2 mb-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
        <span className="text-sm font-bold text-white uppercase tracking-wider">
          ✨ No Login Required
        </span>
      </div>
      
      <h1 
        id="hero-heading"
        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 text-white leading-tight tracking-wide drop-shadow-lg"
      >
        Rapid Share <br className="hidden lg:block" /> Files Instantly
      </h1>
      
      <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl font-medium drop-shadow-md">
        Upload your file, generate a unique code, and share it anywhere. 
        Fast, secure, and incredibly simple. Zero tracking.
      </p>

      <div className="w-full flex justify-center lg:justify-start" aria-hidden="true">
        <GlassCube />
      </div>
    </section>
  );
}