// Helper function to calculate reading time (rough estimate)
export function calculateReadingTime(excerpt?: string): string {
  if (!excerpt) return "3 min read";
  const wordsPerMinute = 200;
  const wordCount = excerpt.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}