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
      case 'Easy': return 'text-green-400 bg-green-500/20 border border-green-500/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20 border border-yellow-500/30';
      case 'Hard': return 'text-red-400 bg-red-500/20 border border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border border-gray-500/30';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Coding Problems</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Choose a problem to solve, or create your own with AI assistance!
          </p>
          <Link 
            to="/create-problem" 
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-200"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Problem
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
            <p className="text-gray-300 mt-6 text-lg">Loading problems...</p>
          </div>
        ) : problems.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-16 text-center border border-slate-700/50 shadow-2xl">
            <div className="text-6xl mb-6">🚀</div>
            <p className="text-gray-300 text-xl mb-8">No problems yet! Be the first to create one.</p>
            <Link to="/create-problem" className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create First Problem
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {problems.map((problem) => (
              <Link
                key={problem._id}
                to={`/problem/${problem._id}`}
                className="group bg-slate-800/50 backdrop-blur-xl hover:bg-slate-800/70 border-2 border-slate-700 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-200 relative shadow-lg hover:shadow-blue-500/20 transform hover:scale-[1.01]"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {problem.title}
                      </h3>
                      <span className={`ml-4 px-4 py-1.5 rounded-full text-sm font-bold ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4 line-clamp-2 text-lg leading-relaxed">{problem.description}</p>
                    <div className="flex items-center space-x-4">
                      {problem.tags && problem.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {problem.tags.slice(0, 4).map((tag: string, index: number) => (
                            <span key={index} className="bg-slate-700/50 text-gray-300 px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-600">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 ml-4">
                    {user && problem.createdBy?._id === user.id && (
                      <button
                        onClick={(e) => handleDeleteClick(problem._id, problem.title, e)}
                        className="opacity-0 group-hover:opacity-100 transition-all bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg shadow-lg hover:shadow-red-500/50 transform hover:scale-110"
                        title="Delete problem"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                    <div className="bg-blue-500/10 p-2 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal.show && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 border-2 border-red-500/30 shadow-2xl animate-scale-in">
              <div className="flex items-center mb-6">
                <div className="bg-red-500/10 p-3 rounded-full mr-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Delete Problem?</h3>
              </div>
              <p className="text-gray-300 mb-2">
                Are you sure you want to delete:
              </p>
              <p className="font-semibold text-white text-lg mb-6">
                "{deleteModal.problemTitle}"
              </p>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6">
                <p className="text-red-400 text-sm flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  This action cannot be undone
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleDeleteCancel}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-red-500/50"
                >
                  Delete
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
