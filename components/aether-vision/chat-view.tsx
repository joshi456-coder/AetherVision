'use client';

import React from 'react';
import type { ChatMessage } from '@/lib/types';
import ChatPanel from './chat-panel';

interface ChatViewProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isProcessing?: boolean;
}

const ChatView: React.FC<ChatViewProps> = (props) => {
  return (
    <div
      key="chat"
      className="h-[70vh] animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
    >
      <ChatPanel {...props} className="h-full" />
    </div>
  );
};

export default ChatView;
