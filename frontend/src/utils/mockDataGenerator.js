/**
 * Mock Data Generator
 * Generates fake prediction data for testing UI
 * TODO: Replace with actual API calls to Django backend
 */

import { MOODS } from "./moodConfig";

/**
 * Generate mock prediction result
 * @param {string} lyrics - The input lyrics text
 * @returns {object} Mock prediction data
 */
export const generateMockPrediction = (lyrics) => {
  const words = lyrics
    .trim()
    .split(/\s+/)
    .filter((w) => w);
  const moods = Object.keys(MOODS);
  const randomMood = moods[Math.floor(Math.random() * moods.length)];
  const confidence = 0.75 + Math.random() * 0.24;

  // Generate mood distribution for pie chart
  const moodDistribution = moods.map((mood) => ({
    name: mood,
    value: mood === randomMood ? confidence * 100 : Math.random() * 30,
    color: MOODS[mood].color,
  }));

  // Generate sentiment timeline for line chart
  const sentimentTimeline = Array.from({ length: 10 }, (_, i) => ({
    line: i + 1,
    sentiment: Math.random() * 100 - 50,
  }));

  // Generate word frequency data for bar chart
  const wordCount = {};
  words.forEach((word) => {
    const w = word.toLowerCase();
    if (w.length > 3) {
      wordCount[w] = (wordCount[w] || 0) + 1;
    }
  });

  const wordFrequency = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));

  // Calculate statistics
  const stats = {
    wordCount: words.length,
    uniqueWords: new Set(words.map((w) => w.toLowerCase())).size,
    avgWordLength: (
      words.reduce((sum, w) => sum + w.length, 0) / words.length
    ).toFixed(1),
  };

  return {
    mood: randomMood,
    confidence,
    lyrics,
    moodDistribution,
    sentimentTimeline,
    wordFrequency,
    stats,
  };
};
