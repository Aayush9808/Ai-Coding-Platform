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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-blue-500/10 text-blue-400 text-sm font-semibold px-4 py-2 rounded-full border border-blue-500/20">
              ✨ AI-Powered Problem Generator
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Create Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Coding Problem</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Describe your problem in natural language (English, Hindi, or Hinglish) and our intelligent system will generate it instantly!
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
          {error && (
            <div className="bg-red-500/10 border-l-4 border-red-500 text-red-400 px-6 py-4 m-6 rounded">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          )}

          <div className="p-8">
            <label className="block text-gray-200 mb-3 font-semibold text-lg">
              📝 Describe Your Problem
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Example: Create a problem to find the maximum of three numbers&#10;या&#10;Teen numbers ka maximum nikalo"
              className="w-full bg-slate-900/50 text-white border-2 border-slate-600 focus:border-blue-500 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 h-48 resize-none text-lg placeholder-gray-500"
            />
            <div className="flex items-start mt-3 text-gray-400 text-sm">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>
                <strong>Pro Tip:</strong> Be specific about the number of inputs (e.g., "three numbers", "teen sankhya") 
                and the operation you want (maximum, sum, minimum, etc.)
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="px-8 pb-8">
            <button
              onClick={handleGenerate}
              disabled={loading || !description.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/50 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Problem...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Problem with AI
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Examples Section */}
        <div className="mt-12 bg-slate-800/30 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <svg className="w-7 h-7 mr-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Example Problem Descriptions
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {exampleProblems.map((example, index) => (
              <div 
                key={index}
                onClick={() => setDescription(example.text)}
                className="group bg-slate-900/50 hover:bg-slate-900 border border-slate-600 hover:border-blue-500 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="flex items-start">
                  <span className="text-blue-400 mr-3 text-lg">💡</span>
                  <div className="flex-1">
                    <p className="text-gray-200 group-hover:text-white transition-colors">
                      "{example.text}"
                    </p>
                    <span className="inline-block mt-2 text-xs text-gray-500 bg-slate-800 px-2 py-1 rounded">
                      {example.lang}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
            <div className="text-4xl mb-3">🌍</div>
            <h4 className="text-white font-semibold mb-2">Multi-Language</h4>
            <p className="text-gray-400 text-sm">English, Hindi & Hinglish supported</p>
          </div>
          <div className="text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
            <div className="text-4xl mb-3">⚡</div>
            <h4 className="text-white font-semibold mb-2">Instant Generation</h4>
            <p className="text-gray-400 text-sm">Get problems in seconds</p>
          </div>
          <div className="text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="text-white font-semibold mb-2">Smart Detection</h4>
            <p className="text-gray-400 text-sm">Understands context & intent</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProblem;
