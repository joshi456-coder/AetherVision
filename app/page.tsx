'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { answerContentQuestions } from '@/ai/flows/answer-content-questions';
import { analyzeMedia } from '@/ai/flows/analyze-media';
import type { RecognitionResult, ChatMessage, SceneObject, Tab } from '@/lib/types';
import AppHeader from '@/components/aether-vision/header';
import AppNavigation from '@/components/aether-vision/navigation';
import UploadView from '@/components/aether-vision/upload-view';
import ResultsView from '@/components/aether-vision/results-view';
import ChatView from '@/components/aether-vision/chat-view';
import SceneView from '@/components/aether-vision/scene-view';
import ProcessingOverlay from '@/components/aether-vision/processing-overlay';

export default function AetherVisionPage() {
  const [activeTab, setActiveTab] = useState<Tab>('upload');
  const [results, setResults] = useState<RecognitionResult[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI assistant for image and video recognition. Upload some files to get started, or ask me anything about visual analysis!",
      timestamp: new Date(),
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingText, setProcessingText] = useState('Processing with AI...');
  
  const [sceneObjects] = useState<SceneObject[]>([
    {
      id: '1',
      name: 'Recognition Node',
      position: [2, 0, 0],
      rotation: [0, 0, 0],
      scale: [0.8, 0.8, 0.8],
      color: '#339966', // Teal accent
    },
    {
      id: '2',
      name: 'Processing Core',
      position: [-2, 1, 0],
      rotation: [0.5, 0.5, 0],
      scale: [1.2, 0.6, 1.2],
      color: '#F97316', // Orange
    },
  ]);

  const fileToB64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileSelect = useCallback(async (files: File[]) => {
    setIsProcessing(true);
    setActiveTab('chat');
    
    for (const file of files) {
      try {
        setProcessingText(`Analyzing ${file.name}...`);
        const fileUrl = URL.createObjectURL(file);
        const isVideo = file.type.startsWith('video/');
        
        const b64 = await fileToB64(file);

        const analysis = await analyzeMedia({ media: b64, mimeType: file.type });

        if (!analysis || !analysis.objects) {
          throw new Error("AI analysis returned an invalid result.");
        }

        const newResult: RecognitionResult = {
          id: `result-${Date.now()}-${Math.random()}`,
          type: isVideo ? 'video' : 'image',
          filename: file.name,
          url: fileUrl,
          analysis,
          timestamp: new Date(),
        };

        setResults(prev => [newResult, ...prev]);

        const completionMessage: ChatMessage = {
          id: `completion-${Date.now()}`,
          type: 'ai',
          content: `✅ Analysis complete for ${file.name}! Found ${analysis.objects.length} objects: ${analysis.objects.map(obj => obj.name).join(', ')}. ${analysis.description}`,
          timestamp: new Date(),
          relatedResult: newResult.id,
        };
        setChatMessages(prev => [...prev, completionMessage]);

      } catch (error) {
        console.error('Error processing file:', error);
        const errorMessage: ChatMessage = {
          id: `error-${Date.now()}`,
          type: 'ai',
          content: `❌ Sorry, there was an error processing ${file.name}. Please try again.`,
          timestamp: new Date(),
        };
        setChatMessages(prev => [...prev, errorMessage]);
      }
    }
    
    setIsProcessing(false);
    setProcessingText('Processing with AI...');
    if (files.length > 0) setActiveTab('results');
  }, []);

  const handleSendMessage = useCallback(async (message: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: message,
      timestamp: new Date(),
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    setProcessingText('AI is thinking...');

    try {
      const contextDescription = results.length > 0 ? results.map(r => r.analysis.description).join('\n') : "No content has been analyzed yet.";
      const objectList = results.length > 0 ? [...new Set(results.flatMap(r => r.analysis.objects.map(o => o.name)))].join(', ') : "None";
      
      const response = await answerContentQuestions({
        question: message,
        analysisDescription: contextDescription,
        objectList: objectList,
      });

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        type: 'ai',
        content: response.answer,
        timestamp: new Date(),
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        type: 'ai',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, errorMessage]);
    }
    
    setIsProcessing(false);
    setProcessingText('Processing with AI...');
  }, [results]);

  useEffect(() => {
    return () => {
      // Clean up object URLs on unmount
      results.forEach(result => URL.revokeObjectURL(result.url));
    };
  }, [results]);

  return (
    <div className="min-h-screen">
      <AppHeader resultsCount={results.length} messagesCount={chatMessages.length - 1} />
      <AppNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          <div className={`${activeTab === 'upload' ? 'block' : 'hidden'}`}>
            <UploadView onFileSelect={handleFileSelect} />
          </div>
          <div className={`${activeTab === 'results' ? 'block' : 'hidden'}`}>
            <ResultsView results={results} setActiveTab={setActiveTab} />
          </div>
          <div className={`${activeTab === 'chat' ? 'block' : 'hidden'}`}>
            <ChatView
              messages={chatMessages}
              onSendMessage={handleSendMessage}
              isProcessing={isProcessing}
            />
          </div>
          <div className={`${activeTab === '3d' ? 'block' : 'hidden'}`}>
            <SceneView sceneObjects={sceneObjects} />
          </div>
        </div>
      </main>

      {isProcessing && <ProcessingOverlay text={processingText} />}
    </div>
  );
}
