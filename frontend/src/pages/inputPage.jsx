/**
 * Input Page Component
 * Lyrics input form with validation
 */

import { useState } from 'react';

function InputPage({ onAnalyze, onBack }) {
  const [lyrics, setLyrics] = useState('');

  const handleSubmit = () => {
    const wordCount = lyrics.trim().split(/\s+/).filter(w => w).length;
    
    if (wordCount < 5) {
      alert('Please provide at least 5 words');
      return;
    }

    onAnalyze(lyrics);
  };

  const wordCount = lyrics.trim().split(/\s+/).filter(w => w).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Back button */}
        <button
          onClick={onBack}
          className="text-white mb-4 flex items-center hover:underline"
        >
          ← Back
        </button>

        {/* Input form card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎤</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Enter Your Lyrics
            </h2>
            <p className="text-gray-600">
              Paste or type the song lyrics you want to analyze
            </p>
          </div>

          {/* Textarea */}
          <textarea
            className="w-full h-64 p-4 border-2 border-gray-300 rounded-2xl text-lg focus:border-purple-500 focus:outline-none resize-none mb-4"
            placeholder="🎤 Enter your song lyrics here...

Example:
Walking down the street with a smile on my face
Sunshine in my heart, in this beautiful place
Every step I take feels like I'm floating on air
Nothing can bring me down, I haven't got a care"
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
          />

          {/* Word count and validation */}
          <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-gray-600">Words: {wordCount}</span>
            <span className={wordCount >= 5 ? 'text-green-600' : 'text-red-600'}>
              {wordCount >= 5 ? '✓ Ready to analyze' : 'Minimum 5 words required'}
            </span>
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={wordCount < 5}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white text-xl font-bold py-4 rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            ✨ Analyze Mood
          </button>

          {/* Privacy notice */}
          <p className="text-center text-xs text-gray-500 mt-4">
            🔒 Your lyrics are processed securely and never stored
          </p>
        </div>
      </div>
    </div>
  );
}

export default InputPage;