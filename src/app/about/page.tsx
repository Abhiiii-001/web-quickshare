'use client';

import Navbar from '../_components/NavBar';
import AuroraBackground from '../_components/AuroraBackground';
import { Github, Linkedin, Mail, ExternalLink, User, Code } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center p-6 md:p-12">
      <AuroraBackground />
      <Navbar />

      <div className="relative z-10 w-full max-w-4xl">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row gap-12 items-center">
          {/* Profile Section */}
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-[3rem] bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shrink-0">
            <div className="w-full h-full rounded-[2.8rem] bg-[#1a0a2e] flex items-center justify-center overflow-hidden">
              <User className="w-24 h-24 text-white/20" />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 text-center md:text-left">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter uppercase">
                Rapid<span className="text-indigo-400">Share</span>
              </h1>
              <p className="text-xs font-black text-gray-500 uppercase tracking-[0.5em] mb-4">
                Version 2.0 • 2026
              </p>
              <div className="h-1 w-20 bg-indigo-500 rounded-full mx-auto md:mx-0" />
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              RapidShare was built with the vision of making file sharing as fast as a text message. 
              Created by <span className="text-white font-bold">Abhishek</span>, this platform leverages 
              cutting-edge cloud infrastructure to ensure your data moves at the speed of light.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <a href="https://github.com/Abhiiii-001" target='_blank' className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/5 transition-all group">
                <Github className="w-5 h-5 text-gray-400 group-hover:text-white" />
                <span className="text-xs font-bold text-gray-400 group-hover:text-white uppercase tracking-widest">Github</span>
              </a>
              <a href="https://www.linkedin.com/in/abhishek-kumar-abhiii/" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/5 transition-all group">
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
                <span className="text-xs font-bold text-gray-400 group-hover:text-white uppercase tracking-widest">LinkedIn</span>
              </a>
              <a 
                href={process.env.NEXT_PUBLIC_PORTFOLIO_URL || "#"} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/5 transition-all group"
              >
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white" />
                <span className="text-xs font-bold text-gray-400 group-hover:text-white uppercase tracking-widest">Portfolio</span>
              </a>
              <a href="mailto:jaiswal2abhi1947@gmail.com" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/5 transition-all group">
                <Mail className="w-5 h-5 text-gray-400 group-hover:text-white" />
                <span className="text-xs font-bold text-gray-400 group-hover:text-white uppercase tracking-widest">Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 text-[10px] text-gray-600 font-bold uppercase tracking-[0.4em]">
        Designed & Developed by RapidShare Team
      </div>
    </main>
  );
}
