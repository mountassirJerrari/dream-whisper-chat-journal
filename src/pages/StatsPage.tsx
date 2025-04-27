
import React from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import StatsDisplay from '@/components/StatsDisplay';

const StatsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Dream Statistics" />
      <main className="flex-1 container max-w-2xl mx-auto p-4 pb-24">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Your Dream Insights</h2>
          <p className="text-muted-foreground">
            Explore patterns and trends in your dream journal
          </p>
        </div>
        
        <StatsDisplay />
      </main>
      <Navigation />
    </div>
  );
};

export default StatsPage;
