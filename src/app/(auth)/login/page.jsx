"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@heroui/react";
import { signIn, useSession } from "@/lib/auth-client"; 

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, isPending } = useSession(); // 💡 Get active session state
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const from = searchParams.get("from") || "/";

  // 💡 If a session is already active, auto-redirect away from the login page!
  useEffect(() => {
    if (session) {
      router.push(from);
      router.refresh();
    }
  }, [session, router, from]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const { data, error } = await signIn.email({
        email: email.trim().toLowerCase(), // 💡 Clean trailing spaces or casing differences
        password: password,
        callbackURL: from, 
      });

      if (error) {
        setLoading(false);
        setErrorMessage(error.message || "Invalid email or password.");
      } else {
        setLoading(false);
        router.push(from);
        router.refresh(); 
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage("An unexpected server connection error occurred.");
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage("");
    await signIn.social({
      provider: "google",
      callbackURL: "/", // 💡 Google auth logs in directly and takes user Home
    });
  };

  // Prevent UI flashing while checking session status
  if (isPending) {
    return (
      <div className="min-h-[90vh] bg-[#fcfbf7] flex items-center justify-center">
        <p className="text-xs text-slate-500 font-medium">Loading session settings...</p>
      </div>
    );
  }

  return (
    <main className="min-h-[90vh] bg-[#fcfbf7] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[440px] bg-white border border-slate-200/60 rounded-[28px] p-8 md:p-10 shadow-xs flex flex-col items-center">
        
        <div className="w-12 h-12 bg-[#1b4332] rounded-xl flex items-center justify-center mb-5 text-white shrink-0">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>

        <h1 className="text-[26px] font-serif font-bold text-slate-900 tracking-tight text-center mb-1">
          Login to StudyNook
        </h1>
        <p className="text-xs text-slate-500 font-medium text-center mb-8">
          Welcome back. Pick up where you left off.
        </p>

        {errorMessage && (
          <div className="w-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold px-4 py-2.5 rounded-xl mb-4 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="w-full space-y-5">
          <div className="w-full flex flex-col gap-1.5 items-start">
            <label className="text-xs font-bold text-slate-700 px-0.5">Email</label>
            <input
              type="email"
              required
              placeholder="enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50/40 border border-slate-200/80 hover:border-slate-300 focus:border-[#1b4332] focus:outline-none h-11 px-4 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 transition-colors"
            />
          </div>

          <div className="w-full flex flex-col gap-1.5 items-start">
            <label className="text-xs font-bold text-slate-700 px-0.5">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50/40 border border-slate-200/80 hover:border-slate-300 focus:border-[#1b4332] focus:outline-none h-11 px-4 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 transition-colors"
            />
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-[#1b4332] hover:bg-[#143225] text-white font-bold h-11 rounded-xl text-xs mt-2"
          >
            Login
          </Button>
        </form>

        <div className="w-full relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <span className="relative bg-white px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">OR</span>
        </div>

        <Button
          variant="bordered"
          onClick={handleGoogleLogin}
          className="w-full border border-slate-200 hover:border-slate-300 font-bold text-slate-700 bg-white hover:bg-slate-50 h-11 rounded-xl text-xs gap-2"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.54 6.16-4.54z" />
          </svg>
          Continue with Google
        </Button>

        <p className="text-xs text-slate-500 font-medium mt-6">
          Don’t have an account?{" "}
          <Link href="/register" className="text-[#1b4332] font-bold hover:underline">Register</Link>
        </p>

      </div>
    </main>
  );
}