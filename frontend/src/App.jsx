/**
 * Main App Component
 * Manages page navigation and state
 */

import { useState } from 'react';
import LandingPage from './pages/landingPage';
import InputPage from './pages/inputPage';
import LoadingPage from './pages/loadingPage';
import ResultPage from './pages/resultPage';
import sendLyrics from './apis/post';
import { generateMockPrediction } from './utils/mockDataGenerator';


function App() {
  const [page, setPage] = useState('landing'); // 'landing', 'input', 'loading', 'result'
  const [prediction, setPrediction] = useState(null);
  const [useMockData, setUseMockData] = useState(false); // Toggle for testing

  const handleStart = () => {
    setPage('input');
  };

  const handleAnalyze = async (lyrics) => {
    setPage('loading');

    try {
      if (useMockData) {
        // Use mock data for UI testing
        setTimeout(() => {
          const mockResult = generateMockPrediction(lyrics);
          setPrediction(mockResult);
          setPage('result');
        }, 2000);
      } else {
        // Real API call
        const result = await sendLyrics(lyrics);
        
        // Transform backend response to match frontend expectations
        const transformedResult = transformBackendResponse(result, lyrics);
        setPrediction(transformedResult);
        setPage('result');
      }
    } catch (error) {
      alert('Failed to analyze lyrics. Please try again.');
      setPage('input');
    }
  };

  const handleBack = () => {
    if (page === 'result') {
      setPage('input');
    } else {
      setPage('landing');
    }
    setPrediction(null);
  };

  // Transform backend response to include all data needed by ResultPage
  const transformBackendResponse = (backendData, originalLyrics) => {
    // Backend returns: { mood: "happy", lyrics: "...", success: true }
    // Frontend expects more detailed data for charts
    
    const mockEnhanced = generateMockPrediction(originalLyrics);
    
    return {
      mood: backendData.mood || 'Happy',
      confidence: 0.85, // Backend doesn't provide this yet
      lyrics: backendData.lyrics,
      moodDistribution: mockEnhanced.moodDistribution,
      sentimentTimeline: mockEnhanced.sentimentTimeline,
      wordFrequency: mockEnhanced.wordFrequency,
      stats: mockEnhanced.stats
    };
  };

  return (
    <div className="App">
      {/* Dev toggle - Remove in production */}
      <div className="fixed top-4 right-4 z-50">
        <label className="bg-white px-4 py-2 rounded-lg shadow-lg text-sm">
          <input
            type="checkbox"
            checked={useMockData}
            onChange={(e) => setUseMockData(e.target.checked)}
            className="mr-2"
          />
          Use Mock Data
        </label>
      </div>

      {page === 'landing' && <LandingPage onStart={handleStart} />}
      {page === 'input' && <InputPage onAnalyze={handleAnalyze} onBack={handleBack} />}
      {page === 'loading' && <LoadingPage />}
      {page === 'result' && <ResultPage prediction={prediction} onBack={handleBack} />}
    </div>
  );
}

export default App;