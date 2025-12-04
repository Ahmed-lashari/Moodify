/**
 * Loading Page Component
 * Animated loading screen with progress steps and timeout notification
 */

import { useState, useEffect } from 'react';

function LoadingPage() {
  const [showPopup, setShowPopup] = useState(false);

  const steps = [
    'Preprocessing lyrics...',
    'Tokenizing text...',
    'Extracting features...',
    'Running ML model...',
    'Calculating confidence...'
  ];

  // Show popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center relative">
      <div className="text-center text-white max-w-md px-4">
        {/* Spinning music note */}
        <div className="text-8xl mb-6 animate-spin">🎵</div>
        
        {/* Title */}
        <h2 className="text-4xl font-bold mb-8">
          Analyzing Your Lyrics...
        </h2>
        
        {/* Progress steps */}
        <div className="mb-8 space-y-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="opacity-0 animate-fade-in"
              style={{ 
                animationDelay: `${i * 0.4}s`, 
                animationFillMode: 'forwards' 
              }}
            >
              <p className="text-lg">✓ {step}</p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
          <div className="bg-white h-full animate-progress"></div>
        </div>
        
        {/* Time estimate */}
        <p className="text-sm mt-4 opacity-80">
          This usually takes 2-3 seconds...
        </p>
      </div>

      {/* Popup Notification */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-scale-in">
            {/* Close button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              aria-label="Close"
            >
              ×
            </button>

            {/* Icon */}
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">⏱️</div>
              <h3 className="text-xl font-bold text-gray-800">
                Taking Longer Than Expected?
              </h3>
            </div>

            {/* Message */}
            <div className="text-gray-700 space-y-3 text-sm">
              <p>
                <strong>⚡ Free Tier Backend:</strong> Our backend is deployed on a free instance with limited RAM and CPU power.
              </p>
              <p>
                <strong>🔄 First Request:</strong> The first API call may take <span className="font-semibold">50-55 seconds</span> to restart the engine.
              </p>
              <p>
                <strong>⚡ Subsequent Requests:</strong> After the initial load, responses will be much faster (under 3 seconds).
              </p>
              <p className="pt-2 border-t border-gray-200">
                <strong>💡 Tip:</strong> If the API call fails, enable the <span className="font-semibold">"Use Mock Data"</span> toggle in the top-right corner to see the analytics dashboard with sample data.
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all"
            >
              Got it! 👍
            </button>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-in;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        .animate-progress {
          animation: progress 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default LoadingPage;