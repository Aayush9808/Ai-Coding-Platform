import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CreateProblem from './pages/CreateProblem';
import SolveProblem from './pages/SolveProblem';
import Login from './pages/Login';
import UserDashboard from './components/Dashboard/UserDashboard';
import Navbar from './components/Navbar';

interface User {
  id: string;
  username: string;
  email: string;
}

export const AuthContext = React.createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}>({
  user: null,
  setUser: () => {},
  logout: () => {}
});

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-problem" element={<CreateProblem />} />
            <Route path="/problem/:id" element={<SolveProblem />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;