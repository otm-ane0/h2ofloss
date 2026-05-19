import { useState } from "react";
import { Link } from "@tanstack/react-router";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const payLogos = [
    { src: "/images/visa.png", alt: "Visa" },
    { src: "/images/card.png", alt: "Mastercard" },
    { src: "/images/apple-pay.png", alt: "Apple Pay" },
    { src: "/images/google-pay-svgrepo-com.svg", alt: "Google Pay" },
    { src: "/images/american-express.png", alt: "American Express" },
  ];

  return (
    <footer className="bg-surface pt-20 pb-28 md:pb-10">
      <div className="container-dawn">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-14">
          <div>
            <p className="text-[18px] font-medium tracking-[0.18em]">H2OFLOSS</p>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs leading-[1.7]">
              Soins bucco-dentaires haut de gamme, conçus pour un nettoyage plus profond. Fabriqués avec soin, garantis à vie.
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-4">Liens rapides</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">FAQ</a></li>
              <li><a href="#" className="hover:text-foreground">Retours</a></li>
              <li><a href="#" className="hover:text-foreground">Suivre la commande</a></li>
              <li><a href="#" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-4">Newsletter</p>
            <p className="text-sm text-muted-foreground mb-3">
              Astuces, offres et actus produits.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="flex"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Adresse e-mail"
                className="flex-1 bg-background border border-border px-3 py-3 text-sm focus:outline-none focus:border-foreground"
              />
              <button className="bg-primary text-primary-foreground px-5 text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#333] transition-colors">
                {submitted ? "✓" : "S'inscrire"}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} H2OFLOSS. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center gap-3 opacity-80">
            {payLogos.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="h-7 w-auto rounded-md border border-border bg-background px-2 py-1"
              />
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/cart" className="text-xs underline text-muted-foreground">Voir le panier</Link>
        </div>
      </div>
    </footer>
  );
}
