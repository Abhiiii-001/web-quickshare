'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { resetUpload } from '@/store/slices/fileSlice';
import SendMode from './SendMode';
import ReceiveMode from './RecieveMode';
import CodeDisplay from './CodeDisplay';

export default function TransferCard() {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<'send' | 'receive'>('send');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [showCode, setShowCode] = useState(false);

  const handleCodeGenerated = (code: string) => {
    setGeneratedCode(code);
    setShowCode(true);
  };

  const handleReset = () => {
    setShowCode(false);
    setGeneratedCode('');
    dispatch(resetUpload());
  };

  return (
    <div className="w-full max-w-100 min-w-80 md:bg-white/95 backdrop-blur-xl rounded-3xl md:p-10 md:shadow-2xl md:border border-white/50 z-20 ">
      {/* Mode Switcher */}
      <div className="flex gap-2 mb-6 bg-gray-100 p-1.5 rounded-xl border border-gray-200">
        <button
          onClick={() => {
            setMode('send');
            setShowCode(false);
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
            mode === 'send'
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          📤 Send
        </button>
        <button
          onClick={() => {
            setMode('receive');
            setShowCode(false);
            dispatch(resetUpload());
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
            mode === 'receive'
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          📥 Receive
        </button>
      </div>

      {showCode ? (
        <CodeDisplay code={generatedCode} onReset={handleReset} />
      ) : (
        <>
          {mode === 'send' ? (
            <SendMode onCodeGenerated={handleCodeGenerated} />
          ) : (
            <ReceiveMode />
          )}
        </>
      )}
    </div>
  );
}

