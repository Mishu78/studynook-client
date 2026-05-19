"use client";

import { useState, useEffect } from "react";
import { BookOpen, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";
import Image from "next/image";
// Commented out Better Auth imports for design preview
// import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  /* ----------------------------------------------------
     MOCK AUTH STATE FOR DESIGN PREVIEW
     Toggle 'isLoggedIn' between true and false to inspect 
     the different navbar views.
  ---------------------------------------------------- */
  const isLoggedIn = true; // Set to false to see the Login/Register buttons
  const isPending = false;
  const session = isLoggedIn 
    ? {
        user: {
          name: "Mishu",
          email: "mishu@example.com",
          image: "",
        },
      }
    : null;

  // Actual Better Auth hook call commented out
  // const { data: session, isPending } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = async () => {
    // Commented out Better Auth functionality
    // await signOut();
    console.log("Mock Log Out Clicked");
    router.push("/");
  };

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-[#163525]/90 backdrop-blur-md shadow-md py-2" : "bg-[#fcfbf7] py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-[#1b4332] rounded-lg text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[#1b4332]">
                StudyNook
              </span>
            </Link>
          </div>

          {/* Core Navigation Links */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-sm font-medium text-slate-700 hover:text-[#1b4332] transition-colors">Home</Link>
            <Link href="/rooms" className="text-sm font-medium text-slate-700 hover:text-[#1b4332] transition-colors">Rooms</Link>
          </div>

          {/* Authentication State */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-700 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            </button>

            {!isPending && !session ? (
              <>
                <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-[#1b4332] transition-colors">Login</Link>
                <Link href="/register">
                  <Button className="font-medium bg-[#1b4332] text-white rounded-lg px-5 py-2 text-sm">
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-3 p-1 rounded-full hover:bg-muted transition-colors">
                  <Image
                    width={40}
                    height={40}
                    src={session?.user?.image || "/public/assets/hero-cover.jpg"}
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-[#1b4332]/10"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-bold truncate max-w-25 text-slate-800">{session?.user?.name}</p>
                    <p className="text-[10px] text-slate-500">Student</p>
                  </div>
                </button>
                <div className="absolute right-0 top-12 w-56 bg-white border border-slate-200 rounded-xl shadow-xl hidden group-hover:flex flex-col py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="font-bold text-xs">Welcome back!</p>
                    <p className="text-xs truncate text-slate-500">{session?.user?.email}</p>
                  </div>
                  <Link href="/dashboard" className="px-4 py-2 text-xs hover:bg-slate-50 flex items-center gap-3 transition-colors">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <Link href="/settings" className="px-4 py-2 text-xs hover:bg-slate-50 flex items-center gap-3 transition-colors">
                    <User className="w-4 h-4" /> Settings
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="px-4 py-2 text-xs text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors text-left w-full">
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-700">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 space-y-2 bg-[#fcfbf7] border-b border-slate-200">
          <Link href="/" className="block px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 rounded-lg">Home</Link>
          <Link href="/rooms" className="block px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 rounded-lg">Rooms</Link>
          <div className="pt-4 border-t border-slate-200 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Link href="/login" className="w-full">
                <Button variant="bordered" className="w-full rounded-lg border-slate-300 text-slate-700">Login</Button>
              </Link>
              <Link href="/register" className="w-full">
                <Button className="w-full rounded-lg bg-[#1b4332] text-white">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}