'use client';

import React from 'react';
import type { RecognitionResult, Tab } from '@/lib/types';
import ResultCard from './result-card';
import { ImageIcon } from 'lucide-react';

interface ResultsViewProps {
  results: RecognitionResult[];
  setActiveTab: (tab: Tab) => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ results, setActiveTab }) => {
  return (
    <div
      key="results"
      className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
        <div className="text-sm text-gray-300">
          {results.length} {results.length === 1 ? 'result' : 'results'}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-16 bg-black/10 rounded-xl">
          <ImageIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No results yet</h3>
          <p className="text-gray-500">Upload some images or videos to see analysis results here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <ResultCard
              key={result.id}
              result={result}
              onClick={() => setActiveTab('chat')}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsView;
