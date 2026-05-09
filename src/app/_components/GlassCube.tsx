'use client';

import { FileText, Image as ImageIcon, Video } from 'lucide-react';

export default function GlassCube() {
  return (
    <div className="hidden md:block w-[400px] h-[500px] mx-auto perspective-[1200px] relative mt-10">
      {/* Dynamic Background Glow */}
      <div className="absolute w-[350px] h-[350px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-indigo-500/40 via-purple-500/10 to-transparent rounded-full blur-[80px] animate-glow-pulse" />
      
      {/* Floating Particles/Shapes for extra depth */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-indigo-400/30 rounded-full blur-sm animate-float-icon" />
      <div className="absolute bottom-20 right-10 w-6 h-6 bg-purple-400/20 rounded-full blur-md animate-float-icon [animation-delay:1.5s]" />
      <div className="absolute top-1/2 right-0 w-3 h-3 bg-cyan-400/40 rounded-full blur-[2px] animate-float-icon [animation-delay:0.8s]" />

      {/* Cube Container */}
      <div className="absolute w-[220px] h-[220px] top-1/2 left-1/2 preserve-3d animate-rotate-cube ml-[-110px] mt-[-110px]">
        {/* Cube Faces with enhanced glass effect */}
        <div className="absolute w-[220px] h-[220px] glass-face-front border border-white/30 backdrop-blur-[2px] shadow-[inset_0_0_50px_rgba(255,255,255,0.2),0_15px_50px_rgba(0,0,0,0.3)] rounded-[24px]" />
        <div className="absolute w-[220px] h-[220px] glass-face-back border border-white/30 backdrop-blur-[2px] shadow-[inset_0_0_50px_rgba(255,255,255,0.2),0_15_50px_rgba(0,0,0,0.3)] rounded-[24px]" />
        <div className="absolute w-[220px] h-[220px] glass-face-right border border-white/30 backdrop-blur-[2px] shadow-[inset_0_0_50px_rgba(255,255,255,0.2),0_15px_50px_rgba(0,0,0,0.3)] rounded-[24px]" />
        <div className="absolute w-[220px] h-[220px] glass-face-left border border-white/30 backdrop-blur-[2px] shadow-[inset_0_0_50px_rgba(255,255,255,0.2),0_15px_50px_rgba(0,0,0,0.3)] rounded-[24px]" />
        <div className="absolute w-[220px] h-[220px] glass-face-top border border-white/30 backdrop-blur-[2px] shadow-[inset_0_0_50px_rgba(255,255,255,0.2),0_15px_50px_rgba(0,0,0,0.3)] rounded-[24px]" />
        <div className="absolute w-[220px] h-[220px] glass-face-bottom border border-white/30 backdrop-blur-[2px] shadow-[inset_0_0_50px_rgba(255,255,255,0.2),0_15px_50px_rgba(0,0,0,0.3)] rounded-[24px]" />
        
        {/* Enhanced Floating Icons */}
        <div className="absolute top-[15%] left-[10%] animate-float-icon drop-shadow-[0_0_15px_rgba(248,113,113,0.6)]">
          <FileText className="w-10 h-10 text-red-400" />
        </div>
        <div className="absolute top-[65%] right-[10%] animate-float-icon [animation-delay:1.2s] drop-shadow-[0_0_15px_rgba(96,165,250,0.6)]">
          <ImageIcon className="w-10 h-10 text-blue-400" />
        </div>
        <div className="absolute bottom-[20%] left-[25%] animate-float-icon [animation-delay:2.4s] drop-shadow-[0_0_15px_rgba(192,132,252,0.6)]">
          <Video className="w-10 h-10 text-purple-400" />
        </div>
        
        {/* Dynamic Glowing Share Code */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 animate-glow-code">
            <span className="font-mono text-3xl font-black text-white tracking-[0.4em] drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
              R4P1D
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
