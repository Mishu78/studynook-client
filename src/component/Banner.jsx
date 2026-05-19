"use client";
import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] bg-[#1e4620] bg-radial-[at_top_right] from-[#386b52] via-[#1e4620] to-[#163525] flex items-center py-16 md:py-24">
      {/* Subtle Grid Dot Pattern Background overlay overlaying the green */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Text and Analytics Column */}
          <div className="space-y-6 text-left">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full border border-white/10 text-white/90 text-xs font-medium">
              <span className="w-1 h-1 bg-white/80 rounded-full animate-pulse"></span>
              Quiet rooms, on demand
            </div>
            
            {/* Typography with decorative Serif styling for headers */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight font-serif leading-[1.15]">
              Find Your Perfect <br />
              <span className="text-[#e99c4c] italic font-serif font-medium">Study Room</span>
            </h1>
            
            <p className="text-base md:text-lg text-white/80 max-w-xl font-light leading-relaxed">
              Browse and book quiet, private study rooms in your library by the hour. 
              List your own room and earn — without the scheduling headaches.
            </p>
            
            {/* Call to Actions */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                href="/rooms"
                className="h-12 px-6 text-sm font-semibold bg-[#e99c4c] text-white rounded-xl shadow-lg shadow-black/10 hover:bg-[#d68737] transition-all flex items-center gap-2 group"
              >
                Explore Rooms <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              
              <Button
                variant="bordered"
                className="h-12 px-6 text-sm font-medium border-white/20 text-white rounded-xl hover:bg-white/5 transition-all"
              >
                Get Started
              </Button>
            </div>

            {/* Platform Metrics Segment */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10 max-w-md">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white font-serif">120+</p>
                <p className="text-[11px] text-white/60 uppercase tracking-wider mt-0.5">Rooms listed</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white font-serif">8K</p>
                <p className="text-[11px] text-white/60 uppercase tracking-wider mt-0.5">Hours booked</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white font-serif flex items-center gap-1">
                  4.9<span className="text-[#e99c4c] text-xl">★</span>
                </p>
                <p className="text-[11px] text-white/60 uppercase tracking-wider mt-0.5">Avg. rating</p>
              </div>
            </div>
          </div>

          {/* Right Image Feature Container */}
          <div className="relative w-full flex justify-center lg:justify-end">
            {/* Highlight ambient glow behind image frame */}
            <div className="absolute -top-12 -right-12 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative w-full max-w-[440px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/5">
              <Image
                src="/public/assets/hero-cover.jpg" 
                alt="Library bookshelf study layout"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;