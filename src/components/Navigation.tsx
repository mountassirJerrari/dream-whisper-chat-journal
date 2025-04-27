
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, MessageSquare, BarChart3, Plus } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border z-10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-around py-3">
          <Link to="/" className={`flex flex-col items-center p-2 ${isActive('/') && !isActive('/new') ? 'text-dream-purple' : 'text-muted-foreground'}`}>
            <Book className="h-6 w-6" />
            <span className="text-xs mt-1">Journal</span>
          </Link>
          
          <Link to="/chat" className={`flex flex-col items-center p-2 ${isActive('/chat') ? 'text-dream-purple' : 'text-muted-foreground'}`}>
            <MessageSquare className="h-6 w-6" />
            <span className="text-xs mt-1">Chat</span>
          </Link>
          
          <Link to="/new" className="flex flex-col items-center">
            <div className="bg-dream-purple rounded-full p-3 -mt-8 shadow-lg border-4 border-background">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs mt-1 text-dream-purple">New</span>
          </Link>
          
          <Link to="/stats" className={`flex flex-col items-center p-2 ${isActive('/stats') ? 'text-dream-purple' : 'text-muted-foreground'}`}>
            <BarChart3 className="h-6 w-6" />
            <span className="text-xs mt-1">Stats</span>
          </Link>
          
          <div className="w-12 flex flex-col items-center p-2 opacity-0">
            {/* Placeholder for balance */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
