"use client";

import { Button } from "@heroui/react";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden bg-gradient-to-br from-sky-50 via-emerald-50 to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-100 dark:bg-sky-900/30 rounded-full border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Your space, your rules
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                Focus Deeper in 
                <span className="block text-[#1b4332] dark:text-emerald-400">Quiet Comfort</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
                Discover the perfect environment for deep work. Connect with curated study nooks and private workspaces instantly.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                as="a"
                href="/rooms"
                className="h-12 px-8 bg-[#1b4332] dark:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-900/20 hover:scale-105 transition-transform duration-200 flex items-center gap-2 font-semibold"
              >
                Find a Nook <ArrowRight className="w-4 h-4" />
              </Button>
              
              <Button
                variant="bordered"
                className="h-12 px-8 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all font-semibold"
              >
                Learn More
              </Button>
            </div>

            {/* Metrics */}
            <div className="flex gap-12 pt-8 border-t border-slate-200/50 dark:border-slate-800">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">500+</h3>
                <p className="text-sm text-slate-500">Verified Spaces</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">4.9/5</h3>
                <p className="text-sm text-slate-500">User Rating</p>
              </div>
            </div>
          </div>

          {/* Right Image Container */}
          <div className="relative">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-sky-200/50 dark:shadow-none border border-white/50">
             <Image
          src="/assets/booknook-banner-3.jpg" 
          alt="Modern quiet study workspace"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover hover:scale-105 transition-transform duration-700"
          />
            </div>
            {/* Ambient decorative glow */}
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-amber-200/50 rounded-full blur-3xl -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;