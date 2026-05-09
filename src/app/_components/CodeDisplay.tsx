"use client";

import { Copy, Share2, RotateCcw } from "lucide-react";
import { toast } from "react-toastify";

interface CodeDisplayProps {
  code: string;
  onReset: () => void;
}

export default function CodeDisplay({ code, onReset }: CodeDisplayProps) {
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard! 📋");
  };

  const shareCode = async () => {
    const text = `Download my file with code: ${code}`;

    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      copyCode();
    }
  };

  return (
    <div className="text-center space-y-6">
      <div className="relative bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-300 rounded-2xl p-6 md:p-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/30 to-blue-200/30 animate-pulse" />

        <div className="relative z-10">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-4">
            Your Share Code
          </p>
          <div className="text-4xl font-black font-mono tracking-[0.1em] md:tracking-[0.3em] text-indigo-600 bg-white/50 backdrop-blur-sm rounded-xl py-6 border border-indigo-100 shadow-inner">
            {code}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={copyCode}
          className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-indigo-500 text-indigo-600 font-bold py-3 px-4 rounded-xl hover:bg-indigo-50 transition-all"
        >
          <Copy className="w-4 h-4" />
          Copy
        </button>
        <button
          onClick={shareCode}
          className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-indigo-500 text-indigo-600 font-bold py-3 px-4 rounded-xl hover:bg-indigo-50 transition-all"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-200 transition-all"
      >
        <RotateCcw className="w-4 h-4" />
        New Transfer
      </button>
    </div>
  );
}
