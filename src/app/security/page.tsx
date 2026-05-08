'use client';

import Navbar from '../_components/NavBar';
import AuroraBackground from '../_components/AuroraBackground';
import { ShieldCheck, Lock, EyeOff, FileKey, Server, Trash2 } from 'lucide-react';

export default function SecurityPage() {
  const points = [
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Encrypted Storage",
      desc: "Files are stored with enterprise-grade encryption on secure cloud servers."
    },
    {
      icon: <EyeOff className="w-8 h-8" />,
      title: "Password Protection",
      desc: "Optionally lock your files with BCrypt-encrypted passwords for private access."
    },
    {
      icon: <Trash2 className="w-8 h-8" />,
      title: "Auto-Destruction",
      desc: "Expired files and temporary data are permanently wiped from our systems."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Zero Tracking",
      desc: "We don't track who you share with or what you share. Just pure anonymous speed."
    }
  ];

  return (
    <main className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center p-6 md:p-12">
      <AuroraBackground />
      <Navbar />

      <div className="relative z-10 w-full max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-8 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
              Your Data, <br/>
              <span className="text-indigo-400">Locked Tight.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md">
              At RapidShare, we prioritize your privacy. No accounts, no data harvesting, just a secure bridge for your files.
            </p>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2 bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20">
                <Server className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Distributed Node</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">
                <FileKey className="w-4 h-4 text-purple-400" />
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">SHA-256 Validated</span>
              </div>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.map((p, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:translate-y-[-4px] transition-all duration-300">
                <div className="text-indigo-500 mb-4">{p.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">{p.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-12 text-[10px] text-indigo-500/40 font-black uppercase tracking-[1em] rotate-90 origin-right translate-y-[-50%] hidden md:block">
        Security First System
      </div>
    </main>
  );
}
