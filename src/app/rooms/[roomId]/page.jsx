import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { CalendarDays } from "lucide-react";
import { auth } from "@/lib/auth"; 
import RoomActionButtons from "./RoomActionButtons";
import BookingWidget from "./BookingWidget"; 

// Pass session cookies to prevent validation middleware loops
const fetchRoomDetails = async (roomId, cookieHeaders) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    
    if (!roomId || roomId === "[object Object]") return null;

    const res = await fetch(`${baseUrl}/rooms/${roomId}`, {
      cache: "no-store",
      headers: {
        "Cookie": cookieHeaders || "",
      }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching room data:", error.message);
    return null;
  }
};

export default async function RoomDetailsPage({ params }) {
  // 1. Resolve params first
  const resolvedParams = await params;
  const roomId = resolvedParams.roomId; 

  // 2. Safely capture headers
  const incomingHeaders = await headers();
  const cookieHeaders = incomingHeaders.get("cookie") || "";

  // 3. Get session safely without triggering an internal network loop deadlock
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: {
        cookie: cookieHeaders 
      },
    });
  } catch (authError) {
    console.error("Auth session fetch bypassed/failed:", authError.message);
  }

  // 4. Fetch the room details
  const room = await fetchRoomDetails(roomId, cookieHeaders);

  if (!room) {
    return (
      <main className="min-h-[75vh] flex flex-col items-center justify-center bg-[#fcfbf7] px-4">
        <p className="text-slate-600 text-sm font-medium mb-2">
          Study room profile could not be found or ID parameter mismatched.
        </p>
        <Link href="/rooms" className="text-xs font-bold text-[#1b4332] underline">
          Return to Catalogue
        </Link>
      </main>
    );
  }

  const { 
    roomName, description, image, floor, capacity, hourlyRate, 
    bookingCount, amenities, ownerEmail, ownerId, instructor, instructorImage, createdAt 
  } = room;

  const displayDate = createdAt 
    ? new Date(createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "May 21, 2026";

  const isLoggedIn = !!session?.user;
  const isOwner = isLoggedIn && session.user.id === ownerId;

  return (
    <main className="min-h-screen bg-[#fcfbf7] pb-24 pt-8 text-slate-800 antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-6">
          <Link href="/rooms" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900">
            <span className="text-sm">←</span> Back to Catalogue
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT CONTENT AREA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200/40 bg-slate-100">
              <Image
                src={image || "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200"}
                alt={roomName || "Study Room Layout"}
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a2d24] tracking-tight">{roomName}</h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#e8f4ee] text-[#1b4332] px-2.5 py-1 rounded-md shrink-0">
                  <CalendarDays className="w-3 h-3" /> {bookingCount || 0} bookings
                </span>
              </div>
              <p className="text-xs font-medium text-slate-400">Listed {displayDate}</p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">{description}</p>

            <div className="space-y-3 pt-4">
              <h3 className="font-serif font-bold text-slate-900 text-sm">Amenities Included</h3>
              <div className="flex flex-wrap gap-2">
                {amenities?.map((amenity, idx) => (
                  <span key={idx} className="text-[11px] font-bold bg-[#f6f2e8] text-[#8c6d31] px-3 py-1 rounded-md">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT VIEW PANEL */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-8">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-6">
              <div className="flex justify-between items-baseline border-b border-slate-100 pb-4">
                <span className="text-3xl font-serif font-black text-[#1b4332] flex items-start">
                  <span className="text-xl font-bold mt-0.5">$</span>{hourlyRate}
                </span>
                <span className="text-xs font-medium text-slate-400">per hour</span>
              </div>

              <div className="space-y-3 text-xs text-slate-500 font-semibold">
                <div className="flex items-center justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Floor Location</span>
                  <span className="text-slate-800">{floor || "Ground Floor"}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Capacity Allowance</span>
                  <span className="text-slate-800">Up to {capacity} people</span>
                </div>
              </div>

              {/* Dynamic Modal Widget Trigger Injection */}
              <BookingWidget room={room} userSession={session?.user || null} />
            </div>

            {/* SPACE COORDINATOR */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Space Coordinator</h4>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0">
                  <Image src={instructorImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"} alt="Coordinator" fill className="object-cover" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-slate-800 truncate">{instructor || "Aisha Rahman"}</span>
                  <span className="text-xs text-slate-400 truncate">{ownerEmail}</span>
                </div>
              </div>
            </div>

            {isOwner && (
              <div className="bg-amber-50/40 border border-amber-200/70 rounded-2xl p-4 flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <h5 className="text-[11px] font-bold text-amber-900 uppercase">Owner Toolkit</h5>
                  <p className="text-[11px] text-amber-700">Administrative access authorized.</p>
                </div>
                {/* ✅ Added roomData prop mapping to pre-fill input states inside the edit modal */}
                <RoomActionButtons roomId={roomId} roomData={room} />
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}