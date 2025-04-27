
import React, { useEffect } from 'react';
import { getDreams, initializeStorageWithSampleData } from '@/utils/storage';
import DreamList from '@/components/DreamList';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { Link } from 'react-router-dom';

const Index = () => {
  // Get dreams from storage
  const dreams = getDreams();
  
  // Initialize with sample data if no dreams exist
  useEffect(() => {
    initializeStorageWithSampleData();
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-2xl mx-auto p-4 pb-24">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Your Dream Journal</h2>
          <p className="text-muted-foreground">
            Capture and explore the messages in your dreams
          </p>
        </div>
        
        <DreamList dreams={dreams} />
        
        {dreams.length === 0 && (
          <div className="mt-8 text-center">
            <Link 
              to="/new"
              className="inline-block bg-dream-purple hover:bg-dream-darkPurple text-white px-4 py-2 rounded-lg transition-colors"
            >
              Record Your First Dream
            </Link>
          </div>
        )}
      </main>
      <Navigation />
    </div>
  );
};

export default Index;
