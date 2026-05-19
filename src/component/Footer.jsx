import React from "react";
import Link from "next/link";
import { BookOpen, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#fcfbf7] border-t border-slate-200/60 pt-16 pb-8 text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pb-12 items-start">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-[#1b4332] rounded-lg text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[#1b4332]">
                StudyNook
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[240px]">
              Quiet study rooms, booked by the hour. Built for students, scholars, and lifelong learners.
            </p>
          </div>

          {/* Column 2: Useful Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif font-bold text-slate-900 tracking-tight text-base">Useful Links</h4>
            <div className="flex flex-col gap-2.5 text-sm text-slate-600">
              <Link href="/" className="hover:text-[#1b4332] transition-colors w-fit">Home</Link>
              <Link href="/rooms" className="hover:text-[#1b4332] transition-colors w-fit">Rooms</Link>
              <Link href="/about" className="hover:text-[#1b4332] transition-colors w-fit">About</Link>
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif font-bold text-slate-900 tracking-tight text-base">Contact</h4>
            <div className="flex flex-col gap-2.5 text-sm text-slate-600">
              <a href="mailto:hello@studynook.app" className="flex items-center gap-2 hover:text-[#1b4332] transition-colors w-fit">
                <Mail className="w-4 h-4 text-slate-400" />
                hello@studynook.app
              </a>
              <a href="tel:+14155550142" className="flex items-center gap-2 hover:text-[#1b4332] transition-colors w-fit">
                <Phone className="w-4 h-4 text-slate-400" />
                +1 (415) 555-0142
              </a>
            </div>
          </div>

          {/* Column 4: Social Icons (Using pure SVGs to avoid library export conflicts) */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif font-bold text-slate-900 tracking-tight text-base">Follow</h4>
            <div className="flex items-center gap-2.5">
              
              {/* Facebook */}
              <a href="#" className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-full text-slate-500 hover:text-[#1b4332] hover:border-[#1b4332] hover:bg-slate-50 transition-all">
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>

              {/* X (formerly Twitter) */}
              <a href="#" className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-full text-slate-500 hover:text-[#1b4332] hover:border-[#1b4332] hover:bg-slate-50 transition-all">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="#" className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-full text-slate-500 hover:text-[#1b4332] hover:border-[#1b4332] hover:bg-slate-50 transition-all">
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>

              {/* Instagram */}
              <a href="#" className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-full text-slate-500 hover:text-[#1b4332] hover:border-[#1b4332] hover:bg-slate-50 transition-all">
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

            </div>
          </div>

        </div>

        {/* Bottom Footer Details */}
        <div className="border-t border-slate-200/60 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
          <p>© 2026 StudyNook. All rights reserved.</p>
          <p className="italic">Crafted for focused minds.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;