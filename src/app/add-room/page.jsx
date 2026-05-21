"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner"; // 🌟 Import the global toast controller

const AMENITY_OPTIONS = [
  "Whiteboard",
  "Projector",
  "Wi‑Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

export default function AddRoomPage() {
  const router = useRouter();
  
  // Form Field State Management
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [floor, setFloor] = useState("");
  const [capacity, setCapacity] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [loading, setLoading] = useState(false);

  // Handle Multi-Checkbox Array Toggling
  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((item) => item !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const roomPayload = {
      roomName: roomName.trim(),
      description: description.trim(),
      image: image.trim(),
      floor: floor.trim(),
      capacity: Number(capacity),
      hourlyRate: Number(hourlyRate),
      amenities: selectedAmenities,
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const response = await fetch(`${baseUrl}/api/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify(roomPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create room.");
      }

      // 🎉 TRIGGER THE BEAUTIFUL GLOBAL SUCCESS TOAST
      toast.success("Room created successfully!", {
        description: "Redirecting you back to your spaces inventory catalogue.",
      });
      
      // Clear Form Fields immediately
      setRoomName("");
      setDescription("");
      setImage("");
      setFloor("");
      setCapacity("");
      setHourlyRate("");
      setSelectedAmenities([]);

      // Route syncing transition
      setTimeout(() => {
        router.refresh(); 
        router.push("/rooms"); 
      }, 2000);

    } catch (err) {
      // 🛑 TRIGGER GLOBAL ERROR TOAST (No more ugly native window alerts)
      toast.error(err.message || "An unexpected network communication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfbf7] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[560px] bg-white border border-slate-200/60 rounded-[28px] p-8 md:p-10 shadow-xs">
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[#1b4332] rounded-xl flex items-center justify-center mb-4 text-white">
            <PlusCircle className="w-6 h-6" />
          </div>
          <h1 className="text-[26px] font-serif font-bold text-slate-900 tracking-tight text-center mb-1">
            Add Study Room
          </h1>
          <p className="text-xs text-slate-500 font-medium text-center">
            List a new space configuration block inside the StudyNook network.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Room Name */}
          <div className="flex flex-col gap-1.5 items-start">
            <label className="text-xs font-bold text-slate-700 px-0.5">Room Name</label>
            <input
              type="text"
              required
              placeholder="e.g., Quantum Innovation Hub"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full bg-slate-50/40 border border-slate-200/80 hover:border-slate-300 focus:border-[#1b4332] focus:outline-none h-11 px-4 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 transition-colors"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5 items-start">
            <label className="text-xs font-bold text-slate-700 px-0.5">Description</label>
            <textarea
              required
              rows={4}
              placeholder="Provide clean instructions, setup layout patterns..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50/40 border border-slate-200/80 hover:border-slate-300 focus:border-[#1b4332] focus:outline-none p-4 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 transition-colors resize-none"
            />
          </div>

          {/* Image URL Input */}
          <div className="flex flex-col gap-1.5 items-start">
            <label className="text-xs font-bold text-slate-700 px-0.5">Image URL</label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/photo-..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-slate-50/40 border border-slate-200/80 hover:border-slate-300 focus:border-[#1b4332] focus:outline-none h-11 px-4 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 transition-colors"
            />
          </div>

          {/* Metrics Rows Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5 items-start">
              <label className="text-xs font-bold text-slate-700 px-0.5">Floor Location</label>
              <input
                type="text"
                required
                placeholder="e.g., 3rd Floor"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className="w-full bg-slate-50/40 border border-slate-200/80 hover:border-slate-300 focus:border-[#1b4332] focus:outline-none h-11 px-4 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5 items-start">
              <label className="text-xs font-bold text-slate-700 px-0.5">Max Capacity</label>
              <input
                type="number"
                min="1"
                required
                placeholder="e.g., 4"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full bg-slate-50/40 border border-slate-200/80 hover:border-slate-300 focus:border-[#1b4332] focus:outline-none h-11 px-4 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5 items-start">
              <label className="text-xs font-bold text-slate-700 px-0.5">Hourly Rate ($)</label>
              <input
                type="number"
                min="0"
                required
                placeholder="e.g., 5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="w-full bg-slate-50/40 border border-slate-200/80 hover:border-slate-300 focus:border-[#1b4332] focus:outline-none h-11 px-4 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 transition-colors"
              />
            </div>
          </div>

          {/* Amenities Grid */}
          <div className="flex flex-col gap-2 items-start pt-2">
            <label className="text-xs font-bold text-slate-700 px-0.5">Included Amenities</label>
            <div className="grid grid-cols-2 gap-3 w-full">
              {AMENITY_OPTIONS.map((amenity) => (
                <label 
                  key={amenity} 
                  className="flex items-center gap-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200/60 p-3 rounded-xl cursor-pointer transition-all select-none"
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                    className="accent-[#1b4332] h-4 w-4 rounded-md border-slate-300 focus:ring-0 cursor-pointer"
                  />
                  <span className="text-xs font-medium text-slate-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-[#1b4332] hover:bg-[#143225] text-white font-bold h-11 rounded-xl text-xs mt-4 transition-transform active:scale-[0.99]"
          >
            Create Listing
          </Button>
        </form>

      </div>
    </main>
  );
}