import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import {
  X,
  ArrowLeft,
  Mail,
  ShieldAlert,
  Sparkles,
  User as UserIcon,
} from "lucide-react";
import type { User } from "@/app/App";
import { api } from "@/app/utils/api";
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Forgot Password state
  const [forgotMode, setForgotMode] = useState<"none" | "email" | "reset">(
    "none",
  );
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isArtisan: false,
  });
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        const data = await api.login(
          formData.email,
          formData.password,
          rememberMe,
        );
        onSuccess(data.user);
        toast.success(`Welcome back, ${data.user.name}!`);
      } else {
        const data = await api.register(
          formData.name,
          formData.email,
          formData.password,
          formData.isArtisan,
        );
        onSuccess(data.user);
        toast.success(`Welcome, ${data.user.name}! Account created.`);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(err.message || "Authentication failed. Please try again.");
      toast.error(err.message || "Authentication failed");
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
      toast.success("Email verified successfully!");
      setForgotMode("reset");
    } catch (err: any) {
      console.error("Forgot password error:", err);
      setError(err.message || "Email address not found");
      toast.error(err.message || "Verification failed");
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
      toast.success("Your password has been reset successfully!");
      setForgotMode("none");
      setIsLogin(true);
      setFormData({
        ...formData,
        email: resetEmail,
        password: "",
      });
    } catch (err: any) {
      console.error("Reset password error:", err);
      setError(err.message || "Failed to reset password");
      toast.error(err.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  // Google Login - Triggered by Chooser
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
  const googleAuthUnavailable = !googleClientId;

  const handleGoogleLogin = async (credential: string) => {
    setLoading(true);

    try {
      const data = await api.googleLogin(credential, rememberMe);
      onSuccess(data.user);
      toast.success(`Logged in with Google as ${data.user.name}!`);
    } catch (err: any) {
      console.error("Google login error:", err);
      setError(err.message || "Google login failed. Please try again.");
      toast.error(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  // const googleLogin = useGoogleLogin({
  //   onSuccess: (credentialResponse) => {
  //     if (credentialResponse?.credential) {
  //       handleGoogleLogin(credentialResponse.credential);
  //     } else {
  //       setError("Failed to receive Google credentials");
  //     }
  //   },
  //   onError: () => {
  //     setError("Google authentication failed. Please try again.");
  //   },
  //   flow: "implicit",
  // });

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md overflow-hidden rounded-[34px] bg-[#FAF7F2] shadow-[0_32px_80px_rgba(71,56,38,0.14)] ring-1 ring-[#A8927B]/20">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#9CAF88] via-[#C77956] to-[#A8927B]" />

          <button
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#3A5A40] shadow-sm ring-1 ring-[#A8927B]/30 transition hover:bg-[#F5F0E8]"
          >
            <X size={18} />
          </button>

          <div className="px-8 py-10">
            {forgotMode === "email" && (
              <div>
                <button
                  onClick={() => {
                    setForgotMode("none");
                    setError(null);
                  }}
                  className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#3A5A40] transition hover:text-[#9CAF88] font-['Lora']"
                >
                  <ArrowLeft size={16} />
                  Back to Login
                </button>

                <div className="text-center mb-8">
                  <h2 className="text-3xl font-semibold tracking-tight text-[#3A5A40] mb-2 font-['Cormorant_Garamond']">
                    Recover your account
                  </h2>
                  <p className="text-sm leading-6 text-[#A8927B] font-['Lora']">
                    Enter your registered email address and we&apos;ll help you
                    reset your password.
                  </p>
                </div>

                {error && (
                  <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <form onSubmit={handleForgotEmailSubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#3A5A40] font-['Lora']">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="w-full rounded-[24px] border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none transition focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/30"
                      placeholder="name@example.com"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-[#3A5A40] px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-[#2F4A32] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? "Verifying..." : "Verify Email"}
                  </button>
                </form>
              </div>
            )}

            {forgotMode === "reset" && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-semibold tracking-tight text-[#3A5A40] mb-2 font-['Cormorant_Garamond']">
                    Reset password
                  </h2>
                  <p className="text-sm leading-6 text-[#A8927B] font-['Lora']">
                    Set a secure password for{" "}
                    <span className="font-semibold text-[#3A5A40]">
                      {resetEmail}
                    </span>
                    .
                  </p>
                </div>

                {error && (
                  <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-['Lora']">
                    {error}
                  </div>
                )}

                <form
                  onSubmit={handleResetPasswordSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#3A5A40] font-['Lora']">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-[24px] border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none transition focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/30"
                      placeholder="Minimum 6 characters"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-[24px] bg-[#9CAF88] px-6 py-3 text-base font-semibold text-[#FAF7F2] shadow-lg transition hover:bg-[#7EA474] disabled:cursor-not-allowed disabled:opacity-70 font-['Lora']"
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </button>
                </form>
              </div>
            )}

            {forgotMode === "none" && (
              <>
                <div className="mb-6 text-center">
                  <p className="mb-3 text-xs uppercase tracking-[0.24em] text-[#A8927B] font-['Lora']">
                    Artisan Marketplace
                  </p>
                  <h2 className="text-3xl font-semibold tracking-tight text-[#3A5A40] font-['Cormorant_Garamond']">
                    {isLogin ? "Welcome Back" : "Create your account"}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#A8927B] font-['Lora']">
                    {isLogin
                      ? "Sign in to continue shopping handcrafted products from our artisans."
                      : "Join our community and bring beautiful handmade pieces home."}
                  </p>
                </div>

                <div className="mb-6 grid grid-cols-2 gap-2 rounded-full bg-[#F4E9DD] p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(true);
                      setError(null);
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isLogin
                        ? "bg-white text-[#3A5A40] shadow-sm"
                        : "text-[#A8927B] hover:text-[#3A5A40]"
                    } font-['Lora']`}
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(false);
                      setError(null);
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      !isLogin
                        ? "bg-white text-[#3A5A40] shadow-sm"
                        : "text-[#A8927B] hover:text-[#3A5A40]"
                    } font-['Lora']`}
                  >
                    Sign up
                  </button>
                </div>

                {error && (
                  <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-[#3A5A40] font-['Lora']">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full rounded-[24px] border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none transition focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/30"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-[#3A5A40] font-['Lora']">
                          Account Type
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <label className="flex cursor-pointer items-center gap-3 rounded-[24px] border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] transition hover:border-[#9CAF88] font-['Lora']">
                            <input
                              type="radio"
                              name="isArtisan"
                              checked={!formData.isArtisan}
                              onChange={() =>
                                setFormData({ ...formData, isArtisan: false })
                              }
                              className="h-4 w-4 text-[#3A5A40] focus:ring-[#3A5A40]"
                            />
                            Customer
                          </label>
                          <label className="flex cursor-pointer items-center gap-3 rounded-[24px] border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] transition hover:border-[#9CAF88] font-['Lora']">
                            <input
                              type="radio"
                              name="isArtisan"
                              checked={formData.isArtisan}
                              onChange={() =>
                                setFormData({ ...formData, isArtisan: true })
                              }
                              className="h-4 w-4 text-[#3A5A40] focus:ring-[#3A5A40]"
                            />
                            Artisan
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#3A5A40] font-['Lora']">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded-[24px] border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none transition focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/30"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#3A5A40] font-['Lora']">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full rounded-[24px] border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none transition focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/30"
                    />
                  </div>

                  {isLogin && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm text-[#3A5A40] font-['Lora']">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="h-4 w-4 rounded border border-[#A8927B]/20 text-[#3A5A40] focus:ring-[#3A8927B]"
                        />
                        Remember me
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setForgotMode("email");
                          setError(null);
                        }}
                        className="text-sm font-semibold text-[#C77956] transition hover:text-[#9B4D2A]"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-[24px] bg-[#3A5A40] px-6 py-3 text-base font-semibold text-[#FAF7F2] shadow-lg transition hover:bg-[#2F4A32] disabled:cursor-not-allowed disabled:opacity-70 font-['Lora']"
                  >
                    {loading
                      ? isLogin
                        ? "Signing in..."
                        : "Creating account..."
                      : isLogin
                        ? "Sign in"
                        : "Create account"}
                  </button>
                </form>

                <div className="my-6 flex items-center gap-3 text-sm text-[#A8927B] font-['Lora']">
                  <span className="h-px flex-1 bg-[#A8927B]/20" />
                  or
                  <span className="h-px flex-1 bg-[#A8927B]/20" />
                </div>

                <div className="flex justify-center">
                  {googleAuthUnavailable ? (
                    <button
                      type="button"
                      disabled
                      className="w-full rounded-[24px] border border-[#A8927B]/20 bg-white px-6 py-3 text-sm font-semibold text-[#3A5A40] opacity-70"
                    >
                      Google sign-in unavailable
                    </button>
                  ) : (
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        console.log("GOOGLE RESPONSE", credentialResponse);
                        if (credentialResponse.credential) {
                          handleGoogleLogin(credentialResponse.credential);
                        } else {
                          setError("Failed to receive Google credentials");
                        }
                      }}
                      onError={() => {
                        setError("Google authentication failed");
                      }}
                      useOneTap={false}
                    />
                  )}
                </div>
                {/* {googleAuthUnavailable && (
                  <p className="mt-3 text-center text-xs text-red-600 font-['Lora']">
                    Google OAuth client ID is not configured. Set
                    <code className="mx-1 rounded bg-[#F3F4F6] px-1 py-0.5 text-[11px] text-[#3A3A3A]">
                      VITE_GOOGLE_CLIENT_ID
                    </code>
                    in your frontend .env.
                  </p>
                )} */}

                <p className="mt-6 text-center text-sm text-[#3A5A40] font-['Lora']">
                  {isLogin ? "New here? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="font-semibold text-[#C77956] hover:text-[#9B4D2A]"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
