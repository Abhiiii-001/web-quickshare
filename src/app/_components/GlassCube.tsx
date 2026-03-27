'use client';

import { FileText, Image, Video } from 'lucide-react';

export default function GlassCube() {
  return (
    <div className="hidden md:block w-[400px] h-[400px] mx-auto perspective-[1000px] relative">
      {/* Glow Effect */}
      <div className="absolute w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-indigo-500/30 to-transparent rounded-full blur-[60px] animate-glow-pulse" />
      
      {/* Cube Container */}
      <div className="absolute w-[200px] h-[200px] top-1/2 left-1/2 preserve-3d animate-rotate-cube">
        {/* Cube Faces */}
        <div className="absolute w-[200px] h-[200px] glass-face-front border border-white/20 backdrop-blur-md shadow-[inset_0_0_40px_rgba(255,255,255,0.1),0_10px_40px_rgba(0,0,0,0.2)] rounded-[20px]" />
        <div className="absolute w-[200px] h-[200px] glass-face-back border border-white/20 backdrop-blur-md shadow-[inset_0_0_40px_rgba(255,255,255,0.1),0_10px_40px_rgba(0,0,0,0.2)] rounded-[20px]" />
        <div className="absolute w-[200px] h-[200px] glass-face-right border border-white/20 backdrop-blur-md shadow-[inset_0_0_40px_rgba(255,255,255,0.1),0_10px_40px_rgba(0,0,0,0.2)] rounded-[20px]" />
        <div className="absolute w-[200px] h-[200px] glass-face-left border border-white/20 backdrop-blur-md shadow-[inset_0_0_40px_rgba(255,255,255,0.1),0_10px_40px_rgba(0,0,0,0.2)] rounded-[20px]" />
        <div className="absolute w-[200px] h-[200px] glass-face-top border border-white/20 backdrop-blur-md shadow-[inset_0_0_40px_rgba(255,255,255,0.1),0_10px_40px_rgba(0,0,0,0.2)] rounded-[20px]" />
        <div className="absolute w-[200px] h-[200px] glass-face-bottom border border-white/20 backdrop-blur-md shadow-[inset_0_0_40px_rgba(255,255,255,0.1),0_10px_40px_rgba(0,0,0,0.2)] rounded-[20px]" />
        
        {/* Floating Icons */}
        <div className="absolute top-[20%] left-[15%] animate-float-icon drop-shadow-[0_0_10px_currentColor]">
          <FileText className="w-8 h-8 text-red-400" />
        </div>
        <div className="absolute top-[60%] right-[20%] animate-float-icon [animation-delay:1s] drop-shadow-[0_0_10px_currentColor]">
          <Image className="w-8 h-8 text-blue-400" />
        </div>
        <div className="absolute bottom-[25%] left-[25%] animate-float-icon [animation-delay:2s] drop-shadow-[0_0_10px_currentColor]">
          <Video className="w-8 h-8 text-purple-400" />
        </div>
        
        {/* Glowing Code */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <span className="font-mono text-2xl font-bold text-cyan-400 tracking-[0.3em] animate-glow-code [text-shadow:0_0_10px_rgba(129,230,217,0.8),0_0_20px_rgba(129,230,217,0.6),0_0_30px_rgba(129,230,217,0.4)]">
            XY7K9P
          </span>
        </div>
      </div>
    </div>
  );
}
