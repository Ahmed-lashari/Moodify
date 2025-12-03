import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TeamCredits() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsOpen(true);
    navigate('/contributors', { replace: false });
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    navigate(-1);
  };

  const teamMembers = [
    {
      avatar: "👨‍💻",
      name: "Muhammad Ahmed Lashari",
      role: "Lead Development (Frontend + Backend)",
      github: "https://github.com/Ahmed-lashari",
      linkedin: "https://www.linkedin.com/in/muhammad-ahmed-lashari-826761289/",
      color: "from-purple-500 to-indigo-600",
      contributions: [
        "Full project development lead",
        "Complete frontend development using React.js",
        "Designed and implemented Backend architecture & API routes in FastAPI",
        "Migrated backend from Django to FastAPI for higher performance",
        "State management and application routing",
        "UI/UX design with Tailwind CSS",
        "Integrated ML models with backend",
        "Deployed the backend API on Railway and the frontend application on Vercel",
        "Configured production-ready deployment, including CORS, environment variables, and hosting",
        "Ensured seamless integration between frontend and backend in the deployed application"
      ],
      techStack: [
        { name: "React.js", icon: "⚛️" },
        { name: "FastAPI", icon: "⚡" },
        { name: "Python", icon: "🐍" },
        { name: "Tailwind CSS", icon: "🎨" },
        { name: "Uvicorn", icon: "🦄" },
        { name: "Pydantic", icon: "✓" }
      ]
    },
    {
      avatar: "🧠",
      name: "Ismail Momand",
      role: "Lead ML Development",
      github: "https://github.com/1smai1",
      linkedin: "https://www.linkedin.com/in/ismail-khan-mohmand/",
      color: "from-blue-500 to-cyan-600",
      contributions: [
        "Originator of the project idea",
        "Led dataset discussion and ML strategy",
        "Dataset collection and data exploration",
        "Data preprocessing and cleaning pipeline",
        "Text normalization and noise removal",
        "Implemented TF-IDF vectorization",
        "Trained and evaluated ML models (NB, LR, SVM)",
        "Hyperparameter tuning and model optimization",
        "Exported production-ready ML models (.pkl)"
      ],
      techStack: [
        { name: "scikit-learn", icon: "🤖" },
        { name: "Pandas", icon: "🐼" },
        { name: "NumPy", icon: "🔢" },
        { name: "Python", icon: "🐍" },
        { name: "Jupyter", icon: "📓" }
      ]
    },
    {
      avatar: "🚀",
      name: "Abbas Yusafzai",
      role: "ML Research & Backend Contributor",
      github: "https://github.com/MAbbas1227",
      linkedin: "https://www.linkedin.com/in/muhammad-abbas-4448a5299/",
      color: "from-green-500 to-emerald-600",
      contributions: [
        "Searched for and evaluated potential datasets",
        "Discussed ML strategies and feature selection with Ismail",
        "Implemented initial HTTP API endpoints in Django",
        "Helped shape early ML and project planning discussions"
      ],
      techStack: [
        { name: "Django", icon: "🌐" },
        { name: "Python", icon: "🐍" }
      ]
    }
  ];

  return (
    <>
      {/* Floating Button with Animation */}
      <button
        onClick={handleOpenModal}
        className="fixed top-4 left-4 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2.5 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center gap-2 font-semibold group"
        aria-label="View Team Credits"
      >
        <span className="text-xl group-hover:rotate-12 transition-transform duration-300">👥</span>
        <span className="hidden sm:inline">Team</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-md animate-fadeIn" 
          onClick={handleCloseModal}
        >
          {/* Modal Content */}
          <div 
            className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto relative animate-slideUp" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={handleCloseModal}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 text-3xl font-bold z-10 w-12 h-12 flex items-center justify-center rounded-full hover:bg-white hover:shadow-lg transition-all duration-300 group"
              aria-label="Close"
            >
              <span className="group-hover:rotate-90 transition-transform duration-300">×</span>
            </button>

            {/* Header with Glass Effect */}
            <div className="relative bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white p-10 rounded-t-3xl overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-10"></div>
              <div className="relative text-center">
                <div className="inline-block mb-3">
                  <span className="text-6xl animate-bounce inline-block">🎵</span>
                </div>
                <h2 className="text-5xl font-black mb-3 tracking-tight">Moodify Team</h2>
                <p className="text-xl opacity-95 font-light">Meet the brilliant minds behind the music mood analyzer</p>
              </div>
            </div>

            {/* Team Members Grid */}
            <div className="p-8 space-y-6">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                >
                  {/* Member Header */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                    <div className={`text-6xl bg-gradient-to-br ${member.color} p-5 rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-gray-800 mb-2">
                        {member.name}
                      </h3>
                      <p className={`text-lg font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-4`}>
                        {member.role}
                      </p>
                      
                      {/* Social Links */}
                      <div className="flex gap-3">
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          <svg className="w-5 h-5 group-hover/link:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                          <span>GitHub</span>
                        </a>
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          <svg className="w-5 h-5 group-hover/link:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          <span>LinkedIn</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Contributions Section */}
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="text-2xl">✨</span>
                      Key Contributions
                    </h4>
                    <div className="grid gap-2">
                      {member.contributions.map((contribution, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <span className="text-green-500 mt-0.5 text-lg flex-shrink-0">✓</span>
                          <span className="text-sm leading-relaxed">{contribution}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  {member.techStack.length > 0 && (
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-2xl">🛠️</span>
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {member.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className={`bg-gradient-to-br ${member.color} text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:scale-110 hover:-translate-y-1`}
                          >
                            <span className="text-lg">{tech.icon}</span>
                            <span>{tech.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer with Gradient */}
            <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-8 rounded-b-3xl text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-10"></div>
              <div className="relative">
                <p className="text-lg mb-2 font-light opacity-95">
                  🎓 Machine Learning Course Project - Fall 2025
                </p>
                <p className="text-xl font-bold">
                  Built with ❤️ using React, FastAPI, and Machine Learning
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </>
  );
}

export default TeamCredits;