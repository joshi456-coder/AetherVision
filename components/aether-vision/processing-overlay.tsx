'use client';

import React from 'react';

const ProcessingOverlay: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in-0 duration-300">
      <div className="bg-black/80 backdrop-blur-md rounded-xl p-6 flex items-center space-x-4 border border-white/20">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
        <span className="text-white font-medium">{text}</span>
      </div>
    </div>
  );
};

export default ProcessingOverlay;
