import React, { useEffect, useState, useContext } from 'react';
import { submissionsAPI } from '../../services/api';
import { AuthContext } from '../../App';
import { Link } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchSubmissions();
    }
  }, [user]);

  const fetchSubmissions = async () => {
    try {
      const response = await submissionsAPI.getUserSubmissions();
      setSubmissions(response.data.submissions || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl text-white mb-4">Please login to view your dashboard</h2>
        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md inline-block">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">My Dashboard</h1>

      <div className="bg-slate-800 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Profile</h2>
        <p className="text-gray-300"><strong>Username:</strong> {user.username}</p>
        <p className="text-gray-300"><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="bg-slate-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Recent Submissions</h2>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : submissions.length === 0 ? (
          <p className="text-gray-400">No submissions yet. Start solving problems!</p>
        ) : (
          <div className="space-y-3">
            {submissions.map((submission) => (
              <div key={submission._id} className="bg-slate-700 rounded p-4 flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">{submission.problemId?.title || 'Unknown Problem'}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(submission.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                    submission.status === 'Accepted' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {submission.status}
                  </span>
                  <p className="text-sm text-gray-400 mt-1">
                    {submission.testCasesPassed}/{submission.totalTestCases} passed
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
