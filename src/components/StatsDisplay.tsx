
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { getDreamStats } from '@/utils/storage';

interface StatsDisplayProps {}

const StatsDisplay: React.FC<StatsDisplayProps> = () => {
  const [stats, setStats] = useState<{
    totalDreams: number;
    emotions: Record<string, number>;
    tags: Record<string, number>;
    averageVividness: number;
  }>({
    totalDreams: 0,
    emotions: {},
    tags: {},
    averageVividness: 0
  });
  
  useEffect(() => {
    const dreamStats = getDreamStats();
    setStats(dreamStats);
  }, []);
  
  // Helper to get top items from a record
  const getTopItems = (record: Record<string, number>, count: number = 5) => {
    return Object.entries(record)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count);
  };
  
  // Helper to render bar charts
  const renderBarChart = (items: [string, number][], maxCount: number) => {
    return items.map(([label, count]) => (
      <div key={label} className="mb-2">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-xs text-muted-foreground">{count}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div 
            className="bg-dream-purple h-2.5 rounded-full"
            style={{ width: `${(count / maxCount) * 100}%` }}
          ></div>
        </div>
      </div>
    ));
  };
  
  const topEmotions = getTopItems(stats.emotions);
  const topTags = getTopItems(stats.tags);
  
  const maxEmotionCount = topEmotions.length > 0 ? Math.max(...topEmotions.map(item => item[1])) : 1;
  const maxTagCount = topTags.length > 0 ? Math.max(...topTags.map(item => item[1])) : 1;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card className="dream-card">
          <h3 className="text-lg font-semibold mb-1">Total Dreams</h3>
          <p className="text-3xl font-bold text-dream-purple">{stats.totalDreams}</p>
        </Card>
        
        <Card className="dream-card">
          <h3 className="text-lg font-semibold mb-1">Avg. Vividness</h3>
          <p className="text-3xl font-bold text-dream-purple">
            {stats.averageVividness.toFixed(1)}
            <span className="text-base text-muted-foreground">/5</span>
          </p>
        </Card>
      </div>
      
      <Card className="dream-card">
        <h3 className="text-lg font-semibold mb-4">Top Emotions</h3>
        {topEmotions.length > 0 ? (
          renderBarChart(topEmotions, maxEmotionCount)
        ) : (
          <p className="text-muted-foreground text-sm">No emotions tagged yet.</p>
        )}
      </Card>
      
      <Card className="dream-card">
        <h3 className="text-lg font-semibold mb-4">Top Tags</h3>
        {topTags.length > 0 ? (
          renderBarChart(topTags, maxTagCount)
        ) : (
          <p className="text-muted-foreground text-sm">No tags added yet.</p>
        )}
      </Card>
      
      <Card className="dream-card bg-gradient-to-br from-dream-softPurple/30 to-dream-softBlue/30">
        <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Future versions will include advanced dream pattern analysis powered by AI:
        </p>
        <ul className="text-sm list-disc list-inside space-y-2 text-muted-foreground">
          <li>Recurring theme detection</li>
          <li>Emotion trend analysis</li>
          <li>Symbol frequency visualization</li>
          <li>Dream meaning insights</li>
        </ul>
      </Card>
    </div>
  );
};

export default StatsDisplay;
