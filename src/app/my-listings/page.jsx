import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { MapPin, Users, DollarSign, Calendar } from "lucide-react";
import RoomActionButtons from "@/app/rooms/[roomId]/RoomActionButtons";

// Fetch rooms securely from the backend API
const fetchMyListings = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    const res = await fetch(`${baseUrl}/rooms`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching listings deck:", error);
    return [];
  }
};

export default async function MyListingsPage() {
  const incomingHeaders = await headers();
  const cookieHeaders = incomingHeaders.get("cookie") || "";

  // Capture current user session metadata contexts safely
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: { cookie: cookieHeaders },
    });
  } catch (err) {
    console.error("Session matching bypassed:", err);
  }

  const allRooms = await fetchMyListings();
  const userId = session?.user?.id;

  // Filter out lists to only show rooms that belong to the logged-in owner
  const myListings = allRooms.filter((room) => room.ownerId === userId);

  return (
    <main className="min-h-screen bg-[#fcfbf7] py-12 text-slate-800 antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 flex justify-between items-end border-b border-slate-200/50 pb-5">
          <div className="text-left">
            <h1 className="text-3xl font-serif font-bold text-[#1a2d24] tracking-tight">My Managed Rooms</h1>
            <p className="text-xs text-slate-400 font-medium mt-1">Manage, update properties, or delete room listings under your ownership profile.</p>
          </div>
          <Link href="/add-room">
            <button className="bg-[#1b4332] hover:bg-[#143225] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer">
              + Add New Room
            </button>
          </Link>
        </div>

        {myListings.length === 0 ? (
          <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-[24px]">
            <p className="text-slate-500 text-sm font-medium mb-3">You haven't posted any room listings yet.</p>
            <Link href="/add-room" className="text-xs font-bold text-[#1b4332] underline hover:text-[#143225]">
              Create your first space setup allocation card
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myListings.map((room) => (
              <div 
                key={room._id} 
                className="bg-white border border-slate-200/80 rounded-[24px] overflow-hidden shadow-xs flex flex-col group hover:shadow-md transition-all duration-200"
              >
                {/* Visual Header Image Section */}
                <div className="relative h-48 w-full bg-slate-100 shrink-0 border-b border-slate-100">
                  <Image
                    src={room.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600"}
                    alt={room.roomName}
                    fill
                    sizes="(max-w-768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-xs text-slate-700 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-800" /> {room.bookingCount || 0} Bookings
                  </div>
                </div>

                {/* Info Text Breakdown Area */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-serif font-bold text-slate-900 text-lg leading-snug truncate">{room.roomName}</h3>
                      <span className="font-serif font-black text-emerald-800 text-base shrink-0 flex items-center">
                        <DollarSign className="w-3.5 h-3.5 -mr-0.5" />{room.hourlyRate}<span className="text-[10px] font-normal text-slate-400 font-sans">/hr</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed min-h-[36px]">
                      {room.description}
                    </p>

                    {/* Metadata Badges */}
                    <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-400 pt-1">
                      <span className="flex items-center gap-1 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {room.floor}
                      </span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <Users className="w-3.5 h-3.5 text-slate-400" /> Max {room.capacity}
                      </span>
                    </div>
                  </div>

                  {/* Operational Control Dashboard Toolkit */}
                  <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <Link 
                      href={`/rooms/${room._id}`}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-900 transition-colors"
                    >
                      View Full Details →
                    </Link>
                    
                    {/* Inject control layout containing functional Edit / Delete modal logic loops */}
                    <RoomActionButtons roomId={room._id} roomData={room} />
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}