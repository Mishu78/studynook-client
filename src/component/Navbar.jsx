"use client";

import { useState, useEffect } from "react";
import { LibraryBig, Menu, X, User, LogOut, LayoutDashboard, Moon, Sun } from "lucide-react";
import LinkComponent from "next/link";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

export function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const rootElement = window.document.documentElement;
    if (isDarkMode) rootElement.classList.add("dark");
    else rootElement.classList.remove("dark");
  }, [isDarkMode]);

  const handleLogOut = async () => {
    await signOut();
    router.push("/");
  };

  // Helper for text colors
  const textColor = scrolled ? "text-white" : "text-slate-700 dark:text-slate-300";
  const hoverColor = scrolled ? "hover:text-emerald-200" : "hover:text-[#1b4332] dark:hover:text-emerald-400";

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
                <LibraryBig className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                <span className={scrolled ? "text-white" : "text-sky-500"}>Study</span>
                <span className={scrolled ? "text-white" : "text-[#1b4332] dark:text-emerald-400"}>Nook</span>
              </span>
            </LinkComponent>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex gap-8 items-center">
            {["Home", "Rooms"].map((label) => (
              <LinkComponent key={label} href={label === "Home" ? "/" : "/rooms"} className={`text-sm font-medium transition-colors ${textColor} ${hoverColor}`}>
                {label}
              </LinkComponent>
            ))}
            {session && (
              <>
                <LinkComponent href="/add-room" className={`text-sm font-medium transition-colors ${textColor} ${hoverColor}`}>Add Room</LinkComponent>
                <LinkComponent href="/my-listings" className={`text-sm font-medium transition-colors ${textColor} ${hoverColor}`}>My Listings</LinkComponent>
                <LinkComponent href="/my-bookings" className={`text-sm font-medium transition-colors ${textColor} ${hoverColor}`}>My Bookings</LinkComponent>
              </>
            )}
          </div>

          {/* User Controls */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 transition-colors ${scrolled ? "text-white" : "text-slate-700 dark:text-slate-300"}`}>
               {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {isPending ? (
              <div className={`w-8 h-8 rounded-full border-2 border-t-transparent ${scrolled ? "border-white" : "border-[#1b4332]"} animate-spin`}></div>
            ) : !session ? (
              <>
                <LinkComponent href="/login" className={`text-sm font-medium ${textColor}`}>Login</LinkComponent>
                <LinkComponent href="/register"><Button className="bg-[#1b4332] dark:bg-emerald-600 text-white">Register</Button></LinkComponent>
              </>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-3 p-1 rounded-full hover:bg-black/10 transition-colors">
                  <Image width={40} height={40} src={session?.user?.image || "/assets/hero-cover.jpg"} alt="Profile" className="w-9 h-9 rounded-full object-cover ring-2 ring-white/20" />
                </button>
                
                <div className="absolute right-0 top-12 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl hidden group-hover:flex flex-col py-2 z-50">
                  <div className="px-4 py-3 border-b dark:border-slate-800">
                    <p className="font-bold text-xs dark:text-white">{session?.user?.name}</p>
                    <p className="text-xs text-slate-500">{session?.user?.email}</p>
                  </div>
                  <LinkComponent href="/dashboard" className="px-4 py-2 text-xs flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-300">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </LinkComponent>
                  <LinkComponent href="/my-listings" className="px-4 py-2 text-xs flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-300">
                    <LibraryBig className="w-4 h-4" /> My Listings
                  </LinkComponent>
                  <button onClick={handleLogOut} className="px-4 py-2 text-xs text-red-500 flex items-center gap-3 w-full hover:bg-red-50 dark:hover:bg-red-950/30">
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}