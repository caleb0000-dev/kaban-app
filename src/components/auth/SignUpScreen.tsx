import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';

interface SignUpScreenProps {
  onNavigate: (screen: 'login' | 'signup' | 'forgot-password' | 'authenticated') => void;
}

export default function SignUpScreen({ onNavigate }: SignUpScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign Up Flow Triggered', { name, email, password });
    onNavigate('authenticated');
  };

  return (
    <div className="min-h-screen w-full bg-[#0D0D0D] flex flex-col justify-center px-6">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-white text-4xl font-bold mb-2 tracking-tight">Create Account</h1>
          <p className="text-gray-400 text-base">Sign up to get started</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4 mb-8">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#161616] text-white rounded-xl pl-12 pr-4 py-3 border border-white/10 focus:border-[#D4AF37]/50 focus:outline-none transition-colors"
              required
            />
          </div>

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

          <button
            type="submit"
            className="w-full py-4 mt-6 rounded-xl items-center justify-center bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] active:scale-[0.98] transition-transform"
          >
            <span className="text-black font-bold text-lg">Sign Up</span>
          </button>
        </form>

        <div className="flex justify-center mt-10">
          <span className="text-gray-400 text-sm">Already have an account? </span>
          <button
            onClick={() => onNavigate('login')}
            className="text-[#D4AF37] font-bold text-sm ml-1 hover:underline"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
