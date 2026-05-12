import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

interface LoginScreenProps {
  onNavigate: (screen: 'login' | 'signup' | 'forgot-password' | 'authenticated') => void;
}

export default function LoginScreen({ onNavigate }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login Flow Triggered', { email, password });
    onNavigate('authenticated');
  };

  return (
    <div className="min-h-screen w-full bg-[#0D0D0D] flex flex-col justify-center px-6">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-white text-4xl font-bold mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-gray-400 text-base">Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 mb-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#161616] text-white rounded-xl pl-12 pr-4 py-3 border border-white/10 focus:border-[#D4AF37]/50 focus:outline-none transition-colors"
              required
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#161616] text-white rounded-xl pl-12 pr-4 py-3 border border-white/10 focus:border-[#D4AF37]/50 focus:outline-none transition-colors"
              required
            />
          </div>

          <div className="flex justify-end pt-2 mb-8">
            <button
              type="button"
              onClick={() => onNavigate('forgot-password')}
              className="text-[#D4AF37] font-medium text-sm hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl items-center justify-center bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] active:scale-[0.98] transition-transform"
          >
            <span className="text-black font-bold text-lg">Log In</span>
          </button>
        </form>

        <div className="flex justify-center mt-10">
          <span className="text-gray-400 text-sm">Don't have an account? </span>
          <button
            onClick={() => onNavigate('signup')}
            className="text-[#D4AF37] font-bold text-sm ml-1 hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
