"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import { SlidersHorizontal, RotateCcw, Search, MapPin, Users } from "lucide-react";

export default function ClientRoomsWorkspace({ initialRooms = [] }) {
  const [rooms] = useState(initialRooms);
  const [filteredRooms, setFilteredRooms] = useState(initialRooms);

  // Filter States
  const [searchName, setSearchName] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const amenityOptions = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
  ];

  // Client-side Search and Filtering Logic
  useEffect(() => {
    let result = rooms || [];

    if (searchName.trim() !== "") {
      result = result.filter((room) =>
        room.roomName?.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (selectedAmenities.length > 0) {
      result = result.filter((room) =>
        selectedAmenities.every((amenity) => room.amenities?.includes(amenity))
      );
    }

    if (minPrice !== "") {
      result = result.filter((room) => room.hourlyRate >= parseFloat(minPrice));
    }

    if (maxPrice !== "") {
      result = result.filter((room) => room.hourlyRate <= parseFloat(maxPrice));
    }

    setFilteredRooms(result);
  }, [searchName, selectedAmenities, minPrice, maxPrice, rooms]);

  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleReset = () => {
    setSearchName("");
    setSelectedAmenities([]);
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      
      {/* LEFT SIDEBAR: Refine Panel */}
      <aside className="w-full lg:w-64 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm shrink-0 h-fit sticky top-24">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-5">
          <span className="font-serif font-bold text-slate-900 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" /> Refine
          </span>
          <button 
            onClick={handleReset}
            className="text-xs font-semibold text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Search by name
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="e.g. Quiet Pod"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Amenities
          </label>
          <div className="flex flex-col gap-2.5">
            {amenityOptions.map((amenity) => (
              <label key={amenity} className="flex items-center gap-3 text-sm font-medium text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                  className="w-4 h-4 rounded text-[#1b4332] accent-[#1b4332]"
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Hourly rate ($)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
            />
          </div>
        </div>
      </aside>

      {/* RIGHT VIEWPORT: Room Presentation Grid */}
      <section className="flex-1">
        <p className="text-xs text-slate-400 font-semibold mb-4">
          Showing <span className="text-slate-700">{filteredRooms.length}</span> of {rooms.length} rooms
        </p>

        {filteredRooms.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-16 text-center max-w-xl mx-auto mt-6">
            <h3 className="text-lg font-bold text-slate-800 mb-1">No rooms found</h3>
            <p className="text-sm text-slate-500">
              We couldn't find any rooms matching your specifications.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <div 
                key={room._id} 
                className="bg-white border border-slate-200/70 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="relative w-full h-48 bg-slate-100 shrink-0">
                  <Image
                    src={room.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600"}
                    alt={room.roomName || "StudyRoom"} 
                    fill
                    sizes="(max-w-7xl) 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-serif font-bold text-slate-900 text-base tracking-tight truncate">
                      {room.roomName}
                    </h3>
                    <span className="bg-[#1b4332]/5 text-[#1b4332] text-xs font-bold px-2 py-1 rounded-md shrink-0">
                      ${room.hourlyRate}/hr
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 flex-1">
                    {room.description}
                  </p>

                  <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-3.5 mb-4 text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{room.floor || "Main Floor"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>Up to {room.capacity} people</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {room.amenities?.slice(0, 3).map((amenity, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] font-bold tracking-wide bg-amber-500/10 text-amber-800 px-2 py-0.5 rounded"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  {/* 🛑 FIX: Convert MongoDB Object ID safely into a string primitive */}
<Link href={`/rooms/${room._id.toString()}`} className="mt-auto">
  <Button variant="bordered" className="w-full rounded-xl border-slate-200 font-medium text-xs text-slate-700 bg-[#fcfbf7]/50 hover:bg-slate-50 py-2 cursor-pointer">
    View Details
  </Button>
</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}