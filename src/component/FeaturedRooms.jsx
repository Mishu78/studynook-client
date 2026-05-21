import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FeaturedRoomCard } from "./FeaturedRoomCard";

const fetchFeaturedRooms = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    const res = await fetch(`${baseUrl}/featured-rooms`, {
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error("Failed to fetch featured rooms");
    return await res.json();
  } catch (error) {
    console.error("Error fetching featured rooms:", error.message);
    return [];
  }
};

export default async function FeaturedRooms() {
  const rooms = await fetchFeaturedRooms();

  return (
    <section className="py-24 bg-[#fcfbf7] dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="space-y-3">
            <span className="text-[#1b4332] dark:text-emerald-400 font-bold uppercase tracking-[0.2em] text-[10px]">
              Hand-Picked Selection
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
              Featured Study Rooms
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
              Discover premium, quiet spaces handpicked for your deep work sessions.
            </p>
          </div>
          
          <Link href="/rooms">
            <Button
              className="h-12 px-8 bg-[#1b4332] dark:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-900/20 hover:scale-105 transition-all font-semibold"
            >
              View all rooms <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms && rooms.length > 0 ? (
            rooms.map((room) => (
              <FeaturedRoomCard key={room._id} room={room} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
              <p className="text-slate-400">No featured spaces active right now.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}