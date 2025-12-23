import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import LandingPage from './pages/landingPage';
import InputPage from './pages/inputPage';
import LoadingPage from './pages/loadingPage';
import ResultPage from './pages/resultPage';
import TeamCredits from './components/contributions';
import {sendLyrics} from './api/post';
import { generateMockPrediction } from './utils/mockDataGenerator';



function App() {
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
        console.log("RAW BACKEND RESPONSE:", result);

        const transformedResult = transformBackendResponse(result);
        console.log("TRANSFORMED RESULT:", transformedResult);

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

const transformBackendResponse = (backendData) => {
  return {
    mood: backendData.mood ?? 'Not Detected',
    confidence: backendData.confidence ?? 0,
    lyrics: backendData.lyrics,
    color: backendData.color??"",
    emoji: backendData.emoji??"🥬",
    moodDistribution: backendData.mood_distribution ?? [],
    sentimentTimeline: backendData.sentiment_timeline ?? [],
    wordFrequency: backendData.word_frequency ?? [],
    stats: backendData.stats ?? {}
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