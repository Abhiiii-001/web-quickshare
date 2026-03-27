'use client';

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-[#1a0a2e] via-[#2d1b3d] to-[#1a2332]">
      <div className="absolute w-[200%] h-[200%] top-[-50%] left-[-30%] rounded-full opacity-40 blur-[120px] bg-gradient-radial from-[rgba(255,159,122,0.6)] to-transparent animate-float" />
      <div className="absolute w-[200%] h-[200%] top-[-40%] right-[-40%] rounded-full opacity-40 blur-[120px] bg-gradient-radial from-[rgba(255,107,107,0.5)] to-transparent animate-float [animation-delay:5s]" />
      <div className="absolute w-[200%] h-[200%] bottom-[-40%] left-[-20%] rounded-full opacity-40 blur-[120px] bg-gradient-radial from-[rgba(72,219,251,0.5)] to-transparent animate-float [animation-delay:10s]" />
      <div className="absolute w-[200%] h-[200%] bottom-[-30%] right-[-30%] rounded-full opacity-40 blur-[120px] bg-gradient-radial from-[rgba(138,43,226,0.4)] to-transparent animate-float [animation-delay:15s]" />
    </div>
  );
}