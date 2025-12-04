function EmailCard() {
  const member = {
    email: "mailto:ahmed@example.com"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Options</h2>
        
        {/* Beautiful Email Card */}
        <a
          href={member.email}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {/* Email Icon */}
          <svg 
            className="w-5 h-5 group-hover/link:scale-110 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
            />
          </svg>
          <span>Email</span>
        </a>

        {/* Alternative Styles */}
        <div className="mt-6 space-y-3">
          <p className="text-sm text-gray-600 font-semibold mb-2">Alternative Styles:</p>
          
          {/* Style 1: Solid Blue */}
          <a
            href={member.email}
            className="group/link flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-5 h-5 group-hover/link:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Email (Blue)</span>
          </a>

          {/* Style 2: Red Gradient */}
          <a
            href={member.email}
            className="group/link flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-5 h-5 group-hover/link:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Email (Red)</span>
          </a>

          {/* Style 3: Teal */}
          <a
            href={member.email}
            className="group/link flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-5 h-5 group-hover/link:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Email (Teal)</span>
          </a>

          {/* Style 4: Orange */}
          <a
            href={member.email}
            className="group/link flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-5 h-5 group-hover/link:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Email (Orange)</span>
          </a>

          {/* Style 5: Purple (Professional) */}
          <a
            href={member.email}
            className="group/link flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-5 h-5 group-hover/link:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Email (Purple)</span>
          </a>
        </div>

        {/* With Emoji Variant */}
        <div className="mt-6">
          <p className="text-sm text-gray-600 font-semibold mb-2">With Emoji:</p>
          <a
            href={member.email}
            className="group/link flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="text-lg group-hover/link:scale-110 transition-transform">✉️</span>
            <span>Email Me</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default EmailCard;