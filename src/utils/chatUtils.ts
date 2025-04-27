
export const getInitialQuestion = (dream: { title: string; emotions: string[]; tags: string[] }): string => {
  const questions = [
    `What emotions came up for you during this dream about "${dream.title}"?`,
    `How did the dream about "${dream.title}" make you feel when you woke up?`,
    `What stands out most to you about this dream?`,
    `If this dream could speak to you, what might it be trying to say?`,
    `Do any symbols or elements from this dream feel particularly significant?`
  ];
  
  return questions[Math.floor(Math.random() * questions.length)];
};

export const generateResponse = (message: string): string => {
  const responses = [
    "That's fascinating. How do you think this connects to your current life?",
    "Interesting perspective. What feelings does that bring up for you?",
    "I see. And what do you make of that symbolism?",
    "How do you feel about that aspect of the dream?",
    "That's intriguing. Have you experienced similar themes in other dreams?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};
