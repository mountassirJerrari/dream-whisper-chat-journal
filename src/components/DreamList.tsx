
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Star, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DreamEntry, formatDate } from '@/utils/dreamUtils';

interface DreamListProps {
  dreams: DreamEntry[];
}

const DreamList: React.FC<DreamListProps> = ({ dreams }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredDreams = dreams.filter(dream => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    
    return (
      dream.title.toLowerCase().includes(query) ||
      dream.description.toLowerCase().includes(query) ||
      dream.tags.some(tag => tag.toLowerCase().includes(query)) ||
      dream.emotions.some(emotion => emotion.toLowerCase().includes(query))
    );
  });
  
  // Sort dreams by date (newest first)
  const sortedDreams = [...filteredDreams].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          placeholder="Search dreams..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-dream-softPurple/30 focus-visible:ring-dream-purple/20"
        />
      </div>
      
      {sortedDreams.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            {searchQuery ? 'No dreams match your search.' : 'No dreams recorded yet.'}
          </p>
          <Link to="/new" className="text-dream-purple hover:text-dream-darkPurple mt-2 inline-block">
            Record your first dream
          </Link>
        </div>
      )}
      
      {sortedDreams.map(dream => (
        <Link to={`/dream/${dream.id}`} key={dream.id}>
          <div className="dream-card group">
            <h3 className="text-lg font-semibold mb-2 group-hover:text-dream-purple transition-colors">
              {dream.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
              {dream.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {dream.emotions.slice(0, 3).map(emotion => (
                <Badge key={emotion} variant="secondary" className="bg-dream-softPurple/30 text-foreground">
                  {emotion}
                </Badge>
              ))}
              {dream.emotions.length > 3 && (
                <Badge variant="secondary" className="bg-dream-softPurple/30 text-foreground">
                  +{dream.emotions.length - 3}
                </Badge>
              )}
            </div>
            
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(dream.date)}
              </div>
              <div className="flex items-center">
                <Star className={`h-4 w-4 mr-1 ${
                  dream.vividnessRating >= 4 ? 'fill-dream-vividPurple text-dream-vividPurple' : ''
                }`} />
                {dream.vividnessRating}/5
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DreamList;
