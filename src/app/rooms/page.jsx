import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, RotateCcw, Search, MapPin, Users, CalendarDays, Sparkles } from "lucide-react";
import ClientRoomsWorkspace from "./ClientRoomsWorkspace";

// 💡 OPTIMIZED: Rapid-fail mechanism prevents connection-hang lag
async function getRoomsData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  
  const endpoints = [
    `${baseUrl}/rooms`,
    "http://localhost:8080/rooms",
    "http://127.0.0.1:8080/rooms"
  ];

  // Eliminate duplicate URLs if baseUrl is already one of the fallbacks
  const uniqueEndpoints = [...new Set(endpoints)];

  for (const url of uniqueEndpoints) {
    try {
      const res = await fetch(url, { 
        cache: "no-store",
        signal: AbortSignal.timeout(1200) // ⚡ Balanced stall cutoff
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      // Instantly jump to the next endpoint if one fails
    }
  }
  return []; 
}

export default async function AllRoomsPage() {
  const serverRooms = await getRoomsData();

  // Compute stats for the summary strip
  const activeCount = serverRooms.length;
  const premiumCount = serverRooms.filter(r => r.hourlyRate >= 15).length;
  const multiFloorCount = [...new Set(serverRooms.map(r => r.floor))].length;

  return (
    <main className="min-h-screen bg-[#fcfbf7] pb-24 text-slate-800 antialiased">
      
      {/* ========================================================= */}
      {/* CATALOG HEADER / HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-16 md:py-20 mb-12 rounded-b-[40px] shadow-xs">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold text-emerald-400 mb-4 tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" /> StudyNook Spaces
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4 max-w-2xl mx-auto">
            Find Your Ideal Academic Basecamp
          </h1>
          <p className="text-sm md:text-base text-slate-300 font-medium max-w-lg mx-auto leading-relaxed">
            Browse our full campus workspace ecosystem. Filter dynamically by infrastructure, capacity constraints, or location indices.
          </p>

          {/* Quick Stats Metric Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mt-10 pt-8 border-t border-slate-800 max-w-xl mx-auto">
            <div className="text-center">
              <p className="text-2xl font-serif font-bold text-white">{activeCount}</p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-0.5">Total Hubs</p>
            </div>
            <div className="w-px h-8 bg-slate-800 hidden sm:block"></div>
            <div className="text-center">
              <p className="text-2xl font-serif font-bold text-emerald-400">{multiFloorCount}</p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-0.5">Floors Serviced</p>
            </div>
            <div className="w-px h-8 bg-slate-800 hidden sm:block"></div>
            <div className="text-center">
              <p className="text-2xl font-serif font-bold text-white">{premiumCount}</p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-0.5">Premium Suites</p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* FILTERABLE INTERACTION WORKSPACE LAYER */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Client workspace containing card rendering grids & layout search metrics */}
        <ClientRoomsWorkspace initialRooms={serverRooms} />

      </section>
    </main>
  );
}