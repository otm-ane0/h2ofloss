import { createFileRoute } from "@tanstack/react-router";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Features from "@/components/Features";
import ImageWithText from "@/components/ImageWithText";
import BuyBox from "@/components/BuyBox";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import StickyCartBar from "@/components/StickyCartBar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <ImageWithText />
        <BuyBox />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
      <StickyCartBar />
    </>
  );
}
