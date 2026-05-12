import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';

interface ForgotPasswordScreenProps {
  onNavigate: (screen: 'login' | 'signup' | 'forgot-password' | 'authenticated') => void;
}

export default function ForgotPasswordScreen({ onNavigate }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reset Password Flow Triggered', { email });
  };

  return (
    <div className="min-h-screen w-full bg-[#0D0D0D] flex flex-col justify-center px-6 pt-10">
      <div className="w-full max-w-md mx-auto relative">
        <button
          onClick={() => onNavigate('login')}
          className="absolute -top-16 left-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#161616] border border-white/10 hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>

        <div className="mb-10">
          <h1 className="text-white text-4xl font-bold mb-2 tracking-tight">Reset Password</h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Enter the email associated with your account and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-8">
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

          <button
            type="submit"
            className="w-full py-4 rounded-xl items-center justify-center bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] active:scale-[0.98] transition-transform"
          >
            <span className="text-black font-bold text-lg">Send Reset Link</span>
          </button>
        </form>
      </div>
    </div>
  );
}
