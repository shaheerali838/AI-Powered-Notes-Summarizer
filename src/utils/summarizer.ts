// This is a mock summarization function
// In a real application, this would call an AI API
export const generateSummary = (text: string): Promise<string> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // Very simple mock summarization logic
      const sentences = text.split(/[.!?]+/).filter(Boolean);
      let summary = '';
      
      if (sentences.length <= 3) {
        summary = text;
      } else {
        // Take first sentence, a middle one, and the last one
        const firstSentence = sentences[0];
        const middleSentence = sentences[Math.floor(sentences.length / 2)];
        const lastSentence = sentences[sentences.length - 1];
        
        summary = `${firstSentence.trim()}. ${middleSentence.trim()}. ${lastSentence.trim()}.`;
        
        // Add a mock "AI-generated" conclusion
        summary += '\n\nKey points:\n';
        
        // Extract some "key points" (just random phrases)
        const words = text.split(' ');
        for (let i = 0; i < 3; i++) {
          const startIdx = Math.floor(Math.random() * (words.length - 5));
          summary += `- ${words.slice(startIdx, startIdx + 5).join(' ')}...\n`;
        }
      }
      
      resolve(summary);
    }, 1500); // 1.5 second delay to simulate processing time
  });
};