import { Button } from "@heroui/react";
import { LayoutDashboard, ShieldCheck, Zap } from "lucide-react";

export const HostSection = () => {
  const features = [
    { icon: <LayoutDashboard />, text: "Unified Dashboard" },
    { icon: <ShieldCheck />, text: "Verified Bookings" },
    { icon: <Zap />, text: "Instant Management" }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Card - Updated Background */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-12 md:p-16 relative overflow-hidden shadow-2xl">
          
          {/* Decorative Gradient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10 text-center flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Empower Your Library Space
            </h2>
            <p className="text-slate-400 max-w-xl text-lg mb-10 leading-relaxed">
              Stop manual scheduling headaches. Join the StudyNook network to digitize your inventory, automate bookings, and track usage in real-time.
            </p>

            {/* Feature List */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-emerald-950/30 border border-emerald-900/50 px-4 py-2 rounded-full">
                  <span className="w-4 h-4">{f.icon}</span> {f.text}
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                as="a"
                href="/add-room"
                className="h-12 px-8 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20"
              >
                Start Listing Now
              </Button>
              <Button
                variant="bordered"
                className="h-12 px-8 border-slate-700 text-slate-300 rounded-xl hover:bg-slate-800 transition-all"
              >
                How it works
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};