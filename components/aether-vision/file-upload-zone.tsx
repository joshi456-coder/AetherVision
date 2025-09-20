'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, ImageIcon, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadZoneProps {
  onFileSelect: (files: File[]) => void;
  acceptedTypes: 'image' | 'video' | 'both';
  className?: string;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({ onFileSelect, acceptedTypes, className }) => {
  const getAcceptTypes = () => {
    switch (acceptedTypes) {
      case 'image':
        return { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] };
      case 'video':
        return { 'video/*': ['.mp4', '.mov', '.avi', '.mkv'] };
      case 'both':
        return {
          'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
          'video/*': ['.mp4', '.mov', '.avi', '.mkv']
        };
      default:
        return {};
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileSelect(acceptedFiles);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: getAcceptTypes(),
    multiple: true
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        `border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300`,
        `border-border hover:border-primary`,
        isDragActive && 'border-primary bg-primary/10',
        isDragAccept && 'border-accent bg-accent/10',
        isDragReject && 'border-destructive bg-destructive/10',
        "transform-gpu transition-transform hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-2 text-muted-foreground">
          <Upload className="w-8 h-8" />
          {acceptedTypes === 'image' && <ImageIcon className="w-8 h-8 text-blue-500" />}
          {acceptedTypes === 'video' && <Video className="w-8 h-8 text-purple-500" />}
          {acceptedTypes === 'both' && (
            <>
              <ImageIcon className="w-8 h-8 text-blue-500" />
              <Video className="w-8 h-8 text-purple-500" />
            </>
          )}
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground">
            {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            or click to select files
          </p>
          <p className="text-xs text-muted-foreground/80 mt-2">
            {acceptedTypes === 'image' && 'Images: PNG, JPG, GIF, WebP'}
            {acceptedTypes === 'video' && 'Videos: MP4, MOV, AVI, MKV'}
            {acceptedTypes === 'both' && 'Images & Videos supported'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;
