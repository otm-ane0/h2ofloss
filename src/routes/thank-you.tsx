import { createFileRoute, Link } from "@tanstack/react-router";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
