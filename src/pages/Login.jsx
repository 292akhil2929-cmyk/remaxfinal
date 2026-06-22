import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import usePageSEO from '@/lib/usePageSEO';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Mail, Lock, Loader2, ShieldCheck } from "lucide-react";
import GoogleIcon from "@/components/GoogleIcon";

export default function Login() {
  usePageSEO({ robots: 'noindex, nofollow' });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      const user = await base44.auth.me();
      window.location.href = user?.role === 'admin' ? '/admin/content' : '/access-denied';
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    base44.auth.loginWithProvider("google", "/");
  };

  return (
    <div className="min-h-screen bg-[#0d1b3e] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/20 mb-4">
            <ShieldCheck className="w-8 h-8 text-[#c9a84c]" />
          </div>
          <p className="text-[#c9a84c] font-heading font-semibold text-xs tracking-widest uppercase mb-1">RE/MAX ZAM — Admin Portal</p>
          <h1 className="text-2xl font-display font-black text-white">Welcome Back</h1>
          <p className="text-white/50 font-body text-sm mt-1">Sign in to access the CRM dashboard</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <Button
            variant="outline"
            className="w-full h-12 text-sm font-medium mb-6 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
            onClick={handleGoogle}
          >
            <GoogleIcon className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-3 text-white/40">or sign in with email</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm font-body">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/70 text-xs font-heading tracking-wide uppercase">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" aria-hidden="true" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-white/5 border-white/20 text-white placeholder:text-white/25 focus:border-[#c9a84c]/50 focus:ring-[#c9a84c]/20"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white/70 text-xs font-heading tracking-wide uppercase">Password</Label>
                <Link to="/forgot-password" className="text-xs text-[#c9a84c] hover:text-[#c9a84c]/80">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" aria-hidden="true" />
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 bg-white/5 border-white/20 text-white placeholder:text-white/25 focus:border-[#c9a84c]/50 focus:ring-[#c9a84c]/20"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-12 font-heading font-semibold bg-[#c9a84c] hover:bg-[#c9a84c]/90 text-[#0d1b3e] border-0 mt-2"
              disabled={loading}
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Signing in...</>
              ) : (
                <><LogIn className="w-4 h-4 mr-2" />Sign In</>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs font-body mt-6">
          Authorised personnel only. Unauthorised access is prohibited.
        </p>
      </div>
    </div>
  );
}