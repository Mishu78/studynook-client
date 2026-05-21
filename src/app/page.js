import Hero from "@/component/Banner";
import FeaturedRooms from "../component/FeaturedRooms";

export const metadata = {
  title: "StudyNook – Home",
  description: "Book your ideal study space instantly inside the StudyNook network.",
};

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedRooms />
    </div>
  );
}