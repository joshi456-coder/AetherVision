export interface RecognitionResult {
  id: string;
  type: 'image' | 'video';
  filename: string;
  url: string;
  analysis: {
    objects: Array<{
      name: string;
      confidence: number;
    }>;
    description: string;
    timestamp?: number;
  };
  timestamp: Date;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  relatedResult?: string;
}

export interface SceneObject {
  id: string;
  name: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
}

export type Tab = 'upload' | 'results' | 'chat' | '3d';
