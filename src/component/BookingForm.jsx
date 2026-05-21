"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { CalendarCheck } from "lucide-react";
import { toast } from "sonner"; // 🌟 Injected to handle assignment error toast rules

export default function BookingForm({ room, userEmail }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form Field State Management
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const [specialNote, setSpecialNote] = useState("");

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    
    if (!bookingDate) {
      toast.error("Please select a valid date.");
      return;
    }

    setLoading(true);

    const bookingPayload = {
      roomId: room._id,
      roomName: room.roomName,
      image: room.image,
      date: bookingDate,
      startTime: startTime,
      endTime: endTime,
      specialNote: specialNote,
      totalCost: Number(room.hourlyRate), 
      userEmail: userEmail, 
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      
      const response = await fetch(`${baseUrl}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify(bookingPayload),
      });

      const data = await response.json();

      // 🛡️ INTERCEPT BACKEND ERRORS (Like 409 Conflict)
      if (!response.ok) {
        throw new Error(data.error || "Failed to finalize room reservation.");
      }

      // 🎉 SUCCESS TOAST
      toast.success("Room booked successfully!", {
        description: `Your session in ${room.roomName} has been confirmed.`,
      });

      router.push("/my-bookings");
      router.refresh();

    } catch (err) {
      // 🛑 ASSIGNMENT REQUIREMENT COMPLIANT ERROR TOAST
      // Displays: "Conflict detected: This room is already reserved for the selected time slot."
      toast.error("Booking Conflict", {
        description: err.message,
        duration: 6000, 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCreateBooking} className="space-y-4 bg-white p-6 border border-slate-200/60 rounded-[22px] shadow-xs text-left">
      <h3 className="text-sm font-bold text-slate-900 mb-2">Select Date & Time</h3>
      
      {/* Date Picker */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold text-slate-500 uppercase">Reservation Date</label>
        <input 
          type="date" 
          required
          value={bookingDate} 
          onChange={(e) => setBookingDate(e.target.value)}
          className="w-full bg-slate-50/50 border border-slate-200 hover:border-slate-300 focus:border-[#1b4332] focus:outline-none h-11 px-4 rounded-xl text-xs font-semibold text-slate-800"
        />
      </div>

      {/* Time Slots Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase">Start Time</label>
          <input 
            type="time" 
            required
            value={startTime} 
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full bg-slate-50/50 border border-slate-200 h-11 px-4 rounded-xl text-xs font-semibold text-slate-800"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase">End Time</label>
          <input 
            type="time" 
            required
            value={endTime} 
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full bg-slate-50/50 border border-slate-200 h-11 px-4 rounded-xl text-xs font-semibold text-slate-800"
          />
        </div>
      </div>

      {/* Special Notes */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold text-slate-500 uppercase">Special Requirements (Optional)</label>
        <input 
          type="text" 
          placeholder="e.g., need extra whiteboard markers"
          value={specialNote} 
          onChange={(e) => setSpecialNote(e.target.value)}
          className="w-full bg-slate-50/50 border border-slate-200 h-11 px-4 rounded-xl text-xs font-medium text-slate-800"
        />
      </div>

      <div className="pt-2">
        <p className="text-xs text-slate-500 font-semibold mb-3 flex justify-between">
          <span>Rate:</span> 
          <span className="text-slate-900 font-serif font-black">${room.hourlyRate}/hour</span>
        </p>
        
        <Button
          type="submit"
          isLoading={loading}
          className="w-full bg-[#1b4332] hover:bg-[#143225] text-white font-bold h-11 rounded-xl text-xs transition-all cursor-pointer"
        >
          <CalendarCheck className="w-4 h-4" /> Confirm Reservation Slot
        </Button>
      </div>
    </form>
  );
}