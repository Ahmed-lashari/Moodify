/**
 * Main App Component
 * Handles routing between different pages and state management
 */

import { useState } from "react";
import LandingPage from "./pages/landingPage";
import InputPage from "./pages/inputPage";
import LoadingPage from "./pages/loadingPage";
import ResultPage from "./pages/resultPage";
import { generateMockPrediction } from "./utils/mockDataGenerator";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [prediction, setPrediction] = useState(null);

  /**
   * Handle lyrics analysis
   * TODO: Replace setTimeout with actual API call to Django backend
   */
  const handleAnalyze = (lyrics) => {
    setCurrentPage("loading");

    // Simulate API call (replace with actual axios call later)
    setTimeout(() => {
      const result = generateMockPrediction(lyrics);
      setPrediction(result);
      setCurrentPage("result");
    }, 3000);
  };

  /**
   * Reset app to initial state
   */
  const resetApp = () => {
    setCurrentPage("landing");
    setPrediction(null);
  };

  // Render current page
  return (
    <>
      {currentPage === "landing" && (
        <LandingPage onStart={() => setCurrentPage("input")} />
      )}

      {currentPage === "input" && (
        <InputPage onAnalyze={handleAnalyze} onBack={resetApp} />
      )}

      {currentPage === "loading" && <LoadingPage />}

      {currentPage === "result" && (
        <ResultPage prediction={prediction} onBack={resetApp} />
      )}
    </>
  );
}

export default App;
