import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-strong border-b-2 border-purple-500/30 sticky top-0 z-50 shadow-2xl shadow-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 py-3">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 p-3 rounded-2xl shadow-2xl shadow-purple-500/50 group-hover:shadow-pink-500/70 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 animate-pulse-glow">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <span className="text-3xl font-black gradient-text">
                CodeJudge AI ⚡
              </span>
            </Link>
            <div className="hidden md:flex space-x-3">
              <Link to="/" className="text-gray-200 hover:text-white hover:bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-5 py-3 rounded-2xl transition-all font-bold text-lg border-2 border-transparent hover:border-purple-500/50 hover:scale-110 duration-300">
                🏠 Problems
              </Link>
              <Link to="/create-problem" className="text-gray-200 hover:text-white hover:bg-gradient-to-r from-pink-500/20 to-cyan-500/20 px-5 py-3 rounded-2xl transition-all font-bold text-lg border-2 border-transparent hover:border-pink-500/50 hover:scale-110 duration-300">
                ✨ Create
              </Link>
              {user && (
                <Link to="/dashboard" className="text-gray-200 hover:text-white hover:bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-5 py-3 rounded-2xl transition-all font-bold text-lg border-2 border-transparent hover:border-cyan-500/50 hover:scale-110 duration-300">
                  📊 Dashboard
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden sm:flex items-center glass-strong px-5 py-3 rounded-2xl border-2 border-cyan-500/30 shadow-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-full flex items-center justify-center mr-3 animate-pulse-glow">
                    <span className="text-white font-black text-lg">{user.username.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="text-white font-bold text-base">Yo, {user.username}! 👋</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white px-6 py-3 rounded-2xl transition-all font-black text-base shadow-2xl shadow-red-500/50 hover:shadow-pink-500/70 transform hover:scale-110 uppercase tracking-wide"
                >
                  Peace Out ✌️
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 text-white px-8 py-3 rounded-2xl transition-all font-black text-base shadow-2xl shadow-purple-500/50 hover:shadow-pink-500/70 transform hover:scale-110 uppercase tracking-wide animate-pulse-glow"
              >
                Let's Go! 🚀
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
