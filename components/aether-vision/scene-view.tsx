'use client';

import React from 'react';
import type { SceneObject } from '@/lib/types';
import ThreeScene from './three-scene';

interface SceneViewProps {
  sceneObjects: SceneObject[];
}

const SceneView: React.FC<SceneViewProps> = ({ sceneObjects }) => {
  return (
    <div
      key="3d"
      className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">3D Recognition Visualization</h2>
        <p className="text-gray-300">Interactive 3D scene representing the AI recognition process</p>
      </div>
      
      <div className="h-[60vh] rounded-xl overflow-hidden border border-white/10">
        <ThreeScene objects={sceneObjects} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 border border-white/10">
          <h4 className="font-semibold text-white mb-2">Processing Core</h4>
          <p className="text-gray-300 text-sm">Central AI processing unit handling recognition tasks</p>
        </div>
        <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 border border-white/10">
          <h4 className="font-semibold text-white mb-2">Recognition Nodes</h4>
          <p className="text-gray-300 text-sm">Individual nodes representing detected objects</p>
        </div>
        <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 border border-white/10">
          <h4 className="font-semibold text-white mb-2">Neural Network</h4>
          <p className="text-gray-300 text-sm">Abstract visualization of the AI model's architecture</p>
        </div>
      </div>
    </div>
  );
};

export default SceneView;
