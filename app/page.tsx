import { Chapters } from "@/components/chapters";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";

/* The home page is the front door: hero, marquee band, then the chapter
   index that hands off to the immersive pages. */
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Chapters />
    </>
  );
}
