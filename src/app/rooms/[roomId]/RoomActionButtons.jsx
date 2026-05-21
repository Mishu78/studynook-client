"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { X, Edit3, Trash2 } from "lucide-react";

export default function RoomActionButtons({ roomId, roomData }) {
  const router = useRouter();
  
  // Modal view triggers
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Pre-filled form inputs initialization
  const [roomName, setRoomName] = useState(roomData?.roomName || "");
  const [description, setDescription] = useState(roomData?.description || "");
  const [image, setImage] = useState(roomData?.image || "");
  const [floor, setFloor] = useState(roomData?.floor || "");
  const [capacity, setCapacity] = useState(roomData?.capacity || "");
  const [hourlyRate, setHourlyRate] = useState(roomData?.hourlyRate || "");

  // Update study room handler (PUT /api/rooms/:id)
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const res = await fetch(`${baseUrl}/api/rooms/${roomId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomName,
          description,
          image,
          floor,
          capacity: Number(capacity),
          hourlyRate: Number(hourlyRate),
        }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        alert("Room updated successfully"); // Success Alert Toast
        setIsEditOpen(false);
        router.refresh();
      } else {
        setErrorMsg(data.error || "Failed to update room details.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network execution fault transmission failure.");
    } finally {
      setLoading(false);
    }
  };

  // Delete study room handler (DELETE /api/rooms/:id)
  const handleDelete = async () => {
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const res = await fetch(`${baseUrl}/api/rooms/${roomId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        alert("Room deleted successfully"); // Success Alert Toast
        setIsDeleteOpen(false);
        router.push("/rooms");
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to complete deletion request.");
      }
    } catch (err) {
      console.error("Network deletion pipeline fault:", err);
      alert("A critical communication pipeline breakdown occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 shrink-0">
        <button 
          onClick={() => setIsEditOpen(true)}
          className="bg-white border border-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1"
        >
          <Edit3 className="w-3 h-3" /> Edit
        </button>
        
        <button 
          onClick={() => setIsDeleteOpen(true)}
          className="bg-rose-50 text-rose-600 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-rose-100 transition-colors cursor-pointer flex items-center gap-1"
        >
          <Trash2 className="w-3 h-3" /> Delete
        </button>
      </div>

      {/* 📝 UPDATE ROOM DETAILS INLINE MODAL OVERLAY */}
      {isEditOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-[24px] max-w-lg w-full p-6 relative shadow-2xl border border-slate-100 text-left my-8">
            <button 
              onClick={() => setIsEditOpen(false)} 
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 cursor-pointer border-none bg-transparent"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4">
              <h3 className="text-xl font-serif font-bold text-slate-900">Update Room Details</h3>
              <p className="text-xs text-slate-400 font-medium">Modify dynamic spaces allocations and configuration visuals.</p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Room Name</label>
                <input 
                  type="text" 
                  value={roomName} 
                  onChange={(e) => setRoomName(e.target.value)} 
                  className="w-full bg-[#fcfbf7] border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-emerald-800" 
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                <input 
                  type="url" 
                  value={image} 
                  onChange={(e) => setImage(e.target.value)} 
                  className="w-full bg-[#fcfbf7] border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-emerald-800" 
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Floor</label>
                  <input 
                    type="text" 
                    value={floor} 
                    onChange={(e) => setFloor(e.target.value)} 
                    className="w-full bg-[#fcfbf7] border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-emerald-800" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Capacity</label>
                  <input 
                    type="number" 
                    value={capacity} 
                    onChange={(e) => setCapacity(e.target.value)} 
                    className="w-full bg-[#fcfbf7] border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-emerald-800" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Rate ($ / hr)</label>
                  <input 
                    type="number" 
                    value={hourlyRate} 
                    onChange={(e) => setHourlyRate(e.target.value)} 
                    className="w-full bg-[#fcfbf7] border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-emerald-800" 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea 
                  rows={3} 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  className="w-full bg-[#fcfbf7] border border-slate-200 rounded-xl p-3 text-xs font-semibold resize-none focus:outline-emerald-800" 
                  required 
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsEditOpen(false)} 
                  className="w-1/2 bg-slate-100 text-slate-700 font-bold h-10 rounded-xl cursor-pointer border-none text-xs hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <Button 
                  type="submit" 
                  isLoading={loading} 
                  className="w-1/2 bg-[#1b4332] text-white text-xs font-bold h-10 rounded-xl"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🛑 DELETION CONFIRMATION BACKDROP DIALOG */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-200/80 rounded-[24px] max-w-xs w-full p-6 text-center shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-900 mb-1">Are you absolutely sure?</h3>
            <p className="text-xs text-slate-400 font-medium mb-5">This action will permanently remove this study space allocation listing and wipe matching client records.</p>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsDeleteOpen(false)} 
                disabled={loading}
                className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold h-10 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <Button 
                isLoading={loading} 
                onClick={handleDelete} 
                className="w-1/2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold h-10 rounded-xl transition-colors"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}