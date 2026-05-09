'use client';

import GlassCube from './GlassCube';

export default function HeroSection() {
  return (
    <div className="flex-1 flex items-center justify-center px-16">
      <div className="text-center max-w-2xl relative z-10">
        <div className="inline-block px-6 py-2 mb-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-full">
          <span className="text-sm font-bold text-white uppercase tracking-wider">
            ✨ No Login Required
          </span>
        </div>
        
        <h1 className="text-6xl font-bold mb-6 text-white leading-tight tracking-wide">
          Rapid Share Files Instantly
        </h1>
        
        <p className="text-xl text-white/85 mb-12 leading-relaxed">
          Upload your file, generate a unique code, and share it anywhere. 
          Fast, secure, and incredibly simple.
        </p>

        <GlassCube />
      </div>
    </div>
  );
}