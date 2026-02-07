import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { problemsAPI, submissionsAPI } from '../services/api';

const SolveProblem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [problem, setProblem] = useState<any>(null);
  const [testCases, setTestCases] = useState<any[]>([]);
  const [code, setCode] = useState('// Write your code here\n\n');
  const [language, setLanguage] = useState('cpp');
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    fetchProblem();
  }, [id]);

  const fetchProblem = async () => {
    try {
      const response = await problemsAPI.getById(id!);
      setProblem(response.data.problem);
      setTestCases(response.data.testCases || []);
    } catch (error) {
      console.error('Error fetching problem:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRun = async () => {
    setRunning(true);
    setResults(null);
    try {
      const response = await submissionsAPI.run({ code, language, problemId: id! });
      setResults(response.data);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to run code');
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first to submit code');
      window.location.href = '/login';
      return;
    }

    if (window.confirm('Are you sure you want to submit?')) {
      setRunning(true);
      try {
        const response = await submissionsAPI.submit({ code, language, problemId: id! });
        const submission = response.data.submission;
        alert(`Submission ${submission.status}!\nPassed: ${submission.passedTests}/${submission.totalTests}`);
        setResults(response.data);
      } catch (error: any) {
        console.error('Submit error:', error);
        const errorMsg = error.response?.data?.error || error.message || 'Failed to submit';
        alert(errorMsg);
      } finally {
        setRunning(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded">
          Problem not found
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Problem Description */}
        <div className="bg-slate-800 rounded-lg p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
          <h1 className="text-3xl font-bold text-white mb-2">{problem.title}</h1>
          <span className={`inline-block px-3 py-1 rounded text-sm font-semibold mb-4 ${
            problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
            problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {problem.difficulty}
          </span>

          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Problem Statement</h3>
            <p className="text-gray-300">{problem.problemStatement}</p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Input Format</h3>
            <p className="text-gray-300">{problem.inputFormat}</p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Output Format</h3>
            <p className="text-gray-300">{problem.outputFormat}</p>

            {problem.constraints && (
              <>
                <h3 className="text-xl font-semibold text-white mt-6 mb-3">Constraints</h3>
                <p className="text-gray-300">{problem.constraints}</p>
              </>
            )}

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Sample Test Cases</h3>
            {testCases.filter(tc => tc.isSample).map((tc, index) => (
              <div key={index} className="bg-slate-700 rounded p-4 mb-3">
                <p className="text-sm text-gray-400 mb-2">Test Case {index + 1}</p>
                <div className="text-sm">
                  <p className="text-gray-300"><strong>Input:</strong></p>
                  <pre className="bg-slate-900 rounded p-2 mt-1 text-gray-300">{tc.input}</pre>
                  <p className="text-gray-300 mt-2"><strong>Output:</strong></p>
                  <pre className="bg-slate-900 rounded p-2 mt-1 text-gray-300">{tc.expectedOutput}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Editor */}
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-700 text-white border border-slate-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
            </select>

            <div className="flex space-x-3">
              <button
                onClick={handleRun}
                disabled={running}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-6 py-2 rounded transition"
              >
                {running ? 'Running...' : 'Run'}
              </button>
              <button
                onClick={handleSubmit}
                disabled={running}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-6 py-2 rounded transition"
              >
                Submit
              </button>
            </div>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full bg-slate-900 text-white font-mono text-sm p-4 rounded border border-slate-700 focus:outline-none focus:border-blue-500 resize-none"
            style={{ height: '400px' }}
            spellCheck={false}
          />

          {/* Results */}
          {results && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-white mb-3">Results</h3>
              <div className="space-y-3">
                {results.results.map((result: any, index: number) => (
                  <div
                    key={index}
                    className={`rounded p-4 ${
                      result.passed ? 'bg-green-500/10 border border-green-500' : 'bg-red-500/10 border border-red-500'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">{result.passed ? '✓' : '✗'} Test Case {index + 1}</span>
                      <span className="text-sm text-gray-400">{result.status}</span>
                    </div>
                    <div className="text-sm space-y-2">
                      <div>
                        <p className="text-gray-400">Input:</p>
                        <pre className="bg-slate-900 rounded p-2 mt-1">{result.input}</pre>
                      </div>
                      <div>
                        <p className="text-gray-400">Expected:</p>
                        <pre className="bg-slate-900 rounded p-2 mt-1">{result.expectedOutput}</pre>
                      </div>
                      <div>
                        <p className="text-gray-400">Your Output:</p>
                        <pre className={`rounded p-2 mt-1 ${result.passed ? 'bg-slate-900' : 'bg-red-900/30'}`}>
                          {result.actualOutput || result.error || 'No output'}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="bg-slate-700 rounded p-4 text-center">
                  <p className="text-xl font-semibold text-white">
                    Passed: {results.totalPassed}/{results.totalTestCases}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolveProblem;
