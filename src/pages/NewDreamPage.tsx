
import React from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import DreamEntry from '@/components/DreamEntry';

const NewDreamPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="New Dream" />
      <main className="flex-1 container mx-auto p-4">
        <DreamEntry />
      </main>
      <Navigation />
    </div>
  );
};

export default NewDreamPage;
