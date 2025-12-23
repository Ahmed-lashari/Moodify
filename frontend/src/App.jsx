/**
 * Main App Component
 * Manages page navigation and state
 */

import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import LandingPage from './pages/landingPage';
import InputPage from './pages/inputPage';
import LoadingPage from './pages/loadingPage';
import ResultPage from './pages/resultPage';
import TeamCredits from './components/contributions';
import sendLyrics from './apis/post';
import { generateMockPrediction } from './utils/mockDataGenerator';



function App() {
  // const [page, setPage] = useState('landing'); // 'landing', 'input', 'loading', 'result'
  const [prediction, setPrediction] = useState(null);
  const [useMockData, setUseMockData] = useState(false); // Toggle for testing

  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/lyrics');
  };

  const handleAnalyze = async (lyrics) => {
    navigate('/loading');


    try {
      if (useMockData) {
        // Use mock data for UI testing
        setTimeout(() => {
          const mockResult = generateMockPrediction(lyrics);
          setPrediction(mockResult);
          navigate('/charts');

        }, 2000);
      } else {
        // Real API call
        const result = await sendLyrics(lyrics);
        
        // Transform backend response to match frontend expectations
        const transformedResult = transformBackendResponse(result, lyrics);
        setPrediction(transformedResult);
        navigate('/charts');

      }
    } catch (error) {
      alert('Failed to analyze lyrics. Please try again.');
      navigate('/lyrics');

    }
  };

  const handleBack = () => {
    navigate('/lyrics');
  };

  const handleBackToHome = () => {
    navigate('/');
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
      {/* Team Credits Button - Visible on ALL pages */}
      <TeamCredits />

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

      {/* Routes */}
      <Routes>
        <Route path="/" element={<LandingPage onStart={handleStart} />} />
        <Route path="/lyrics" element={<InputPage onAnalyze={handleAnalyze} onBack={handleBackToHome} />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/charts" element={<ResultPage prediction={prediction} onBack={handleBack} />} />
      </Routes>
    </div>
  );
}

export default App;