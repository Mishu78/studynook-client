import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { MainNavbar } from "../component/Navbar";
import Footer from "@/component/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Default Fallback Metadata Configuration Block
export const metadata = {
  title: "StudyNook",
  description: "Book premium, focused study spaces instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fcfbf7]">
        {/* Navigation Layer */}
        <MainNavbar />
        
        {/* Dynamic Route Children Stream Context */}
        <div className="flex-1">
          {children}
        </div>
        
        {/* Persistent Foot Deck Area */}
        <Footer />

        {/* 🎉 GLOBAL TOAST ENGINE PROVIDER */}
        <Toaster 
          position="top-center" 
          richColors 
          closeButton
          toastOptions={{
            style: {
              borderRadius: '16px',
              fontSize: '12px',
              fontFamily: 'var(--font-geist-sans), sans-serif',
            }
          }} 
        />
      </body>
    </html>
  );
}