/**
 * Result Page Component
 * Displays prediction results with charts and statistics
 */

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';
import { getMoodData } from '../utils/moodConfig';

function ResultPage({ prediction, onBack }) {
  if (!prediction) {
    return null;
  }

  const { 
    mood, 
    confidence, 
    lyrics, 
    moodDistribution, 
    sentimentTimeline, 
    wordFrequency, 
    stats 
  } = prediction;
  
  const moodData = getMoodData(mood);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${moodData.gradient} py-8`}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back button */}
        <button
          onClick={onBack}
          className="text-white mb-4 flex items-center hover:underline"
        >
          ← Analyze Another
        </button>

        {/* Main Result Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 text-center">
          {/* Mood emoji */}
          <div className="text-9xl mb-4 animate-bounce">
            {moodData.emoji}
          </div>
          
          {/* Mood label */}
          <div 
            className="inline-block text-3xl font-black text-white px-8 py-3 rounded-full mb-4"
            style={{ backgroundColor: moodData.color }}
          >
            {mood.toUpperCase()}
          </div>
          
          {/* Confidence */}
          <p className="text-2xl text-gray-600 mb-4">
            Confidence: {(confidence * 100).toFixed(1)}%
          </p>
          
          {/* Confidence bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000"
              style={{ 
                width: `${confidence * 100}%`, 
                backgroundColor: moodData.color 
              }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            { label: 'Total Words', value: stats.wordCount },
            { label: 'Unique Words', value: stats.uniqueWords },
            { label: 'Avg Word Length', value: stats.avgWordLength }
          ].map((stat, i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl shadow-lg p-6 text-center"
            >
              <div 
                className="text-5xl font-bold" 
                style={{ color: moodData.color }}
              >
                {stat.value}
              </div>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Mood Distribution Pie Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Mood Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={moodDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value.toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {moodDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Sentiment Timeline Line Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Sentiment Flow</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sentimentTimeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="line" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="sentiment" 
                  stroke={moodData.color} 
                  strokeWidth={3} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Word Frequency Bar Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Top Keywords</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={wordFrequency}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="word" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="count" 
                  fill={moodData.color} 
                  radius={[10, 10, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lyrics Display */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Analyzed Lyrics</h3>
          <div className="bg-gray-100 rounded-xl p-4 max-h-64 overflow-y-auto">
            <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
              {lyrics}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;