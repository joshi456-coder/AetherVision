'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '@/lib/types';
import { Bot, User, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isProcessing?: boolean;
  className?: string;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  onSendMessage,
  isProcessing = false,
  className,
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isProcessing) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className={cn("flex flex-col h-full bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg", className)}>
      <div className="flex items-center p-4 border-b border-white/10">
        <Bot className="w-6 h-6 text-primary mr-2" />
        <h3 className="font-semibold text-white">AI Assistant</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start animate-in fade-in-0 slide-in-from-bottom-4 duration-300",
              message.type === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={cn("flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                message.type === 'user' ? 'bg-primary ml-2' : 'bg-accent mr-2'
              )}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <Bot className="w-4 h-4 text-accent-foreground" />
                )}
              </div>
              <div className={cn("px-4 py-2 rounded-lg",
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-card-foreground'
              )}>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isProcessing && (
          <div className="flex justify-start animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
            <div className="flex">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center mr-2">
                <Bot className="w-4 h-4 text-accent-foreground" />
              </div>
              <div className="px-4 py-2 bg-card rounded-lg">
                <div className="flex space-x-1 items-center h-full">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about the analyzed content..."
            className="flex-1"
            disabled={isProcessing}
          />
          <Button
            type="submit"
            disabled={!inputValue.trim() || isProcessing}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatPanel;
