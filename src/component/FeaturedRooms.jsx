import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import FeaturedRoomCard from "./FeaturedRoomCard";

const fetchFeaturedRooms = async () => {
  try {
    // 💡 Point this to /featured-rooms instead of the text-based root / route
   const res = await fetch("http://localhost:5000/featured-rooms", {
  next: { revalidate: 0 }, // 
});
    
    if (!res.ok) throw new Error("Failed to fetch featured rooms");
    const data = await res.json();
    
    return data; 
  } catch (error) {
    console.error("Error fetching featured rooms:", error);
    return [];
  }
};

const FeaturedRooms = async () => {
  const rooms = await fetchFeaturedRooms();

  return (
    <section className="py-24 bg-[#fcfbf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Typography Title Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="space-y-3">
            <h2 className="text-[#1b4332] font-serif font-bold uppercase tracking-wider text-xs">
              Hand-Picked Selection
            </h2>
            <h3 className="text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Featured Study Rooms
            </h3>
            <p className="text-sm text-slate-500 max-w-xl">
              Handpicked premium rooms recently added to StudyNook. Designed to help you discover the perfect environment for deep focus and productivity.
            </p>
          </div>
          
          <Link href="/rooms">
            <Button
              variant="flat"
              className="bg-[#1b4332]/10 hover:bg-[#1b4332]/20 text-[#1b4332] font-semibold rounded-full px-5 py-2 group transition-colors text-xs"
            >
              View all rooms{" "}
              <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Responsive Grid View for 4 Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms?.map((room) => (
            <FeaturedRoomCard key={room._id} room={room} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default FeaturedRooms;