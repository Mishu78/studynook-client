"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, X } from "lucide-react";
import { Button } from "@heroui/react";

export default function BookingWidget({ room, userSession }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Get current date string formatted as YYYY-MM-DD for the HTML5 min attribute
  const todayString = new Date().toISOString().split("T")[0];
  
  const [date, setDate] = useState(todayString);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const [specialNote, setSpecialNote] = useState("");
  const [totalCost, setTotalCost] = useState(room.hourlyRate);

  // Generate hourly dropdown options dynamically from 08:00 to 20:00
  const timeSlots = [];
  for (let i = 8; i <= 20; i++) {
    const formattedHour = i < 10 ? `0${i}:00` : `${i}:00`;
    timeSlots.push(formattedHour);
  }

  // Filter end hours based on chosen start hours to protect the 1-hour minimum constraint rule
  const filteredEndSlots = timeSlots.filter(time => {
    return parseInt(time.split(":")[0]) > parseInt(startTime.split(":")[0]);
  });

  // Keep end-time valid if it falls below a modified start-time
  useEffect(() => {
    const startHour = parseInt(startTime.split(":")[0]);
    const endHour = parseInt(endTime.split(":")[0]);
    if (endHour <= startHour) {
      setEndTime(`${startHour + 1 < 10 ? "0" : ""}${startHour + 1}:00`);
    }
  }, [startTime]);

  // Real-time cost updates
  useEffect(() => {
    const startHour = parseInt(startTime.split(":")[0]);
    const endHour = parseInt(endTime.split(":")[0]);
    const hours = endHour > startHour ? endHour - startHour : 1;
    setTotalCost(hours * room.hourlyRate);
  }, [startTime, endTime, room.hourlyRate]);

  const handleBookingConfirm = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!userSession) {
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      // 💡 Dynamically resolve your environment API configurations safely
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

      const response = await fetch(`${baseUrl}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: room._id,
          roomName: room.roomName,
          image: room.image,
          date,
          startTime,
          endTime,
          specialNote,
          totalCost,
          userEmail: userSession.email
        }),
        // 💡 CRITICAL: Explicitly pass credentials cross-origin to validate backend server sessions cleanly
        credentials: "include" 
      });

      const data = await response.json();

      if (response.ok) {
        alert("Room booked successfully!"); // Success Toast
        setIsOpen(false);
        router.push("/my-bookings");
        router.refresh();
      } else {
        // Displays time-slot conflict error messages directly on the modal UI 
        setErrorMsg(data.error || "Failed to book this room.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network transmission error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => { if (!userSession) router.push("/login"); else setIsOpen(true); }}
        className="w-full bg-[#1b4332] hover:bg-[#153427] text-white font-semibold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
      >
        <CalendarDays className="w-4 h-4" /> {userSession ? "Book Now" : "Login to Book"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 relative shadow-2xl border border-slate-100 text-left">
            
            <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer border-none bg-transparent">
              <X className="w-4 h-4" />
            </button>

            <div className="mb-5">
              <h3 className="text-xl font-serif font-bold text-slate-900 tracking-tight">Book {room.roomName}</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Granular hourly schedule allocations management.</p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold rounded-xl">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleBookingConfirm} className="space-y-4">
              {/* Date Input Field (Blocks Past Scheduling Options) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Date</label>
                <input 
                  type="date" 
                  min={todayString}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#fcfbf7] border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#1b4332]"
                  required
                />
              </div>

              {/* Time Slots Selection Configuration Dropdowns */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Start Time</label>
                  <select 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-[#fcfbf7] border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#1b4332]"
                  >
                    {timeSlots.slice(0, -1).map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">End Time</label>
                  <select 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-[#fcfbf7] border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#1b4332]"
                  >
                    {filteredEndSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Special note (optional)</label>
                <textarea 
                  rows={2}
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder="E.g., Whiteboard markers or projector config setup needed."
                  className="w-full bg-[#fcfbf7] border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1b4332] resize-none"
                />
              </div>

              <div className="bg-[#fcfbf7] border border-slate-100 rounded-xl p-4 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total cost</span>
                <span className="text-xl font-serif font-black text-[#1b4332]">${totalCost}</span>
              </div>

              <div className="flex gap-3 pt-1">
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold h-11 rounded-xl cursor-pointer border-none"
                >
                  Cancel
                </button>
                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-1/2 bg-[#1b4332] hover:bg-[#153427] text-white text-xs font-bold h-11 rounded-xl transition-all"
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}