
import React from 'react';
import { Link } from 'react-router-dom';
import { Moon } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'DreamWeaver' }) => {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Moon className="h-6 w-6 text-dream-purple animate-pulse-slow" />
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-dreams">{title}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
