import Hero from "@/component/Banner";
import FeaturedRooms from "../component/FeaturedRooms";
import { HowItWorks } from "../component/HowItWorks";
import { HostSection } from "@/component/HostSection";

export const metadata = {
  title: "StudyNook – Home",
  description: "Book your ideal study space instantly inside the StudyNook network.",
};

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedRooms />
      <HowItWorks/>
      <HostSection/>
    </div>
  );
}