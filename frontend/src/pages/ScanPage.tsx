import React, { useState, useEffect } from 'react';
import { scanCode } from '../api';
import { supabase } from '../utils/supabaseClient';

interface ScanPageProps {
  onScanComplete: (result: any) => void;
}

export function ScanPage({ onScanComplete }: ScanPageProps) {
  const [repoUrl, setRepoUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [githubToken, setGithubToken] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get current user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleScan = async () => {
    setError(null);
    setLoading(true);
    setResult(null);
    if (!repoUrl.trim()) {
      setError('Please enter a valid GitHub repository URL.');
      setLoading(false);
      return;
    }
    try {
      const user_id = user?.id || '00000000-0000-0000-0000-000000000000';
      const res = await scanCode(user_id, repoUrl, githubToken);
      if (res.error) {
        setError(res.error);
      } else {
        setResult(res);
        onScanComplete(res);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while scanning.');
    }
    setLoading(false);
  };

  const handleGitHubLogin = async () => {
    await supabase.auth.signInWithOAuth({ 
      provider: 'github',
      options: {
        redirectTo: window.location.origin
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Scan a GitHub Repo for PII</h2>
      {!user ? (
        <div className="mb-6">
          <p className="mb-4">Sign in with GitHub to scan your repositories:</p>
          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={handleGitHubLogin}
          >
            Sign in with GitHub
          </button>
        </div>
      ) : (
        <div className="mb-6">
          <p className="text-green-600 mb-2">✅ Signed in as: {user.email}</p>
          <p className="text-sm text-gray-600">You can now scan repositories from your GitHub account.</p>
        </div>
      )}
      <input
        type="text"
        className="border p-2 w-full mb-4"
        placeholder="GitHub Repo URL (e.g., https://github.com/deepakreddy21-art/my-repo)"
        value={repoUrl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepoUrl(e.target.value)}
      />
      <button
        className={`bg-blue-600 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleScan}
        disabled={loading || !user}
      >
        {loading ? 'Scanning...' : 'Scan Code'}
      </button>
      {error && (
        <div className="mt-4 text-red-600 bg-red-100 p-2 rounded">{error}</div>
      )}
      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">Scan Results:</h3>
          <pre className="text-sm overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
} 