import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import CancelBookingButton from "./CancelBookingButton";

async function getUserBookings(email, cookieHeaders) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    const res = await fetch(`${baseUrl}/api/bookings?email=${encodeURIComponent(email)}`, {
      cache: "no-store",
      headers: {
        "Cookie": cookieHeaders || ""
      }
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error("Failed fetching account schedules error:", err);
    return [];
  }
}

export default async function MyBookingsPage() {
  const incomingHeaders = await headers();
  const cookieHeaders = incomingHeaders.get("cookie") || "";

  // 💡 Safe session retrieval configuration
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: {
        cookie: cookieHeaders
      },
    });
  } catch (error) {
    console.error("Auth server handshake stalled:", error.message);
  }

  if (!session?.user) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center bg-[#fcfbf7] px-4">
        <p className="text-slate-500 font-medium text-sm mb-3">Please login to manage scheduled room allocations.</p>
        <Link href="/login" className="bg-[#1b4332] text-white px-4 py-2 rounded-xl text-xs font-bold">
          Go to Login
        </Link>
      </main>
    );
  }

  const bookings = await getUserBookings(session.user.email, cookieHeaders);

  return (
    <main className="min-h-screen bg-[#fcfbf7] py-16 text-slate-800 antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
          <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">My Bookings</h1>
          <p className="text-xs font-medium text-slate-400 mt-1">Manage your upcoming and past room reservations.</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white border border-slate-200/60 rounded-[24px] p-12 text-center shadow-xs">
            <p className="text-sm text-slate-400 font-medium">You have no bookings yet.</p>
            <Link href="/rooms" className="text-xs font-bold text-[#1b4332] underline mt-2 inline-block">
              Browse Available Rooms
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-slate-200/70 rounded-[20px] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#fcfbf7] border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Room</th>
                    <th className="py-4 px-4">Date</th>
                    <th className="py-4 px-4">Time</th>
                    <th className="py-4 px-4">Cost</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs font-semibold text-slate-700">
                  {bookings.map((booking) => (
                    /* 💡 Pass the complete object reference downstream to encapsulate interactive actions cleanly */
                    <CancelBookingButton key={booking._id} initialBooking={booking} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}