import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, CalendarDays } from "lucide-react";

export const FeaturedRoomCard = ({ room }) => {
  const { _id, roomName, description, image, floor, capacity, hourlyRate, bookingCount, amenities } = room;

  return (
    <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      
      {/* Image Area */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image 
          src={image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600'}
          alt={roomName}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Glass Price Tag */}
        <div className="absolute top-4 left-4 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-white/20 px-4 py-1.5 rounded-full">
          <span className="text-[#1b4332] dark:text-emerald-400 font-bold text-sm">
            ${hourlyRate}/hr
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <Link href={`/rooms/${_id}`}>
          <h4 className="font-serif font-bold text-xl text-slate-900 dark:text-white mb-3 group-hover:text-[#1b4332] dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
            {roomName}
          </h4>
        </Link>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6 leading-relaxed flex-grow">
          {description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-col gap-2 border-t border-slate-100 dark:border-slate-800 pt-5 mb-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-500" /> {floor || "Main Floor"}
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-500" /> Up to {capacity} people
          </div>
          {bookingCount !== undefined && (
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-emerald-600 dark:text-emerald-500" /> {bookingCount} bookings completed
            </div>
          )}
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2">
          {amenities?.slice(0, 3).map((amenity, idx) => (
            <span key={idx} className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full">
              {amenity}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};