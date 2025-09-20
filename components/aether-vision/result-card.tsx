'use client';

import React from 'react';
import type { RecognitionResult } from '@/lib/types';
import { ImageIcon, Video, Eye, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Image from 'next/image';

interface ResultCardProps {
  result: RecognitionResult;
  onClick?: () => void;
  className?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onClick, className }) => {
  return (
    <Card
      onClick={onClick}
      className={cn("bg-card overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-primary transform-gpu hover:-translate-y-1", className)}
    >
      <div className="relative">
        <Image
          src={result.url}
          alt={result.filename}
          width={400}
          height={192}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-1">
          <div className="bg-black bg-opacity-50 px-2 py-1 rounded-md flex items-center text-white">
            {result.type === 'image' ? (
              <ImageIcon className="w-4 h-4" />
            ) : (
              <Video className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="truncate text-lg">{result.filename}</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {result.analysis.description}
        </p>
        
        <div className="flex flex-wrap gap-1">
          {result.analysis.objects.slice(0, 3).map((obj, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/20 text-primary-foreground/80 text-xs rounded-full"
            >
              {obj.name} ({Math.round(obj.confidence * 100)}%)
            </span>
          ))}
          {result.analysis.objects.length > 3 && (
            <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
              +{result.analysis.objects.length - 3} more
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex items-center justify-between text-xs text-muted-foreground w-full">
            <div className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {result.analysis.objects.length} objects
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {result.timestamp.toLocaleDateString()}
            </div>
          </div>
      </CardFooter>
    </Card>
  );
};

export default ResultCard;
