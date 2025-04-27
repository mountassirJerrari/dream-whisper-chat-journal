
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { DreamEntry as DreamEntryType, emotions as allEmotions, defaultTags, createEmptyDream, generateId } from '@/utils/dreamUtils';
import { saveDream } from '@/utils/storage';
import { Mic, MicOff, Star, X, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DreamEntryProps {
  initialDream?: DreamEntryType;
  isEditing?: boolean;
}

const DreamEntry: React.FC<DreamEntryProps> = ({ 
  initialDream = createEmptyDream(),
  isEditing = false 
}) => {
  const [dream, setDream] = useState<DreamEntryType>(initialDream);
  const [newTag, setNewTag] = useState('');
  const [recording, setRecording] = useState(false);
  const [customEmotion, setCustomEmotion] = useState('');
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDream(prev => ({ ...prev, [name]: value }));
  };
  
  const handleVividnessChange = (rating: number) => {
    setDream(prev => ({ ...prev, vividnessRating: rating }));
  };
  
  const toggleEmotion = (emotion: string) => {
    setDream(prev => {
      const emotions = prev.emotions.includes(emotion)
        ? prev.emotions.filter(e => e !== emotion)
        : [...prev.emotions, emotion];
      return { ...prev, emotions };
    });
  };
  
  const addCustomEmotion = () => {
    if (customEmotion.trim() && !dream.emotions.includes(customEmotion.trim())) {
      setDream(prev => ({
        ...prev,
        emotions: [...prev.emotions, customEmotion.trim()]
      }));
      setCustomEmotion('');
    }
  };
  
  const addTag = (tag: string) => {
    if (tag.trim() && !dream.tags.includes(tag.trim())) {
      setDream(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()]
      }));
      setNewTag('');
    }
  };
  
  const removeTag = (tag: string) => {
    setDream(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };
  
  const toggleRecording = () => {
    // In a real app, this would use the Web Speech API
    setRecording(!recording);
    if (!recording) {
      alert('Voice recording would start here in the full app');
    } else {
      alert('Voice recording stopped - transcript would be added to description');
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Make sure we have at least a title
    if (!dream.title.trim()) {
      alert('Please enter a title for your dream');
      return;
    }
    
    saveDream(dream);
    navigate(`/dream/${dream.id}`);
  };
  
  return (
    <div className="container max-w-2xl mx-auto pb-24">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-lg font-medium">
            Dream Title
          </label>
          <Input
            id="title"
            name="title"
            value={dream.title}
            onChange={handleChange}
            placeholder="Give your dream a title..."
            className="dream-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="description" className="text-lg font-medium">
              Dream Description
            </label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={toggleRecording}
              className={`${recording ? 'bg-red-100 text-red-500 hover:bg-red-200' : ''}`}
            >
              {recording ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
              {recording ? 'Stop Recording' : 'Voice to Text'}
            </Button>
          </div>
          <Textarea
            id="description"
            name="description"
            value={dream.description}
            onChange={handleChange}
            placeholder="Describe your dream in detail..."
            className="dream-input min-h-[200px]"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-lg font-medium">
            Dream Vividness
          </label>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Faint</span>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleVividnessChange(rating)}
                  className={`p-1 rounded-full transition-colors ${
                    dream.vividnessRating >= rating ? 'text-dream-vividPurple' : 'text-gray-300'
                  }`}
                >
                  <Star className="h-6 w-6 fill-current" />
                </button>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">Hyper-real</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-lg font-medium">
            Emotions
          </label>
          <div className="flex flex-wrap gap-2">
            {allEmotions.map(emotion => (
              <Badge
                key={emotion}
                variant={dream.emotions.includes(emotion) ? 'default' : 'outline'}
                className={`cursor-pointer ${
                  dream.emotions.includes(emotion) 
                    ? 'bg-dream-purple hover:bg-dream-darkPurple' 
                    : 'hover:bg-dream-softPurple/20'
                }`}
                onClick={() => toggleEmotion(emotion)}
              >
                {emotion}
              </Badge>
            ))}
          </div>
          <div className="flex mt-2">
            <Input
              value={customEmotion}
              onChange={e => setCustomEmotion(e.target.value)}
              placeholder="Add custom emotion..."
              className="mr-2"
            />
            <Button 
              type="button" 
              onClick={addCustomEmotion}
              disabled={!customEmotion.trim()}
              variant="outline"
            >
              Add
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-lg font-medium">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {dream.tags.map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-dream-softBlue text-gray-700 flex items-center gap-1"
              >
                {tag}
                <button 
                  onClick={() => removeTag(tag)} 
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {dream.tags.length === 0 && (
              <span className="text-sm text-muted-foreground">No tags yet</span>
            )}
          </div>
          <div className="flex">
            <Input
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              placeholder="Add a tag..."
              className="mr-2"
              list="default-tags"
            />
            <datalist id="default-tags">
              {defaultTags.map(tag => (
                <option key={tag} value={tag} />
              ))}
            </datalist>
            <Button 
              type="button" 
              onClick={() => addTag(newTag)}
              disabled={!newTag.trim()}
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>
        
        <div className="pt-4 flex justify-end space-x-4">
          <Button variant="outline" type="button" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" className="bg-dream-purple hover:bg-dream-darkPurple">
            Save Dream
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DreamEntry;
