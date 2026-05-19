import Hero from "@/component/Banner";
import Image from "next/image";
import FeaturedRooms from "../component/FeaturedRooms";

export default function Home() {
  return (
    <div>
     <Hero/>
     <FeaturedRooms/>
    </div>
  );
}
