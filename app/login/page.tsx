'use client'; // Required for client-side interactivity in Next.js App Router

import { useState } from 'react';

interface LoginFormProps {
  onSubmit?: (email: string, password: string, rememberMe: boolean) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call; replace with your auth logic
    try {
      // Example: await fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password, rememberMe }) });
      console.log('Logging in with:', { email, password, rememberMe });
      if (onSubmit) {
        onSubmit(email, password, rememberMe);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center">Log In</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-200 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white/50"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white/50"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-white focus:ring-white/50 rounded"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="/forgot-password" className="text-sm hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-white text-black font-bold rounded-md hover:bg-gray-100 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Don't have an account?{' '}
          <a href="/signup" className="font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}