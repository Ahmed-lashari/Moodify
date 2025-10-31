/**
 * Mood Configuration
 * Defines colors, emojis, and gradients for each mood type
 */

export const MOODS = {
  Happy: {
    emoji: "😊",
    color: "#FFD700",
    gradient: "from-pink-400 to-red-400",
  },
  Sad: {
    emoji: "😢",
    color: "#6B7280",
    gradient: "from-gray-700 to-gray-900",
  },
  Energetic: {
    emoji: "⚡",
    color: "#FF6B6B",
    gradient: "from-orange-500 to-pink-600",
  },
  Chill: {
    emoji: "😌",
    color: "#4ECDC4",
    gradient: "from-cyan-400 to-blue-400",
  },
  Romantic: {
    emoji: "💕",
    color: "#FF69B4",
    gradient: "from-pink-300 to-rose-400",
  },
};

/**
 * Get mood data by mood name
 * @param {string} moodName - The name of the mood
 * @returns {object} Mood configuration object
 */
export const getMoodData = (moodName) => {
  return MOODS[moodName] || MOODS.Happy;
};
