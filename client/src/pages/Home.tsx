import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { problemsAPI } from '../services/api';
import { AuthContext } from '../App';

const Home: React.FC = () => {
  const [problems, setProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; problemId: string | null; problemTitle: string }>({ 
    show: false, 
    problemId: null, 
    problemTitle: '' 
  });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await problemsAPI.getAll();
      setProblems(response.data.problems || []);
    } catch (error) {
      console.error('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-300 bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-2 border-green-500/50 shadow-lg shadow-green-500/30';
      case 'Medium': return 'text-yellow-300 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border-2 border-yellow-500/50 shadow-lg shadow-yellow-500/30';
      case 'Hard': return 'text-red-300 bg-gradient-to-r from-red-500/30 to-pink-500/30 border-2 border-red-500/50 shadow-lg shadow-red-500/30';
      default: return 'text-gray-300 bg-gradient-to-r from-gray-500/30 to-slate-500/30 border-2 border-gray-500/50';
    }
  };

  const handleDeleteClick = (problemId: string, problemTitle: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteModal({ show: true, problemId, problemTitle });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.problemId) return;
    
    try {
      await problemsAPI.delete(deleteModal.problemId);
      setProblems(problems.filter(p => p._id !== deleteModal.problemId));
      setDeleteModal({ show: false, problemId: null, problemTitle: '' });
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to delete problem');
      setDeleteModal({ show: false, problemId: null, problemTitle: '' });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ show: false, problemId: null, problemTitle: '' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Hero Section - GEN Z */}
        <div className="mb-16 text-center animate-bounce-in">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight text-glow">
            <span className="gradient-text">Level Up</span> Your Skills 💪
          </h1>
          <p className="text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-medium">
            Pick a challenge and show 'em what you got! Or create your own and flex! 
            <span className="inline-block ml-2">🔥🚀</span>
          </p>
          <Link 
            to="/create-problem" 
            className="inline-flex items-center bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 text-white font-black text-xl px-10 py-5 rounded-2xl shadow-2xl shadow-purple-500/50 hover:shadow-pink-500/70 transform hover:scale-110 transition-all duration-300 animate-pulse-glow uppercase tracking-wide"
          >
            <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            Create New Problem ⚡
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-24 animate-fade-in">
            <div className="inline-block spinner h-20 w-20 border-4"></div>
            <p className="text-white mt-8 text-2xl font-bold animate-pulse">Fetching epic challenges... 🎯</p>
          </div>
        ) : problems.length === 0 ? (
          <div className="glass-strong rounded-3xl p-20 text-center border-2 neon-border shadow-2xl animate-scale-in">
            <div className="text-8xl mb-8 animate-bounce-in">🚀</div>
            <h3 className="text-3xl font-black text-white mb-4 gradient-text">No Problems Yet!</h3>
            <p className="text-gray-200 text-xl mb-10 font-medium">Be the legend who creates the first one! 💪✨</p>
            <Link to="/create-problem" className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-lg px-10 py-5 rounded-2xl shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-110 uppercase">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
              Create First Problem 🎨
            </Link>
          </div>
        ) : (
          <div className="grid gap-8">
            {problems.map((problem, index) => (
              <Link
                key={problem._id}
                to={`/problem/${problem._id}`}
                className="group glass-strong hover:glass border-2 border-purple-500/30 hover:border-pink-500/60 rounded-3xl p-8 transition-all duration-300 relative shadow-2xl card-3d hover-glow animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <h3 className="text-3xl font-black text-white group-hover:gradient-text transition-all duration-300 text-glow">
                        {problem.title}
                      </h3>
                      <span className={`ml-5 px-5 py-2 rounded-full text-base font-black uppercase tracking-wide ${getDifficultyColor(problem.difficulty)} shadow-lg`}>
                        {problem.difficulty === 'Easy' ? '🟢 Easy' : problem.difficulty === 'Medium' ? '🟡 Medium' : '🔴 Hard'}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-5 line-clamp-2 text-lg leading-relaxed font-medium">{problem.description}</p>
                    <div className="flex items-center space-x-4">
                      {problem.tags && problem.tags.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {problem.tags.slice(0, 4).map((tag: string, index: number) => (
                            <span key={index} className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-bold border-2 border-purple-500/30 hover:border-pink-500/50 transition-all duration-300">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 ml-6">
                    {user && problem.createdBy?._id === user.id && (
                      <button
                        onClick={(e) => handleDeleteClick(problem._id, problem.title, e)}
                        className="opacity-0 group-hover:opacity-100 transition-all bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white p-4 rounded-2xl shadow-2xl shadow-red-500/50 transform hover:scale-125 hover:rotate-12 duration-300"
                        title="Delete problem"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                    <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-4 rounded-2xl group-hover:from-cyan-500/40 group-hover:to-blue-500/40 transition-all duration-300 border-2 border-cyan-500/30 group-hover:scale-125 group-hover:rotate-12">
                      <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal - DRAMATIC */}
        {deleteModal.show && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in">
            <div className="glass-strong rounded-3xl p-10 max-w-md w-full mx-4 border-2 neon-border shadow-2xl animate-bounce-in">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-br from-red-500/30 to-pink-500/30 p-4 rounded-2xl mr-5 animate-pulse-glow">
                  <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-white gradient-text-pink">Delete Problem? 🗑️</h3>
              </div>
              <p className="text-gray-200 mb-3 text-lg font-medium">
                You're about to delete:
              </p>
              <p className="font-black text-white text-xl mb-8 p-4 bg-red-500/10 rounded-xl border-2 border-red-500/30">
                "{deleteModal.problemTitle}"
              </p>
              <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-2 border-red-500/40 rounded-2xl p-5 mb-8 animate-pulse">
                <p className="text-red-300 text-base flex items-center font-bold">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  No going back! This is permanent! ⚠️
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleDeleteCancel}
                  className="flex-1 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-black text-lg px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 uppercase"
                >
                  Nah, Keep It ✋
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-black text-lg px-6 py-4 rounded-2xl transition-all duration-300 shadow-2xl shadow-red-500/50 hover:shadow-pink-500/70 transform hover:scale-105 uppercase"
                >
                  Yes, Delete 💥
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
