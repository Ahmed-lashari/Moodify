/**
 * Mood Configuration
 * Defines colors, emojis, and gradients for each mood type
 */

export const MOODS = {
  happy: {
    emoji: "😊",
    color: "#FFD700",
    gradient: "from-yellow-400 to-orange-400",
  },
  sad: {
    emoji: "😢",
    color: "#6B7280",
    gradient: "from-gray-700 to-gray-900",
  },
  angry: {
    emoji: "😠",
    color: "#DC2626",
    gradient: "from-red-600 to-red-800",
  },
  calm: {
    emoji: "😌",
    color: "#4ECDC4",
    gradient: "from-cyan-400 to-blue-400",
  },
  energetic: {
    emoji: "⚡",
    color: "#FF6B6B",
    gradient: "from-orange-500 to-pink-600",
  },
  romantic: {
    emoji: "💕",
    color: "#FF69B4",
    gradient: "from-pink-300 to-rose-400",
  },
};

/**
 * Get mood data by mood name (case-insensitive)
 * @param {string} moodName - The name of the mood
 * @returns {object} Mood configuration object
 */
export const getMoodData = (moodName) => {
  const normalizedMood = moodName?.toLowerCase();
  return MOODS[normalizedMood] || MOODS.happy;
};
