import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { User } from '@/app/App';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - In real app, this would call your backend
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
      isArtisan: false
    };

    onSuccess(user);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-[#FFF8E7] rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
             style={{
               border: '4px solid #D4703B',
               borderRadius: '40px 10px 40px 10px'
             }}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#F4ACB7] transition-colors duration-300"
          >
            <X size={20} className="text-[#3A5A40]" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="font-['Amatic_SC'] text-5xl font-bold text-[#3A5A40] mb-2">
              {isLogin ? 'Welcome Back!' : 'Join Our Community'}
            </h2>
            <p className="font-['Josefin_Sans'] text-sm text-[#3A5A40]/70">
              {isLogin ? 'Sign in to continue shopping' : 'Create an account to get started'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm bg-white"
                  style={{ borderRadius: '12px 3px 12px 3px' }}
                />
              </div>
            )}

            <div>
              <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm bg-white"
                style={{ borderRadius: '12px 3px 12px 3px' }}
              />
            </div>

            <div>
              <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm bg-white"
                style={{ borderRadius: '12px 3px 12px 3px' }}
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#D4703B] border-2 border-[#3A5A40] rounded focus:ring-[#D4703B]"
                  />
                  <span className="font-['Josefin_Sans'] text-xs text-[#3A5A40]">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="font-['Josefin_Sans'] text-xs text-[#D4703B] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#D4703B] text-[#FFF8E7] px-8 py-4 rounded-lg font-['Josefin_Sans'] text-lg font-semibold hover:bg-[#3A5A40] transition-all duration-300 shadow-xl"
              style={{
                border: '3px solid #3A5A40',
                borderRadius: '20px 5px 20px 5px'
              }}
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center space-x-4 my-6">
            <div className="flex-1 h-px bg-[#3A5A40]/20"></div>
            <span className="font-['Josefin_Sans'] text-xs text-[#3A5A40]/60">or</span>
            <div className="flex-1 h-px bg-[#3A5A40]/20"></div>
          </div>

          {/* Social Login (placeholder) */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full bg-white text-[#3A5A40] px-6 py-3 rounded-lg font-['Josefin_Sans'] text-sm font-medium hover:bg-[#F4ACB7]/30 transition-colors duration-300 border-2 border-[#3A5A40]/20 flex items-center justify-center space-x-2"
              style={{ borderRadius: '15px 5px 15px 5px' }}
            >
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Toggle */}
          <p className="text-center mt-6 font-['Josefin_Sans'] text-sm text-[#3A5A40]">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#D4703B] font-semibold hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
