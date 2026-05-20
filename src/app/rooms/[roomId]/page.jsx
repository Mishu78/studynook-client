import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

// 💡 Correctly structured data lookup with timeout
const fetchRoomDetails = async (roomId) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    const res = await fetch(`${baseUrl}/rooms/${roomId}`, {
      cache: "no-store", 
      signal: AbortSignal.timeout(1200) 
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching room data:", error.message);
    return null;
  }
};

export default async function RoomDetailsPage({ params }) {
  const { roomId } = await params; 
  const room = await fetchRoomDetails(roomId);

  if (!room) {
    return (
      <main className="min-h-[75vh] flex flex-col items-center justify-center bg-[#fcfbf7] px-4">
        <p className="text-slate-600 text-lg font-medium mb-2">
          Study room profile could not be found.
        </p>
        <Link 
          href="/rooms" 
          className="text-sm font-bold text-[#1b4332] underline hover:text-slate-700 transition-colors"
        >
          Return to Catalogue
        </Link>
      </main>
    );
  }

  const { 
    roomName, 
    description, 
    image, 
    floor, 
    capacity, 
    hourlyRate, 
    bookingCount, 
    amenities, 
    ownerEmail, 
    instructor,       
    instructorImage,  
    createdAt 
  } = room;

  const displayDate = createdAt 
    ? new Date(createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "May 18, 2026";

  const user = null; 
  const isLoggedIn = !!user;
  const isOwner = isLoggedIn && user?.email === ownerEmail;

  return (
    <main className="min-h-screen bg-[#fcfbf7] pb-24 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb Line */}
        <div className="mb-6">
          <Link 
            href="/rooms" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <span className="text-sm">←</span> Back
          </Link>
        </div>

        {/* Main Interface Layout Core Splitter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT CONTENT AREA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200/40 shadow-sm bg-slate-100">
              <Image
                src={image || "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200"}
                alt={roomName || "StudyNook Premium Environment"}
                fill
                priority
                sizes="(max-w-1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a2d24] tracking-tight">
                  {roomName}
                </h1>
                
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#e8f4ee] text-[#1b4332] px-2.5 py-1 rounded-md shrink-0">
                  <CalendarDays className="w-3 h-3" />
                  {bookingCount || 0} bookings
                </span>
              </div>
              
              <p className="text-xs font-medium text-slate-400">
                Listed {displayDate}
              </p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {description}
            </p>

            <div className="space-y-3 pt-4">
              <h3 className="font-serif font-bold text-slate-900 text-sm tracking-tight">
                Amenities
              </h3>
              <div className="flex flex-wrap gap-2">
                {amenities?.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-bold bg-[#f6f2e8] text-[#8c6d31] px-3 py-1 rounded-md"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT VIEW PANEL */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-8">
            
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
              <div className="flex justify-between items-baseline border-b border-slate-100 pb-4">
                <span className="text-3xl font-serif font-black text-[#1b4332] flex items-start">
                  <span className="text-xl font-bold mt-0.5">$</span>
                  {hourlyRate}
                </span>
                <span className="text-xs font-medium text-slate-400">per hour</span>
              </div>

              <div className="space-y-3 text-xs text-slate-500 font-semibold">
                <div className="flex items-center justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Floor Location</span>
                  <span className="text-slate-800">{floor || "3rd Floor"}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Capacity Allowance</span>
                  <span className="text-slate-800">Up to {capacity} people</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-400 font-medium">Historical Bookings</span>
                  <span className="text-slate-800">{bookingCount || 0} total bookings</span>
                </div>
              </div>

              {isLoggedIn ? (
                <button
                  type="button"
                  className="w-full bg-[#1b4332] hover:bg-[#153427] text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CalendarDays className="w-4 h-4" /> Book Now
                </button>
              ) : (
                <Link href="/login" className="block w-full">
                  <button
                    type="button"
                    className="w-full bg-[#1b4332] hover:bg-[#153427] text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CalendarDays className="w-4 h-4" /> Login to Book
                  </button>
                </Link>
              )}
            </div>

            {/* LISTED BY WIDGET */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Listed By
              </h4>
              
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <Image
                    src={instructorImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"}
                    alt={instructor || "Workspace Asset Creator"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-slate-800 tracking-tight line-clamp-1">
                    {instructor || "Maya Chen"}
                  </span>
                  <span className="text-xs text-slate-400 truncate font-normal">
                    {ownerEmail || "maya@studynook.demo"}
                  </span>
                </div>
              </div>
            </div>

            {/* OWNER privilegs Dashboard */}
            {isOwner && (
              <div className="bg-amber-50/40 border border-amber-200/70 rounded-2xl p-4 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <h5 className="text-[11px] font-bold text-amber-900 uppercase tracking-wide">Owner Toolkit</h5>
                  <p className="text-[11px] text-amber-700 font-medium">Asset editing privileges are active.</p>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/rooms/${roomId}/edit`}>
                    <button className="bg-white border border-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-slate-50 transition-colors cursor-pointer">
                      Edit
                    </button>
                  </Link>
                  <button className="bg-rose-50 text-rose-600 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-rose-100 transition-colors cursor-pointer">
                    Delete
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
        
      </div>
    </main>
  );
}