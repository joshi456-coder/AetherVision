'use client';

import React from 'react';
import { Upload, ImageIcon, MessageSquare, Cuboid } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Tab } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface AppNavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const TABS: { id: Tab; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'upload', label: 'Upload', icon: Upload, color: 'text-blue-400' },
  { id: 'results', label: 'Results', icon: ImageIcon, color: 'text-emerald-400' },
  { id: 'chat', label: 'Chat', icon: MessageSquare, color: 'text-purple-400' },
  { id: '3d', label: '3D Scene', icon: Cuboid, color: 'text-orange-400' },
];

const AppNavigation: React.FC<AppNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="bg-black/10 backdrop-blur-md border-b border-white/5 sticky top-[77px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4 md:space-x-8">
          {TABS.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              onClick={() => setActiveTab(tab.id)}
              className={cn(`py-4 px-1 md:px-2 border-b-2 font-medium text-sm transition-all duration-200 flex items-center space-x-2 rounded-none hover:bg-transparent`,
                activeTab === tab.id
                  ? 'border-primary text-primary hover:text-primary'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              )}
            >
              <tab.icon className={cn('w-4 h-4', activeTab === tab.id && tab.color)} />
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default AppNavigation;
