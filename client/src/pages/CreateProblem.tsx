import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiAPI } from '../services/api';

const CreateProblem: React.FC = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please enter a problem description');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await aiAPI.generateProblem(description);
      alert('Problem created successfully!');
      navigate(`/problem/${response.data.problem._id}`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to generate problem');
    } finally {
      setLoading(false);
    }
  };

  const exampleProblems = [
    { text: 'Three numbers ka maximum nikalne ka problem banao', lang: 'Hindi/Hinglish' },
    { text: 'Create a problem to find sum of two integers', lang: 'English' },
    { text: 'Do sankhya ka yog nikalo', lang: 'Hindi' },
    { text: 'Check if a number is prime', lang: 'English' },
    { text: 'Array me sabse bada number find karo', lang: 'Hinglish' },
    { text: 'Find factorial of a number', lang: 'English' }
  ];

  return (
    <div className="min-h-screen px-4 py-12 relative overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section - GEN Z STYLE */}
        <div className="text-center mb-12 animate-bounce-in">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-black px-6 py-3 rounded-full shadow-lg shadow-purple-500/50 animate-pulse-glow uppercase tracking-wider">
              ✨ AI Magic Inside ✨
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight text-glow">
            Create Your <span className="gradient-text">Epic</span> Problem 🚀
          </h1>
          <p className="text-2xl text-gray-200 max-w-2xl mx-auto font-medium">
            Drop your idea in <span className="text-purple-400 font-bold">ANY language</span> and watch the magic happen! 
            <span className="inline-block ml-2">✨🔥💯</span>
          </p>
        </div>

        {/* Main Form Card - CYBERPUNK GLASS */}
        <div className="glass-strong rounded-3xl shadow-2xl border-2 neon-border overflow-hidden animate-scale-in hover-glow">
          {error && (
            <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-l-4 border-red-500 text-red-300 px-6 py-5 m-6 rounded-xl backdrop-blur-sm animate-bounce-in">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">{error}</span>
              </div>
            </div>
          )}

          <div className="p-8 md:p-10">
            <label className="block text-white mb-4 font-black text-2xl flex items-center">
              <span className="text-3xl mr-3">📝</span> What's Your Vibe?
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Just type it! Like... 'teen numbers ka maximum nikalo' or 'find sum of two numbers' 🎯&#10;&#10;No cap, fr fr! 💯"
              className="w-full bg-gradient-to-br from-slate-900/80 to-purple-900/30 text-white border-3 border-purple-500/30 focus:border-pink-500 rounded-2xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-purple-500/30 transition-all duration-300 h-52 resize-none text-xl placeholder-gray-400 font-medium shadow-lg hover-glow"
            />
            <div className="flex items-start mt-4 text-gray-300 text-sm bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 rounded-xl border border-cyan-500/20">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">
                <strong className="text-cyan-300">Pro tip:</strong> Be super specific! Say "three numbers" or "teen sankhya" 
                for best results. The AI is SMART! 🧠✨
              </span>
            </div>
          </div>

          {/* Action Button - MEGA NEON */}
          <div className="px-8 md:px-10 pb-8 md:pb-10">
            <button
              onClick={handleGenerate}
              disabled={loading || !description.trim()}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-black text-xl md:text-2xl px-8 py-6 rounded-2xl transition-all duration-300 shadow-2xl shadow-purple-500/50 hover:shadow-pink-500/70 transform hover:scale-[1.03] active:scale-[0.97] uppercase tracking-wide btn-3d animate-pulse-glow"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-4 h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Cooking up magic... 🔮✨
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Problem ⚡ Let's Go!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Examples Section - COOL CARDS */}
        <div className="mt-16 glass-strong rounded-3xl p-8 md:p-10 border-2 border-purple-500/30 shadow-2xl animate-slide-up">
          <h3 className="text-3xl md:text-4xl font-black text-white mb-8 flex items-center justify-center md:justify-start">
            <span className="text-5xl mr-4 animate-float">💡</span>
            <span className="gradient-text">Try These Vibes!</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            {exampleProblems.map((example, index) => (
              <div 
                key={index}
                onClick={() => setDescription(example.text)}
                className="group bg-gradient-to-br from-purple-900/30 to-pink-900/30 hover:from-purple-800/50 hover:to-pink-800/50 border-2 border-purple-500/30 hover:border-pink-500/60 rounded-2xl p-6 cursor-pointer transition-all duration-300 card-3d hover-glow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-4 group-hover:scale-125 transition-transform duration-300">
                    {['🎯', '✨', '🚀', '💻', '🔥', '⚡'][index]}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-100 group-hover:text-white transition-colors font-semibold text-lg leading-relaxed">
                      "{example.text}"
                    </p>
                    <span className="inline-block mt-3 text-xs font-bold text-purple-300 bg-purple-500/20 px-3 py-1.5 rounded-full border border-purple-500/30">
                      {example.lang} 🌐
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section - NEON CARDS */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 animate-fade-in">
          <div className="text-center p-8 glass rounded-2xl border-2 border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 card-3d hover-glow group">
            <div className="text-6xl mb-5 group-hover:scale-125 transition-transform duration-300 animate-float">🌍</div>
            <h4 className="text-white font-black text-xl mb-3 gradient-text-blue">Multi-Language Power</h4>
            <p className="text-gray-300 text-base font-medium">English, Hindi & Hinglish! Speak your language, we got you! 💬✨</p>
          </div>
          <div className="text-center p-8 glass rounded-2xl border-2 border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 card-3d hover-glow group" style={{ animationDelay: '0.1s' }}>
            <div className="text-6xl mb-5 group-hover:scale-125 transition-transform duration-300 animate-float" style={{ animationDelay: '1s' }}>⚡</div>
            <h4 className="text-white font-black text-xl mb-3 gradient-text-pink">Lightning Fast</h4>
            <p className="text-gray-300 text-base font-medium">Instant results! No waiting, no BS. Just pure speed! 🏃‍♂️💨</p>
          </div>
          <div className="text-center p-8 glass rounded-2xl border-2 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 card-3d hover-glow group" style={{ animationDelay: '0.2s' }}>
            <div className="text-6xl mb-5 group-hover:scale-125 transition-transform duration-300 animate-float" style={{ animationDelay: '2s' }}>🧠</div>
            <h4 className="text-white font-black text-xl mb-3 gradient-text-purple">Super Smart AI</h4>
            <p className="text-gray-300 text-base font-medium">Understands your vibe & context. It just GETS it! 🤖💯</p>
          </div>
        </div>
      </div>
    </div>
  );
};
