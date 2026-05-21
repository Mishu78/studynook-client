import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { CheckCircle2, MapPin, Users } from "lucide-react";
import BookingForm from "@/component/BookingForm"; 
import RoomActionButtons from "@/app/rooms/[roomId]/RoomActionButtons";

// Fetch a single room record securely from the backend API
async function getRoomDetails(roomId) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    
    // 💡 Added log to see exactly what ID is passing to your Express server
    console.log(`📡 Fetching from: ${baseUrl}/rooms/${roomId}`);
    
    const res = await fetch(`${baseUrl}/rooms/${roomId}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Error reading space details:", err);
    return null;
  }
}

// Generate dynamic browser tab titles based on the room name
export async function generateMetadata({ params }) {
  const { roomId } = await params; // 💡 Await params safely here
  const room = await getRoomDetails(roomId);
  return {
    title: room ? `StudyNook – ${room.roomName}` : "StudyNook – Room Details",
  };
}

export default async function RoomDetailsPage({ params }) {
  // 💡 Await the parameters before using them!
  const { roomId } = await params; 
  const room = await getRoomDetails(roomId);

  // Parse headers to match active user session safely
  const incomingHeaders = await headers();
  const session = await auth.api.getSession({ headers: incomingHeaders });

  if (!room) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#fcfbf7]">
        <p className="text-sm font-semibold text-slate-500">The study space listing could not be found.</p>
        <p className="text-xs text-slate-400 mt-1">Attempted to load ID: <code className="bg-slate-100 px-1 rounded">{roomId}</code></p>
        <Link href="/rooms" className="text-xs font-bold text-[#1b4332] underline mt-3">
          Back to listings
        </Link>
      </div>
    );
  }

  const isOwner = session?.user && room.ownerId === session.user.id;

  return (
    <main className="min-h-screen bg-[#fcfbf7] py-12 text-slate-800 antialiased">
      {/* ... Rest of your rendering JSX remains exactly the same ... */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
         <h1 className="text-3xl font-bold">{room.roomName}</h1>
         {/* Your original content layouts */}
      </div>
    </main>
  );
}