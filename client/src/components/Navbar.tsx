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
    <nav className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-3">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg shadow-lg group-hover:shadow-blue-500/50 transition-all">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                CodeJudge AI
              </span>
            </Link>
            <div className="hidden md:flex space-x-2">
              <Link to="/" className="text-gray-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-lg transition-all font-medium">
                🏠 Problems
              </Link>
              <Link to="/create-problem" className="text-gray-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-lg transition-all font-medium">
                ✨ Create Problem
              </Link>
              {user && (
                <Link to="/dashboard" className="text-gray-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-lg transition-all font-medium">
                  📊 Dashboard
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden sm:flex items-center bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white font-bold text-sm">{user.username.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="text-gray-200 font-medium">Hi, {user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg transition-all font-semibold shadow-lg hover:shadow-red-500/50 transform hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2.5 rounded-lg transition-all font-semibold shadow-lg hover:shadow-blue-500/50 transform hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
