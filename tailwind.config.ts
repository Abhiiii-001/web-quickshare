import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-share-tech)'],
        mono: ['var(--font-share-tech-mono)'],
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'rotate-cube': 'rotateCube 20s linear infinite',
        'float-icon': 'floatIcon 3s ease-in-out infinite',
        'glow-code': 'glowCode 2s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        rotateCube: {
          '0%': { transform: 'translate(-50%, -50%) rotateX(-20deg) rotateY(30deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotateX(-20deg) rotateY(390deg)' },
        },
        floatIcon: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-15px) translateX(10px)' },
        },
        glowCode: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '0.5' },
          '50%': { transform: 'translate(-50%, -50%) scale(1.2)', opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
