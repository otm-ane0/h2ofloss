import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
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
import { PRODUCT } from "@/lib/product";
import { ttqTrack, TIKTOK_CURRENCY } from "@/lib/tiktok";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useEffect(() => {
    ttqTrack("ViewContent", {
      content_id: PRODUCT.id,
      content_type: "product",
      content_name: PRODUCT.name,
      price: PRODUCT.price,
      value: PRODUCT.price,
      currency: TIKTOK_CURRENCY,
      contents: [
        {
          content_id: PRODUCT.id,
          content_name: PRODUCT.name,
          price: PRODUCT.price,
          quantity: 1,
        },
      ],
    });
  }, []);

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
