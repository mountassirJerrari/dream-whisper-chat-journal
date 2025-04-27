
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DreamEntry, ChatMessage, generateId, getFollowUpQuestion } from '@/utils/dreamUtils';
import { getDreamChats, saveChat } from '@/utils/storage';

interface ChatInterfaceProps {
  dream: DreamEntry;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ dream }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Load existing chat messages on component mount
  useEffect(() => {
    const loadChats = () => {
      const existingChats = getDreamChats(dream.id);
      
      // If no chats exist for this dream, create an initial AI message
      if (existingChats.length === 0) {
        const initialQuestion: ChatMessage = {
          id: generateId(),
          dreamId: dream.id,
          content: getFollowUpQuestion(dream, []),
          sender: 'ai',
          timestamp: new Date().toISOString()
        };
        
        saveChat(initialQuestion);
        setMessages([initialQuestion]);
      } else {
        setMessages(existingChats);
      }
    };
    
    loadChats();
  }, [dream]);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Create and save the user message
    const userMessage: ChatMessage = {
      id: generateId(),
      dreamId: dream.id,
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    saveChat(userMessage);
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);
    
    // Simulate AI response with a delay
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: generateId(),
        dreamId: dream.id,
        content: getFollowUpQuestion(dream, [...messages, userMessage]),
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      
      saveChat(aiMessage);
      setMessages(prev => [...prev, aiMessage]);
      setIsThinking(false);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-14rem)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-dream-softPurple/10 to-transparent">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'ai' && (
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-dream-purple text-white">AI</AvatarFallback>
              </Avatar>
            )}
            
            <div className={message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
              {message.content}
            </div>
            
            {message.sender === 'user' && (
              <Avatar className="h-8 w-8 ml-2">
                <AvatarFallback className="bg-gray-300">ME</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        
        {isThinking && (
          <div className="flex justify-start">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarFallback className="bg-dream-purple text-white">AI</AvatarFallback>
            </Avatar>
            <div className="chat-bubble-ai flex space-x-1">
              <div className="h-2 w-2 bg-dream-darkPurple rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-dream-darkPurple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-2 w-2 bg-dream-darkPurple rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4 bg-background">
        <div className="flex space-x-2">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about your dream..."
            className="min-h-[60px] dream-input"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            className="bg-dream-purple hover:bg-dream-darkPurple"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isThinking}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          In this prototype, AI responses are simulated. In the full app, this would connect to an LLM API.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
