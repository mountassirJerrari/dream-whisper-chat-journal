
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Calendar, 
  Star, 
  Trash2, 
  Edit, 
  ArrowLeft,
  AlertTriangle
} from 'lucide-react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { getDream, deleteDream } from '@/utils/storage';
import { formatDate } from '@/utils/dreamUtils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DreamPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dream = getDream(id || '');
  
  // Handle case where dream is not found
  if (!dream) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container max-w-2xl mx-auto p-4 pb-24 flex flex-col items-center justify-center">
          <AlertTriangle className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Dream Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The dream you're looking for doesn't exist or has been deleted.
          </p>
          <Button onClick={() => navigate('/')}>
            Return to Journal
          </Button>
        </main>
        <Navigation />
      </div>
    );
  }
  
  const handleDelete = () => {
    deleteDream(dream.id);
    navigate('/');
  };
  
  // Format the date for display
  const dreamDate = formatDate(dream.date);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header title={dream.title} />
      <main className="flex-1 container max-w-2xl mx-auto p-4 pb-24">
        <Button
          variant="ghost"
          className="mb-4 pl-0"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Journal
        </Button>
        
        <div className="space-y-6">
          <div className="dream-card">
            <h1 className="text-2xl font-bold mb-2">{dream.title}</h1>
            
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{dreamDate}</span>
              <div className="mx-2">•</div>
              <div className="flex items-center">
                <Star className={`h-4 w-4 mr-1 ${
                  dream.vividnessRating >= 4 ? 'fill-dream-vividPurple text-dream-vividPurple' : ''
                }`} />
                {dream.vividnessRating}/5 vividness
              </div>
            </div>
            
            <p className="whitespace-pre-wrap mb-6">{dream.description}</p>
            
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Emotions:</h3>
              <div className="flex flex-wrap gap-2">
                {dream.emotions.length > 0 ? (
                  dream.emotions.map(emotion => (
                    <Badge key={emotion} variant="secondary" className="bg-dream-softPurple/30">
                      {emotion}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">No emotions tagged</span>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {dream.tags.length > 0 ? (
                  dream.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="bg-dream-softBlue/20">
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">No tags added</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Button 
              variant="outline"
              className="flex-1 border-dream-softPurple"
              onClick={() => navigate(`/edit/${dream.id}`)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Dream
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="flex-1">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Dream
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    dream and all associated chat messages.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          
          <Link 
            to={`/chat/${dream.id}`}
            className="dream-card flex items-center justify-between hover:shadow-md bg-dream-purple/5"
          >
            <div>
              <h3 className="font-semibold">Chat about this dream</h3>
              <p className="text-sm text-muted-foreground">
                Explore meanings and insights with AI guidance
              </p>
            </div>
            <MessageSquare className="h-6 w-6 text-dream-purple" />
          </Link>
        </div>
      </main>
      <Navigation />
    </div>
  );
};

export default DreamPage;
