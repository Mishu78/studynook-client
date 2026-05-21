"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { signUp, signIn } from "@/lib/auth-client"; 

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    setSuccessMessage("");

    // 💡 Assignment Requirements: Local Inline Input Validation Checkpoints
    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setValidationError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setValidationError("Password must contain at least one lowercase letter.");
      return;
    }

    setLoading(true);

    // 💡 Added the trailing options payload config object to explicitly bypass immediate login session generation
    const { data, error } = await signUp.email(
      {
        email: email.trim().toLowerCase(),
        password,
        name: name.trim(),
        image: photoUrl.trim(), 
      },
      {
        autoSignIn: false // 👈 This strictly blocks Better-Auth from auto-logging them in!
      }
    );

    if (error) {
      setLoading(false);
      setValidationError(error.message || "Registration failed. Please try again.");
    } else {
      setLoading(false);
      setSuccessMessage("Registration successful! Please login.");
      
      // Clear out entry states cleanly so the login form isn't prefilled with a confusing active layout context
      setName("");
      setEmail("");
      setPhotoUrl("");
      setPassword("");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  const handleGoogleRegistration = async () => {
    setValidationError("");
    // On Google registration: user is logged in directly and redirected to Home.
    await signIn.social({
      provider: "google",
      callbackURL: "/", 
    });
  };

  return (
    <main className="min-h-[95vh] bg-[#fcfbf7] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[440px] bg-white border border-slate-200/60 rounded-[28px] p-8 md:p-10 shadow-xs flex flex-col items-center">
        
        <div className="w-12 h-12 bg-[#1b4332] rounded-xl flex items-center justify-center mb-5 text-white shrink-0">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>

        <h1 className="text-[26px] font-serif font-bold text-slate-900 tracking-tight text-center mb-1">
          Create Account
        </h1>
        <p className="text-xs text-slate-500 font-medium text-center mb-6">
          Join StudyNook to manage allocations and reservations.
        </p>

        {validationError && (
          <div className="w-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold px-4 py-2.5 rounded-xl mb-4 text-center">
            {validationError}
          </div>
        )}

        {successMessage && (
          <div className="w-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold px-4 py-2.5 rounded-xl mb-4 text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleRegisterSubmit} className="w-full space-y-4.5">
          
          {/* Name Field */}
          <div className="w-full flex flex-col gap-1.5 items-start">
            <label className="text-xs font-bold text-slate-700 px-0.5">Name</label>
            <input
              type="text"
              required
              placeholder="your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50/40 border border-slate-200/80 hover:border-slate-300 focus:border-[#1b4332] focus:outline-none h-11 px-4 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 transition-colors"
            />
          </div>

          {/* Email Field */}
          <div className="w-full flex flex-col gap-1.5 items-start">
            <label className="text-xs font-bold text-slate-700 px-0.5">Email</label>
            <input
              type="email"
              required
              placeholder="example@ulab.edu.bd"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50/40 border border-slate-200/80 hover:border-slate-300 focus:border-[#1b4332] focus:outline-none h-11 px-4 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 transition-colors"
            />
          </div>

          {/* Photo URL Field */}
          <div className="w-full flex flex-col gap-1.5 items-start">
            <label className="text-xs font-bold text-slate-700 px-0.5">Photo URL</label>
            <input
              type="url"
              required
              placeholder="https://example.com/avatar.jpg"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full bg-slate-50/40 border border-slate-200/80 hover:border-slate-300 focus:border-[#1b4332] focus:outline-none h-11 px-4 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 transition-colors"
            />
          </div>

          {/* Password Field */}
          <div className="w-full flex flex-col gap-1.5 items-start">
            <label className="text-xs font-bold text-slate-700 px-0.5">Password</label>
            <input
              type="password"
              required
              placeholder="Min 6 chars, uppercase & lowercase"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50/40 border border-slate-200/80 hover:border-slate-300 focus:border-[#1b4332] focus:outline-none h-11 px-4 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 transition-colors"
            />
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-[#1b4332] hover:bg-[#143225] text-white font-bold h-11 rounded-xl text-xs mt-3 transition-transform active:scale-[0.99]"
          >
            Register
          </Button>
        </form>

        <div className="w-full relative flex items-center justify-center my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <span className="relative bg-white px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            OR
          </span>
        </div>

        <Button
          variant="bordered"
          onClick={handleGoogleRegistration}
          className="w-full border border-slate-200 hover:border-slate-300 font-bold text-slate-700 bg-white hover:bg-slate-50 h-11 rounded-xl text-xs gap-2 transition-all"
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
          Already have an account?{" "}
          <Link href="/login" className="text-[#1b4332] font-bold hover:underline">
            Login
          </Link>
        </p>

      </div>
    </main>
  );
}