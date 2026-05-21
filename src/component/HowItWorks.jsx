import { Search, CalendarCheck, DoorOpen } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    { 
      icon: <Search className="w-8 h-8" />,
      title: "Browse & Filter", 
      desc: "Find the perfect space by location, capacity, or available amenities using our intuitive search." 
    },
    { 
      icon: <CalendarCheck className="w-8 h-8" />,
      title: "Book Instantly", 
      desc: "Select your preferred date and time slot with our conflict-free, real-time calendar." 
    },
    { 
      icon: <DoorOpen className="w-8 h-8" />,
      title: "Get to Work", 
      desc: "Receive a digital confirmation and head straight to your reserved private study nook." 
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-rose-50/50 to-white dark:from-slate-950 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white">
            How it works
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Simple steps to your perfect study environment.</p>
        </div>

        {/* Professional Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-rose-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                {step.icon}
              </div>
              
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {step.title}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};