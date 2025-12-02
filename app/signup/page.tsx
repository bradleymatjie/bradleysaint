'use client'; // Required for client-side interactivity in Next.js App Router

import { useState } from 'react';

interface SignUpFormProps {
  onSubmit?: (email: string, password: string, subscribe: boolean) => void;
}

export default function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!termsAgreed) {
      setError('You must agree to the terms.');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call; replace with your registration logic
    try {
      // Example: await fetch('/api/signup', { method: 'POST', body: JSON.stringify({ email, password, subscribe }) });
      console.log('Signing up with:', { email, password, subscribe });
      if (onSubmit) {
        onSubmit(email, password, subscribe);
      }
    } catch (err) {
      setError('Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center">Sign Up</h1>
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
              placeholder="Create a password (min 8 chars)"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white/50"
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={subscribe}
              onChange={(e) => setSubscribe(e.target.checked)}
              className="h-4 w-4 text-white focus:ring-white/50 rounded"
            />
            <label className="ml-2 block text-sm">
              Subscribe to our newsletter
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              className="h-4 w-4 text-white focus:ring-white/50 rounded"
              required
            />
            <label className="ml-2 block text-sm">
              I agree to the <a href="/terms" className="underline hover:no-underline">Terms of Service</a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-white text-black font-bold rounded-md hover:bg-gray-100 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{' '}
          <a href="/login" className="font-semibold hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}