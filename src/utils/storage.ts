
import { DreamEntry, ChatMessage } from './dreamUtils';

const DREAMS_STORAGE_KEY = 'dreamweaver_dreams';
const CHATS_STORAGE_KEY = 'dreamweaver_chats';

// Get all dreams from storage
export const getDreams = (): DreamEntry[] => {
  const dreamsJson = localStorage.getItem(DREAMS_STORAGE_KEY);
  if (!dreamsJson) {
    return [];
  }
  return JSON.parse(dreamsJson);
};

// Save all dreams to storage
export const saveDreams = (dreams: DreamEntry[]): void => {
  localStorage.setItem(DREAMS_STORAGE_KEY, JSON.stringify(dreams));
};

// Get a single dream by ID
export const getDream = (id: string): DreamEntry | undefined => {
  const dreams = getDreams();
  return dreams.find(dream => dream.id === id);
};

// Save a single dream (add or update)
export const saveDream = (dream: DreamEntry): void => {
  const dreams = getDreams();
  const existingIndex = dreams.findIndex(d => d.id === dream.id);
  
  if (existingIndex >= 0) {
    dreams[existingIndex] = dream;
  } else {
    dreams.push(dream);
  }
  
  saveDreams(dreams);
};

// Delete a dream by ID
export const deleteDream = (id: string): void => {
  const dreams = getDreams();
  const filteredDreams = dreams.filter(dream => dream.id !== id);
  saveDreams(filteredDreams);
  
  // Also delete related chat messages
  const chats = getChats();
  const filteredChats = chats.filter(chat => chat.dreamId !== id);
  saveChats(filteredChats);
};

// Get all chat messages
export const getChats = (): ChatMessage[] => {
  const chatsJson = localStorage.getItem(CHATS_STORAGE_KEY);
  if (!chatsJson) {
    return [];
  }
  return JSON.parse(chatsJson);
};

// Save all chat messages
export const saveChats = (chats: ChatMessage[]): void => {
  localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(chats));
};

// Get chat messages for a specific dream
export const getDreamChats = (dreamId: string): ChatMessage[] => {
  const chats = getChats();
  return chats.filter(chat => chat.dreamId === dreamId);
};

// Save a chat message
export const saveChat = (chat: ChatMessage): void => {
  const chats = getChats();
  chats.push(chat);
  saveChats(chats);
};

// Get stats about dreams
export const getDreamStats = () => {
  const dreams = getDreams();
  
  // Count emotions
  const emotionCounts: Record<string, number> = {};
  dreams.forEach(dream => {
    dream.emotions.forEach(emotion => {
      emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
    });
  });
  
  // Count tags
  const tagCounts: Record<string, number> = {};
  dreams.forEach(dream => {
    dream.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  // Average vividness
  const totalVividness = dreams.reduce((sum, dream) => sum + dream.vividnessRating, 0);
  const averageVividness = dreams.length > 0 ? totalVividness / dreams.length : 0;
  
  return {
    totalDreams: dreams.length,
    emotions: emotionCounts,
    tags: tagCounts,
    averageVividness
  };
};

// Initialize with sample data if empty
export const initializeStorageWithSampleData = (): void => {
  const dreams = getDreams();
  if (dreams.length === 0) {
    const sampleDreams: DreamEntry[] = [
      {
        id: '1',
        title: 'Flying over an ocean',
        description: 'I was flying high above a glowing, bioluminescent ocean. The water below was shimmering with blue and purple light. I felt weightless and completely free.',
        date: new Date().toISOString(),
        emotions: ['Joy', 'Peace', 'Awe'],
        tags: ['Flying', 'Ocean', 'Glowing'],
        vividnessRating: 5
      },
      {
        id: '2',
        title: 'Lost in a maze',
        description: 'I was wandering through an endless maze with tall hedges. I kept hearing voices calling my name from different directions, but could never find where they were coming from.',
        date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        emotions: ['Confusion', 'Anxiety'],
        tags: ['Lost', 'Maze', 'Voices'],
        vividnessRating: 4
      }
    ];
    
    saveDreams(sampleDreams);
    
    // Add sample chat for the first dream
    const sampleChats: ChatMessage[] = [
      {
        id: '1',
        dreamId: '1',
        content: getInitialQuestion(sampleDreams[0]), 
        sender: 'ai',
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        dreamId: '1',
        content: 'I felt so free and peaceful flying above that glowing ocean. It was like nothing could hold me back.',
        sender: 'user',
        timestamp: new Date(Date.now() + 60000).toISOString() // A minute later
      },
      {
        id: '3',
        dreamId: '1',
        content: 'Is there anything in your waking life that's making you feel restricted or confined lately?',
        sender: 'ai',
        timestamp: new Date(Date.now() + 120000).toISOString() // Two minutes later
      }
    ];
    
    saveChats(sampleChats);
  }
};
