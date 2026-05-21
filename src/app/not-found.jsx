import Link from "next/link";
import { Button } from "@heroui/react";
import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfbf7] px-6 text-center">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-md w-full">
        <Ghost className="w-16 h-16 text-[#1b4332] mx-auto mb-6" />
        
        <h2 className="text-3xl font-serif font-bold text-[#1a2d24] mb-3">
          Page Not Found
        </h2>
        
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          It looks like the study space or page you are trying to access has 
          been relocated or simply does not exist.
        </p>

        <Link href="/">
          <Button 
            className="bg-[#1b4332] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#143225] transition-all"
          >
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}