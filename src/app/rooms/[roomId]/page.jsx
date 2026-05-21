import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { CheckCircle2, MapPin, Users } from "lucide-react";
import BookingForm from "@/component/BookingForm"; // 🔌 Import your client handler here

// Fetch room records from server
async function getRoomDetails(roomId) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    const res = await fetch(`${baseUrl}/rooms/${roomId}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Error reading space params details:", err);
    return null;
  }
}

// Generate dynamic browser tab titles based on room name
export async function generateMetadata({ params }) {
  const { roomId } = await params;
  const room = await getRoomDetails(roomId);
  return {
    title: room ? `StudyNook – ${room.roomName}` : "StudyNook – Room Details",
  };
}

export default async function RoomDetailsPage({ params }) {
  const { roomId } = await params;
  const room = await getRoomDetails(roomId);

  // Authenticate account session details
  const incomingHeaders = await headers();
  const session = await auth.api.getSession({ headers: incomingHeaders });

  if (!room) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#fcfbf7]">
        <p className="text-sm font-semibold text-slate-500">The study space listing could not be found.</p>
        <Link href="/rooms" className="text-xs font-bold text-[#1b4332] underline mt-2">Back to available listings</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcfbf7] py-12 text-slate-800 antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Details Space Information Column (Left 2 Columns) */}
        <div className="lg:col-span-2 space-y-6 text-left">
          <div className="relative h-[380px] w-full rounded-[24px] overflow-hidden border border-slate-200/40 bg-slate-100">
            <Image src={room.image} alt={room.roomName} fill className="object-cover" priority />
          </div>
          
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">{room.roomName}</h1>
            <div className="flex gap-4 text-xs font-semibold text-slate-400 mt-2">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#1b4332]" /> {room.floor}</span>
              <span className="flex items-center gap-1"><Users className="w-4 h-4 text-[#1b4332]" /> Up to {room.capacity} seats</span>
            </div>
          </div>

          <div className="border-t border-slate-200/60 pt-5">
            <h3 className="text-sm font-bold text-slate-900 mb-2">About This Room</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">{room.description}</p>
          </div>

          <div className="border-t border-slate-200/60 pt-5">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Included Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {room.amenities?.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white border border-slate-200/50 p-3 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Reservation Engine Context (Right 1 Column) */}
        <div className="lg:col-span-1">
          {session?.user ? (
            /* 🔌 PLUG IN INTERACTIVE FORM WITH DYNAMIC ATTACHED EMAIL SESSION FIELDS */
            <BookingForm room={room} userEmail={session.user.email} />
          ) : (
            <div className="bg-white border border-slate-200/60 p-6 rounded-[22px] shadow-xs text-center">
              <p className="text-xs text-slate-500 font-medium mb-3">Please sign in to confirm a slot reservation.</p>
              <Link href="/login" className="block w-full bg-[#1b4332] text-white py-2.5 rounded-xl text-xs font-bold shadow-xs hover:bg-[#143225] transition-all">
                Login to Book
              </Link>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}