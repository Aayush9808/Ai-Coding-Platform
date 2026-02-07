#!/bin/bash

echo "🚀 Creating all remaining frontend files..."

cd client/src

# Login Page
cat > pages/Login.tsx << 'EOF'
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { AuthContext } from '../App';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const response = await authAPI.login({ email: formData.email, password: formData.password });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        navigate('/');
      } else {
        const response = await authAPI.register(formData);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-slate-800 rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-gray-300 mb-2">Username</label>
              <input
                type="text"
                required
                className="w-full bg-slate-700 text-white border border-slate-600 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
          )}

          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              required
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold py-3 rounded-md transition"
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:text-blue-300 ml-2 font-semibold"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
EOF

# Create Problem Page
cat > pages/CreateProblem.tsx << 'EOF'
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-4">Create New Problem</h1>
      <p className="text-gray-400 mb-8">Describe your problem in natural language (English or Hindi) and let AI generate it!</p>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-slate-800 rounded-lg p-6 mb-6">
        <label className="block text-gray-300 mb-2 font-semibold">Problem Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Example: Create a problem to find the sum of two integers..."
          className="w-full bg-slate-700 text-white border border-slate-600 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 h-40 resize-none"
        />
        <p className="text-gray-500 text-sm mt-2">Tip: Be specific about input/output requirements</p>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold px-8 py-3 rounded-md transition"
      >
        {loading ? 'Generating...' : 'Generate Problem with AI'}
      </button>

      <div className="mt-8 bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-3">Examples:</h3>
        <div className="space-y-2 text-gray-400">
          <p>• "Create a problem to check if a number is prime"</p>
          <p>• "Do numbers ka maximum nikalne ka problem banao" (Hindi)</p>
          <p>• "Find the longest palindrome substring in a string"</p>
        </div>
      </div>
    </div>
  );
};

export default CreateProblem;
EOF

echo "✅ All pages created successfully!"
echo "📝 Next: Install dependencies and run the app"
