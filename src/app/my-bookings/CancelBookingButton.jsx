"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { XCircle } from "lucide-react";
import { toast } from "sonner";

export default function CancelBookingButton({ bookingId, status, onCancelSuccess }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Safely check if the reservation entry is already cancelled
  const isAlreadyCancelled = status === "cancelled";

  const handleCancel = async () => {
    if (isAlreadyCancelled) return;
    
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      
      // 🎯 FIXED: URL changed to match your exact /api/bookings/:id/cancel PATCH endpoint
      const response = await fetch(`${baseUrl}/api/bookings/${bookingId}/cancel`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", 
      });

      let data = {};
      const contentType = response.headers.get("content-type");
      
      // 🛡️ Safe check for JSON content before parsing
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const textError = await response.text();
        console.error("Raw Server Output Error Trace:", textError);
        throw new Error(`Server returned non-JSON page (Status ${response.status}).`);
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to cancel booking.");
      }

      // 🎉 SUCCESS TOAST TRIGGER REQUIREMENT
      toast.success("Booking cancelled", {
        description: "The reserved study space has been successfully released.",
      });

      if (onCancelSuccess) {
        onCancelSuccess(bookingId);
      }

      // Invalidate the Next.js cache and refresh data lines
      router.refresh();

    } catch (err) {
      toast.error(err.message || "An unexpected error occurred during cancellation processing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="light"
      color={isAlreadyCancelled ? "default" : "danger"}
      disabled={isAlreadyCancelled}
      className={`rounded-xl h-11 px-4 text-xs font-bold gap-1.5 border border-transparent transition-all shrink-0 select-none ${
        isAlreadyCancelled 
          ? "opacity-50 cursor-not-allowed text-slate-400 bg-slate-100" 
          : "hover:border-rose-100 cursor-pointer self-end md:self-auto"
      }`}
      isLoading={loading}
      onClick={handleCancel}
    >
      {!loading && <XCircle className="w-4 h-4" />}
      {isAlreadyCancelled ? "Cancelled" : "Cancel Booking"}
    </Button>
  );
}