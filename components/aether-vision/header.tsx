'use client';

import React from 'react';
import { Brain, Sparkles, Zap } from 'lucide-react';

interface AppHeaderProps {
  resultsCount: number;
  messagesCount: number;
}

const AppHeader: React.FC<AppHeaderProps> = ({ resultsCount, messagesCount }) => {
  return (
    <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 animate-in fade-in-0 slide-in-from-left-5 duration-500">
            <div className="relative">
              <Brain className="w-8 h-8 text-primary" />
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AetherVision</h1>
              <p className="text-sm text-gray-300">3D Interactive Recognition Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm animate-in fade-in-0 slide-in-from-right-5 duration-500">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300">
              {resultsCount} analyzed • {messagesCount} messages
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
