/**
 * Loading Page Component
 * Animated loading screen with progress steps
 */

function LoadingPage() {
  const steps = [
    'Preprocessing lyrics...',
    'Tokenizing text...',
    'Extracting features...',
    'Running ML model...',
    'Calculating confidence...'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center">
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
    </div>
  );
}

export default LoadingPage;