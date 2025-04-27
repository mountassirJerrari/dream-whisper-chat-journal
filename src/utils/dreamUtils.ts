
export interface DreamEntry {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string
  emotions: string[];
  tags: string[];
  vividnessRating: number; // 1-5
}

export interface ChatMessage {
  id: string;
  dreamId: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string; // ISO string
}

export const emotions = [
  'Joy', 'Fear', 'Sadness', 'Confusion', 'Anger', 
  'Peace', 'Excitement', 'Anxiety', 'Love', 'Disgust',
  'Surprise', 'Trust', 'Anticipation', 'Awe', 'Nostalgia'
];

export const defaultTags = [
  'Flying', 'Falling', 'Chase', 'Water', 'Family',
  'Childhood', 'Animals', 'Nature', 'City', 'Unknown Place',
  'Celebrity', 'Death', 'School', 'Work', 'Lost'
];

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getTimeOfDay = (): string => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 22) return 'evening';
  return 'night';
};

export const createEmptyDream = (): DreamEntry => {
  return {
    id: generateId(),
    title: '',
    description: '',
    date: new Date().toISOString(),
    emotions: [],
    tags: [],
    vividnessRating: 3
  };
};

// Placeholder functions for chat
export const getInitialQuestion = (dream: DreamEntry): string => {
  const questions = [
    `What was the most striking moment in this dream about "${dream.title}"?`,
    `How did you feel when you woke up from this dream?`,
    `Does this dream remind you of anything happening in your life right now?`,
    `If this dream could speak to you, what might it say?`,
    `What element of this dream feels most significant to you?`
  ];
  
  return questions[Math.floor(Math.random() * questions.length)];
};

export const getFollowUpQuestion = (dream: DreamEntry, previousMessages: ChatMessage[]): string => {
  // In a real app, this would call an LLM API
  // For now, we'll use placeholder questions
  const followUps = [
    "How do you interpret the symbols in this dream?",
    "Does this dream connect to any other recent dreams you've had?",
    "What emotions came up for you during this dream?",
    "If you could change one thing about this dream, what would it be?",
    "Is there a message or insight you can take from this dream?"
  ];
  
  return followUps[Math.floor(Math.random() * followUps.length)];
};
