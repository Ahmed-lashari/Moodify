/**
 * Landing Page Component
 * Hero page with animated background and feature cards
 */

function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 relative overflow-hidden">
      {/* Animated background music notes */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              fontSize: `${Math.random() * 30 + 20}px`
            }}
          >
            {['🎵', '🎶', '🎧', '🎤', '🎸'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Title */}
          <h1 className="text-7xl font-black mb-4 animate-pulse">
            🎵 Moodify
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-4xl font-light mb-6 opacity-95">
            Discover the emotion behind every lyric
          </h2>
          
          {/* Description */}
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Powered by advanced machine learning and natural language processing, 
            Moodify analyzes your song lyrics to predict their emotional tone with precision.
          </p>

          {/* CTA Button */}
          <button
            onClick={onStart}
            className="bg-white text-purple-700 text-xl font-bold py-4 px-12 rounded-full shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Start Analyzing
          </button>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { icon: '🧠', title: 'AI-Powered', desc: 'Advanced ML algorithms' },
              { icon: '📈', title: 'Accurate', desc: '95% prediction accuracy' },
              { icon: '⚡', title: 'Instant', desc: 'Results in seconds' }
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white bg-opacity-15 backdrop-blur-lg p-6 rounded-2xl transform hover:scale-105 transition-all"
              >
                <div className="text-5xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="opacity-90">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;