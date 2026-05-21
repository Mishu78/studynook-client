import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, CalendarDays } from "lucide-react";

const FeaturedRoomCard = ({ room }) => {
  const { _id, roomName, description, image, floor, capacity, hourlyRate, bookingCount, amenities } = room;

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
      
      {/* Structural Image Container with specific aspect ratio frame */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 shrink-0">
        <Image 
          src={image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600'}
          alt={roomName || "StudyNook Study Room"}
          fill
          sizes="(max-w-7xl) 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-[#1b4332] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
            ${hourlyRate}/hr
          </span>
        </div>
      </div>

      {/* Meta Content Layout Body */}
      <div className="p-5 flex flex-col flex-grow">
       {/* Updated Meta Title Area to scrub accidental link values */}
<Link href={`/rooms/${_id}`}>
  <h4 className="font-serif font-bold text-slate-900 text-lg tracking-tight line-clamp-1 hover:text-[#1b4332] transition-colors mb-2">
    {roomName?.startsWith("http") ? "Premium Study Nook" : roomName}
  </h4>
</Link>
        
        <p className="text-xs text-slate-500 line-clamp-2 mb-4 flex-grow">
          {description}
        </p>

        {/* Technical Data Badges Row */}
        <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-3.5 mb-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{floor || "Main Floor"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>Up to {capacity} people</span>
          </div>
          {bookingCount !== undefined && (
            <div className="flex items-center gap-2">
              <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
              <span>{bookingCount} bookings completed</span>
            </div>
          )}
        </div>

        {/* Dynamic Badges Container loop matching your specific arrays */}
        <div className="flex flex-wrap gap-1.5 mb-1">
          {amenities?.slice(0, 3).map((amenity, idx) => (
            <span 
              key={idx} 
              className="text-[10px] font-bold tracking-wide bg-amber-500/10 text-amber-800 px-2 py-0.5 rounded"
            >
              {amenity}
            </span>
          ))}
          {amenities?.length > 3 && (
            <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
              +{amenities.length - 3} more
            </span>
          )}
        </div>
      </div>

    </div>
  );
};

export default FeaturedRoomCard;