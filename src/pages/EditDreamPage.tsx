
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import DreamEntry from '@/components/DreamEntry';
import { getDream } from '@/utils/storage';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EditDreamPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dream = getDream(id || '');
  
  if (!dream) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container max-w-2xl mx-auto p-4 pb-24 flex flex-col items-center justify-center">
          <AlertTriangle className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Dream Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The dream you're trying to edit doesn't exist or has been deleted.
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
    <div className="min-h-screen flex flex-col">
      <Header title="Edit Dream" />
      <main className="flex-1 container mx-auto p-4">
        <DreamEntry initialDream={dream} isEditing={true} />
      </main>
      <Navigation />
    </div>
  );
};

export default EditDreamPage;
