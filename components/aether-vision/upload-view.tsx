'use client';

import React from 'react';
import { ImageIcon, Video } from 'lucide-react';
import FileUploadZone from './file-upload-zone';

interface UploadViewProps {
  onFileSelect: (files: File[]) => void;
}

const UploadView: React.FC<UploadViewProps> = ({ onFileSelect }) => {
  return (
    <div
      key="upload"
      className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Upload Media for Analysis
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Drop your images or videos here to unlock AI-powered recognition and analysis. 
          Get detailed object detection, scene understanding, and conversational insights.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <ImageIcon className="w-5 h-5 text-blue-400 mr-2" />
            Images
          </h3>
          <FileUploadZone 
            onFileSelect={onFileSelect}
            acceptedTypes="image"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Video className="w-5 h-5 text-purple-400 mr-2" />
            Videos
          </h3>
          <FileUploadZone 
            onFileSelect={onFileSelect}
            acceptedTypes="video"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadView;
