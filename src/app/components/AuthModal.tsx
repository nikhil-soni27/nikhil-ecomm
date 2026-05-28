import React, { useState } from 'react';
import { X, ArrowLeft, Mail, ShieldAlert, Sparkles, User as UserIcon } from 'lucide-react';
import type { User } from '@/app/App';
import { api } from '@/app/utils/api';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Forgot Password state
  const [forgotMode, setForgotMode] = useState<'none' | 'email' | 'reset'>('none');
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Simulated Google Chooser state
  const [showGoogleChooser, setShowGoogleChooser] = useState(false);
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [showCustomGoogleInput, setShowCustomGoogleInput] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isArtisan: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (isLogin) {
        const data = await api.login(formData.email, formData.password);
        onSuccess(data.user);
        toast.success(`Welcome back, ${data.user.name}!`);
      } else {
        const data = await api.register(
          formData.name,
          formData.email,
          formData.password,
          formData.isArtisan
        );
        onSuccess(data.user);
        toast.success(`Welcome, ${data.user.name}! Account created.`);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'Authentication failed. Please try again.');
      toast.error(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle Forgot Password - Phase 1: Verify Email
  const handleForgotEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.forgotPassword(resetEmail);
      toast.success('Email verified successfully!');
      setForgotMode('reset');
    } catch (err: any) {
      console.error('Forgot password error:', err);
      setError(err.message || 'Email address not found');
      toast.error(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle Forgot Password - Phase 2: Reset Password
  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.resetPassword(resetEmail, newPassword);
      toast.success('Your password has been reset successfully!');
      setForgotMode('none');
      setIsLogin(true);
      setFormData({
        ...formData,
        email: resetEmail,
        password: ''
      });
    } catch (err: any) {
      console.error('Reset password error:', err);
      setError(err.message || 'Failed to reset password');
      toast.error(err.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  // Google Login - Triggered by Chooser
  const handleGoogleAccountSelect = async (name: string, email: string) => {
    setLoading(true);
    setShowGoogleChooser(false);
    
    try {
      const googleId = `google-${Math.random().toString(36).substring(2, 11)}`;
      const data = await api.googleLogin(name, email, googleId);
      onSuccess(data.user);
      toast.success(`Logged in with Google as ${data.user.name}!`);
    } catch (err: any) {
      console.error('Google login error:', err);
      toast.error(err.message || 'Google Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={() => {
          if (!showGoogleChooser) onClose();
        }}
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

          {/* FORGOT PASSWORD: EMAIL VERIFICATION PHASE */}
          {forgotMode === 'email' && (
            <div>
              <button 
                onClick={() => { setForgotMode('none'); setError(null); }}
                className="flex items-center space-x-2 text-[#D4703B] hover:text-[#3A5A40] mb-6 font-['Josefin_Sans'] text-sm font-semibold transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Back to Login</span>
              </button>

              <div className="text-center mb-8">
                <h2 className="font-['Amatic_SC'] text-5xl font-bold text-[#3A5A40] mb-2">
                  Find Your Account
                </h2>
                <p className="font-['Josefin_Sans'] text-sm text-[#3A5A40]/70">
                  Enter your registered email address to verify your account
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 text-red-700 text-sm font-['Josefin_Sans'] rounded-xl" style={{ borderRadius: '12px 3px 12px 3px' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleForgotEmailSubmit} className="space-y-4">
                <div>
                  <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm bg-white"
                    style={{ borderRadius: '12px 3px 12px 3px' }}
                    placeholder="name@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#D4703B] text-[#FFF8E7] px-8 py-4 rounded-lg font-['Josefin_Sans'] text-lg font-semibold hover:bg-[#3A5A40] transition-all duration-300 shadow-xl"
                  style={{
                    border: '3px solid #3A5A40',
                    borderRadius: '20px 5px 20px 5px'
                  }}
                >
                  {loading ? 'Verifying...' : 'Verify Email'}
                </button>
              </form>
            </div>
          )}

          {/* FORGOT PASSWORD: SET NEW PASSWORD PHASE */}
          {forgotMode === 'reset' && (
            <div>
              <div className="text-center mb-8">
                <h2 className="font-['Amatic_SC'] text-5xl font-bold text-[#3A5A40] mb-2">
                  Reset Password
                </h2>
                <p className="font-['Josefin_Sans'] text-sm text-[#3A5A40]/70">
                  Setting a new secure password for <strong>{resetEmail}</strong>
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 text-red-700 text-sm font-['Josefin_Sans'] rounded-xl" style={{ borderRadius: '12px 3px 12px 3px' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                <div>
                  <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm bg-white"
                    style={{ borderRadius: '12px 3px 12px 3px' }}
                    placeholder="Minimum 6 characters"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#D4703B] text-[#FFF8E7] px-8 py-4 rounded-lg font-['Josefin_Sans'] text-lg font-semibold hover:bg-[#3A5A40] transition-all duration-300 shadow-xl"
                  style={{
                    border: '3px solid #3A5A40',
                    borderRadius: '20px 5px 20px 5px'
                  }}
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>
          )}

          {/* STANDARD SIGN-IN & REGISTER BLOCKS */}
          {forgotMode === 'none' && (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="font-['Amatic_SC'] text-5xl font-bold text-[#3A5A40] mb-2">
                  {isLogin ? 'Welcome Back!' : 'Join Our Community'}
                </h2>
                <p className="font-['Josefin_Sans'] text-sm text-[#3A5A40]/70">
                  {isLogin ? 'Sign in to continue shopping' : 'Create an account to get started'}
                </p>
              </div>

              {/* Error Notice */}
              {error && (
                <div 
                  className="mb-6 p-4 bg-red-50 border-2 border-red-200 text-red-700 text-sm font-['Josefin_Sans']"
                  style={{ borderRadius: '12px 3px 12px 3px' }}
                >
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
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

                    {/* Role Selector (Customer vs Artisan) */}
                    <div>
                      <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                        Account Type
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer bg-white px-4 py-2.5 rounded-lg border-2 border-[#3A5A40]/10 flex-1 hover:border-[#D4703B]/50 transition-colors"
                               style={{ borderRadius: '12px 3px 12px 3px' }}>
                          <input
                            type="radio"
                            name="isArtisan"
                            checked={!formData.isArtisan}
                            onChange={() => setFormData({ ...formData, isArtisan: false })}
                            className="text-[#D4703B] focus:ring-[#D4703B] w-4 h-4 cursor-pointer"
                          />
                          <span className="font-['Josefin_Sans'] text-xs text-[#3A5A40] select-none">
                            Customer
                          </span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer bg-white px-4 py-2.5 rounded-lg border-2 border-[#3A5A40]/10 flex-1 hover:border-[#D4703B]/50 transition-colors"
                               style={{ borderRadius: '12px 3px 12px 3px' }}>
                          <input
                            type="radio"
                            name="isArtisan"
                            checked={formData.isArtisan}
                            onChange={() => setFormData({ ...formData, isArtisan: true })}
                            className="text-[#D4703B] focus:ring-[#D4703B] w-4 h-4 cursor-pointer"
                          />
                          <span className="font-['Josefin_Sans'] text-xs text-[#3A5A40] select-none">
                            Artisan
                          </span>
                        </label>
                      </div>
                    </div>
                  </>
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
                      onClick={() => { setForgotMode('email'); setError(null); }}
                      className="font-['Josefin_Sans'] text-xs text-[#D4703B] hover:underline transition-all duration-300 font-semibold"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-[#D4703B] text-[#FFF8E7] px-8 py-4 rounded-lg font-['Josefin_Sans'] text-lg font-semibold hover:bg-[#3A5A40] transition-all duration-300 shadow-xl ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  style={{
                    border: '3px solid #3A5A40',
                    borderRadius: '20px 5px 20px 5px'
                  }}
                >
                  {loading ? (isLogin ? 'Signing In...' : 'Creating Account...') : (isLogin ? 'Sign In' : 'Create Account')}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center space-x-4 my-6">
                <div className="flex-1 h-px bg-[#3A5A40]/20"></div>
                <span className="font-['Josefin_Sans'] text-xs text-[#3A5A40]/60">or</span>
                <div className="flex-1 h-px bg-[#3A5A40]/20"></div>
              </div>

              {/* Google OAuth trigger */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setShowGoogleChooser(true)}
                  className="w-full bg-white text-[#3A5A40] px-6 py-3.5 rounded-lg font-['Josefin_Sans'] text-sm font-semibold hover:bg-[#F4ACB7]/20 transition-all duration-300 border-2 border-[#3A5A40]/25 flex items-center justify-center space-x-3 group relative overflow-hidden"
                  style={{ borderRadius: '15px 5px 15px 5px' }}
                >
                  {/* Styled Google Icon */}
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
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
            </>
          )}
        </div>
      </div>

      {/* MOCK GOOGLE ACCOUNT CHOOSER DIALOG */}
      {showGoogleChooser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
            onClick={() => setShowGoogleChooser(false)}
          />
          
          {/* Google styled selector container */}
          <div 
            className="bg-white max-w-sm w-full p-6 shadow-2xl relative z-10 transition-all duration-350"
            style={{ 
              borderRadius: '24px',
              fontFamily: 'Roboto, sans-serif',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.25)' 
            }}
          >
            {/* Close */}
            <button 
              onClick={() => setShowGoogleChooser(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Google Logo Header */}
            <div className="text-center mb-6 mt-2">
              <div className="text-2xl font-semibold tracking-tight select-none mb-1">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </div>
              <h3 className="text-lg font-medium text-[#202124] mb-1">Choose an account</h3>
              <p className="text-xs text-[#5f6368]">to continue to <strong>Artisan Marketplace</strong></p>
            </div>

            {/* Simulated accounts */}
            {!showCustomGoogleInput ? (
              <div className="space-y-1.5 mb-6">
                {[
                  { name: 'Sarah Mitchell', email: 'sarah.mitchell@gmail.com', avatar: 'https://i.pravatar.cc/150?img=1' },
                  { name: 'James Cooper', email: 'james.cooper@gmail.com', avatar: 'https://i.pravatar.cc/150?img=12' },
                  { name: 'Emma Rodriguez', email: 'emma.rodriguez@gmail.com', avatar: 'https://i.pravatar.cc/150?img=5' }
                ].map((account, index) => (
                  <button
                    key={index}
                    onClick={() => handleGoogleAccountSelect(account.name, account.email)}
                    className="w-full flex items-center justify-between p-3.5 hover:bg-gray-50 border border-gray-100 rounded-xl transition-all duration-200 text-left cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <img 
                        src={account.avatar} 
                        alt={account.name} 
                        className="w-8 h-8 rounded-full border border-gray-100 object-cover" 
                      />
                      <div>
                        <div className="text-sm font-semibold text-[#3c4043]">{account.name}</div>
                        <div className="text-xs text-[#5f6368]">{account.email}</div>
                      </div>
                    </div>
                    {/* Tiny decorator badge */}
                    {index === 0 && (
                      <span className="bg-[#9CAF88]/20 text-[#3A5A40] text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        Artisan
                      </span>
                    )}
                  </button>
                ))}

                {/* Switch to Custom Input */}
                <button
                  onClick={() => setShowCustomGoogleInput(true)}
                  className="w-full flex items-center space-x-3 p-3.5 hover:bg-gray-50 border border-gray-100 rounded-xl transition-all duration-200 text-left text-sm text-[#1a73e8] font-medium"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <UserIcon size={16} />
                  </div>
                  <span>Use another account</span>
                </button>
              </div>
            ) : (
              // Custom simulated account creator
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Custom Full Name</label>
                  <input
                    type="text"
                    required
                    value={customGoogleName}
                    onChange={(e) => setCustomGoogleName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-[#1a73e8] focus:outline-none text-sm text-[#3c4043]"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Custom Gmail Address</label>
                  <input
                    type="email"
                    required
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-[#1a73e8] focus:outline-none text-sm text-[#3c4043]"
                    placeholder="name@gmail.com"
                  />
                </div>
                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCustomGoogleInput(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!customGoogleName || !customGoogleEmail}
                    onClick={() => handleGoogleAccountSelect(customGoogleName, customGoogleEmail)}
                    className="flex-1 px-4 py-2 bg-[#1a73e8] text-white rounded-lg text-sm hover:bg-[#1557b0] disabled:bg-gray-200 disabled:text-gray-400 font-medium"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            )}

            {/* Footer notice */}
            <p className="text-[10px] text-gray-500 leading-normal text-center">
              To proceed, Google will share your name, email address, language preference, and profile picture with Artisan Marketplace.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
