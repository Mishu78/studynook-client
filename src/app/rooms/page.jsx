import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, RotateCcw, Search, MapPin, Users, CalendarDays } from "lucide-react";
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
        signal: AbortSignal.timeout(1000) // ⚡ Cut off stalls after 1 second max
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

  return (
    <main className="min-h-screen bg-[#fcfbf7] py-12 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10 justify-self-center text-center">
          <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight mb-2">
            All Study Rooms
          </h1>
          <p className="text-sm text-slate-500">
            Browse the full catalog. Filter by amenity, price, or search by name.
          </p>
        </div>

        {/* Workspace */}
        <ClientRoomsWorkspace initialRooms={serverRooms} />

      </div>
    </main>
  );
}