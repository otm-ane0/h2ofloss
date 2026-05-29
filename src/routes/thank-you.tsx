import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ttqTrack, TIKTOK_CURRENCY } from "@/lib/tiktok";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Commande confirmée — H2OFLOSS" },
      { name: "description", content: "Merci pour votre commande." },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    let raw: string | null = null;

    try {
      raw = sessionStorage.getItem("h2ofloss_checkout");
    } catch {
      return;
    }

    if (!raw) return;

    try {
      const payload = JSON.parse(raw) as {
        contents?: unknown;
        value?: number;
        currency?: string;
      };

      if (typeof payload.value === "number" && payload.value > 0) {
        ttqTrack("CompletePayment", {
          content_type: "product",
          contents: Array.isArray(payload.contents) ? payload.contents : [],
          value: payload.value,
          currency: payload.currency ?? TIKTOK_CURRENCY,
        });
      }
    } catch {
      // ignore parse errors
    } finally {
      try {
        sessionStorage.removeItem("h2ofloss_checkout");
      } catch {
        // ignore storage errors
      }
    }
  }, []);

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="container-dawn py-28 text-center min-h-[60vh]">
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6">
          Commande confirmée
        </p>
        <h1 className="text-3xl md:text-[48px] max-w-2xl mx-auto">
          Merci pour votre commande.
        </h1>
        <p className="mt-5 text-muted-foreground max-w-md mx-auto">
          Un e-mail de confirmation est en route. Votre kit est généralement expédié sous 1 à 2 jours ouvrés.
        </p>
        <Link
          to="/"
          className="mt-10 inline-block bg-primary text-primary-foreground px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-[#333] transition-colors"
        >
          Retour à la boutique
        </Link>
      </main>
      <Footer />
    </>
  );
}
