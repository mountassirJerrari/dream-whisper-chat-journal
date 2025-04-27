
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DreamEntry, ChatMessage, generateId } from '@/utils/dreamUtils';
import { getDreamChats, saveChat } from '@/utils/storage';
import { generateResponse } from '@/utils/chatUtils';

interface ChatInterfaceProps {
  dream: DreamEntry;
}

const StarBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          width: Math.random() * 2 + 1 + 'px',
          height: Math.random() * 2 + 1 + 'px',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          opacity: Math.random() * 0.5 + 0.2,
          animation: `twinkle ${Math.random() * 4 + 2}s infinite ease-in-out`
        }}
      />
    ))}
  </div>
);

const ChatInterface: React.FC<ChatInterfaceProps> = ({ dream }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadChats = () => {
      const existingChats = getDreamChats(dream.id);
      setMessages(existingChats);
    };
    
    loadChats();
  }, [dream]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
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
    
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: generateId(),
        dreamId: dream.id,
        content: generateResponse(userMessage.content),
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      
      saveChat(aiMessage);
      setMessages(prev => [...prev, aiMessage]);
      setIsThinking(false);
    }, 1000);
  };
  
  return (
    <div className="relative flex flex-col h-[calc(100vh-14rem)] bg-gradient-to-b from-gray-900 to-gray-950">
      <StarBackground />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
            
            <div 
              className={`max-w-[80%] p-4 rounded-2xl backdrop-blur-sm ${
                message.sender === 'user' 
                  ? 'bg-dream-purple/80 text-white ml-2 rounded-br-sm' 
                  : 'bg-white/10 text-white mr-2 rounded-bl-sm border border-white/10'
              }`}
            >
              {message.content}
            </div>
            
            {message.sender === 'user' && (
              <Avatar className="h-8 w-8 ml-2">
                <AvatarFallback className="bg-gray-700 text-white">ME</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        
        {isThinking && (
          <div className="flex justify-start">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarFallback className="bg-dream-purple text-white">AI</AvatarFallback>
            </Avatar>
            <div className="chat-bubble-ai flex space-x-1 items-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-2 w-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-white/10 p-4 backdrop-blur-md bg-gray-900/50">
        <div className="flex space-x-2">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Share your thoughts about this dream..."
            className="min-h-[60px] bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            className="bg-dream-purple hover:bg-dream-darkPurple text-white"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isThinking}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
