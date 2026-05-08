'use client';

import Navbar from '../_components/NavBar';
import AuroraBackground from '../_components/AuroraBackground';
import { Zap, Shield, Clock, HardDrive, Smartphone, Share2 } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Transfer",
      desc: "Direct uploads to cloud storage for maximum speed and reliability."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Lock",
      desc: "Optional password protection with industry-standard encryption."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Auto-Expiry",
      desc: "Files self-destruct after your chosen time limit for better privacy."
    },
    {
      icon: <HardDrive className="w-6 h-6" />,
      title: "No Limits",
      desc: "Share files up to 100MB with anyone, anywhere, completely free."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Ready",
      desc: "Designed to work perfectly on any device, from desktop to phone."
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Easy Sharing",
      desc: "Unique 6-character codes make sharing via text or chat a breeze."
    }
  ];

  return (
    <main className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center p-6 md:p-12">
      <AuroraBackground />
      <Navbar />

      <div className="relative z-10 w-full max-w-5xl">
        <div className="text-center mb-12 animate-float-icon">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase">
            Product <span className="text-indigo-400">Features</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">
            Engineered for speed and security
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div 
              key={i}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-all group"
            >
              <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
