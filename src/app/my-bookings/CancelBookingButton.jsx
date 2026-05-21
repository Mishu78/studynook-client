"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CancelBookingButton({ initialBooking }) {
  const router = useRouter();
  const [booking, setBooking] = useState(initialBooking);
  const [isCancelling, setIsCancelling] = useState(false);

  if (!booking) return null;

  // Handle fallback parsing if data format is split into separate fields
  const displayTime = booking.timeSlot || `${booking.startTime} - ${booking.endTime}`;
  
  const displayDate = booking.date 
    ? new Date(booking.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "N/A";

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this room reservation?")) {
      return;
    }

    setIsCancelling(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      
      const response = await fetch(`${baseUrl}/api/bookings/${booking._id}/cancel`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        // Dynamic UI status switch update loop
        setBooking((prev) => ({
          ...prev,
          status: "cancelled",
        }));
        router.refresh();
      } else {
        alert(data.error || "Failed to cancel the reservation.");
      }
    } catch (error) {
      console.error("Cancellation error:", error);
      alert("A network transmission error occurred.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <tr className="hover:bg-slate-50/40 transition-colors">
      {/* ROOM CELL */}
      <td className="py-4 px-6 flex items-center gap-3 min-w-[200px]">
        <div className="relative w-10 h-8 rounded-md overflow-hidden bg-slate-100 shrink-0 border border-slate-200/40">
          <Image 
            src={booking.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=200"}
            alt={booking.roomName || "Study Room"}
            fill
            sizes="40px" // ✅ Added to clean up Next.js lint warning messages
            className="object-cover"
          />
        </div>
        <span className="font-bold text-slate-800 tracking-tight">{booking.roomName}</span>
      </td>

      {/* DATE CELL */}
      <td className="py-4 px-4 text-slate-500 whitespace-nowrap">{displayDate}</td>

      {/* TIME CELL */}
      <td className="py-4 px-4 text-slate-600 whitespace-nowrap">{displayTime}</td>

      {/* COST CELL */}
      <td className="py-4 px-4 font-serif font-black text-slate-900">${booking.cost || booking.totalCost}</td>

      {/* STATUS BADGE CELL */}
      <td className="py-4 px-4">
        {booking.status === "cancelled" ? (
          <span className="inline-flex text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
            cancelled
          </span>
        ) : (
          <span className="inline-flex text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
            confirmed
          </span>
        )}
      </td>

      {/* ACTION TRIGGER CELL */}
      <td className="py-4 px-6 text-right whitespace-nowrap">
        {booking.status === "cancelled" ? (
          <span className="text-slate-400 font-bold block pr-4">—</span>
        ) : (
          <button
            onClick={handleCancel}
            disabled={isCancelling}
            className="bg-white hover:bg-slate-50 text-slate-700 font-bold px-4 py-1.5 rounded-xl border border-slate-200 shadow-xs transition-all cursor-pointer disabled:opacity-50 text-xs"
          >
            {isCancelling ? "Cancelling..." : "Cancel"}
          </button>
        )}
      </td>
    </tr>
  );
}