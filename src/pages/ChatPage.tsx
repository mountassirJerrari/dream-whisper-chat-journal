
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import ChatInterface from '@/components/ChatInterface';
import { getDream } from '@/utils/storage';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

const ShootingStars = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="shooting-star"
        style={{
          top: `${Math.random() * 50}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 15}s`
        }}
      />
    ))}
  </div>
);

const ChatPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dream = getDream(id || '');
  
  // Enforce dark theme for the chat page
  useEffect(() => {
    document.body.classList.add('dark');
    return () => {
      document.body.classList.remove('dark');
    };
  }, []);
  
  if (!dream) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
        <Header />
        <ShootingStars />
        <main className="flex-1 container max-w-2xl mx-auto p-4 pb-24 flex flex-col items-center justify-center">
          <AlertTriangle className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Dream Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The dream you're trying to chat about doesn't exist or has been deleted.
          </p>
          <Button onClick={() => navigate('/')}>
            Return to Journal
          </Button>
        </main>
        <Navigation />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <Header title={`Chat: ${dream.title}`} />
      <ShootingStars />
      <main className="flex-1 container max-w-2xl mx-auto p-4 flex flex-col">
        <Button
          variant="ghost"
          className="mb-4 pl-0 self-start text-white hover:bg-white/10"
          onClick={() => navigate(`/dream/${dream.id}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dream
        </Button>
        
        <div className="flex-1 overflow-hidden rounded-lg border border-white/10">
          <ChatInterface dream={dream} />
        </div>
      </main>
      <Navigation />
    </div>
  );
};

export default ChatPage;
