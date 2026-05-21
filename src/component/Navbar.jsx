"use client";

import { useState, useEffect } from "react";
import { BookOpen, Menu, X, User, LogOut, LayoutDashboard, Moon, Sun } from "lucide-react";
import LinkComponent from "next/link";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// 💡 Import the named hooks directly from your auth-client file!
import { useSession, signOut } from "@/lib/auth-client";

export function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  // 💡 Use the hook directly without the "authClient." prefix
  const { data: session, isPending } = useSession();

  // Handle scroll listener effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Synchronize dark/light layout node selectors
  useEffect(() => {
    const rootElement = window.document.documentElement;
    if (isDarkMode) {
      rootElement.classList.add("dark");
    } else {
      rootElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleLogOut = async () => {
    // 💡 Use the destructured signOut function directly
    await signOut();
    router.push("/");
  };

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-[#163525]/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md py-2" 
        : "bg-[#fcfbf7] dark:bg-slate-950 py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex items-center">
            <LinkComponent href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-[#1b4332] dark:bg-emerald-600 rounded-lg text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[#1b4332] dark:text-emerald-400">
                StudyNook
              </span>
            </LinkComponent>
          </div>

          {/* Core Navigation Links */}
          <div className="hidden md:flex gap-8 items-center">
            <LinkComponent href="/" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#1b4332] dark:hover:text-emerald-400 transition-colors">Home</LinkComponent>
            <LinkComponent href="/rooms" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#1b4332] dark:hover:text-emerald-400 transition-colors">Rooms</LinkComponent>
            
            {/* Authenticated Links */}
            {session && (
              <>
                <LinkComponent href="/add-room" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#1b4332] dark:hover:text-emerald-400 transition-colors">Add Room</LinkComponent>
                <LinkComponent href="/my-listings" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#1b4332] dark:hover:text-emerald-400 transition-colors">My Listings</LinkComponent>
                <LinkComponent href="/my-bookings" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#1b4332] dark:hover:text-emerald-400 transition-colors">My Bookings</LinkComponent>
              </>
            )}
          </div>

          {/* User Controls & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mr-2 transition-colors p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {isPending ? (
              <div className="w-8 h-8 rounded-full border-2 border-[#1b4332] dark:border-emerald-500 border-t-transparent animate-spin"></div>
            ) : !session ? (
              <>
                <LinkComponent href="/login" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#1b4332] transition-colors">Login</LinkComponent>
                <LinkComponent href="/register">
                  <Button className="font-medium bg-[#1b4332] dark:bg-emerald-600 text-white rounded-lg px-5 py-2 text-sm">
                    Register
                  </Button>
                </LinkComponent>
              </>
            ) : (
              /* User Profile Widget */
              <div className="relative group">
                <button className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Image
                    width={40}
                    height={40}
                    src={session?.user?.image || "/assets/hero-cover.jpg"}
                    alt="User avatar profile picture"
                    priority
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-[#1b4332]/10 dark:ring-emerald-500/20"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-bold truncate max-w-[100px] text-slate-800 dark:text-slate-200">
                      {session?.user?.name}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Student</p>
                  </div>
                </button>
                
                {/* Dropdown Box Menu */}
                <div className="absolute right-0 top-12 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl hidden group-hover:flex flex-col py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-bold text-xs dark:text-slate-200">Welcome back!</p>
                    <p className="text-xs truncate text-slate-500 dark:text-slate-400">{session?.user?.email}</p>
                  </div>
                  <LinkComponent href="/dashboard" className="px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </LinkComponent>
                  <LinkComponent href="/settings" className="px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors">
                    <User className="w-4 h-4" /> Settings
                  </LinkComponent>
                  <button
                    onClick={handleLogOut}
                    className="px-4 py-2 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-3 transition-colors text-left w-full"
                  >
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Actions */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="text-gray-500 p-2"
              aria-label="Toggle Mobile Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-700 dark:text-slate-300">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 space-y-2 bg-[#fcfbf7] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <LinkComponent href="/" className="block px-4 py-2 text-sm font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">Home</LinkComponent>
          <LinkComponent href="/rooms" className="block px-4 py-2 text-sm font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">Rooms</LinkComponent>
          
          {session && (
            <>
              <LinkComponent href="/add-room" className="block px-4 py-2 text-sm font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">Add Room</LinkComponent>
              <LinkComponent href="/my-listings" className="block px-4 py-2 text-sm font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">My Listings</LinkComponent>
              <LinkComponent href="/my-bookings" className="block px-4 py-2 text-sm font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">My Bookings</LinkComponent>
              <button 
                onClick={handleLogOut} 
                className="w-full text-left block px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg"
              >
                Log Out
              </button>
            </>
          )}

          {!session && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <LinkComponent href="/login" className="w-full">
                  <Button variant="bordered" className="w-full rounded-lg border-slate-300 text-slate-700 dark:text-slate-300">Login</Button>
                </LinkComponent>
                <LinkComponent href="/register" className="w-full">
                  <Button className="w-full rounded-lg bg-[#1b4332] dark:bg-emerald-600 text-white">Register</Button>
                </LinkComponent>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}