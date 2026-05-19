import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "@tanstack/react-router";
import { PRODUCT } from "@/lib/product";
import { useCart } from "@/context/CartContext";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref     = useRef<HTMLHeadingElement>(null);
  const subRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef    = useRef<HTMLDivElement>(null);
  const trustRef  = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Headline: word-by-word clip-reveal ── */
      if (h1Ref.current) {
        const raw = h1Ref.current.textContent || "";

        // Build one <span class="word"> per word, each containing
        // an inner <span class="char-inner"> that slides up.
        // Words are separated by a real space so the browser handles
        // line-breaking and word-spacing naturally.
        h1Ref.current.innerHTML = raw
          .split(" ")
          .map(
            (word) =>
              `<span class="word" style="display:inline-block;overflow:hidden;vertical-align:bottom">` +
              `<span class="char-inner" style="display:inline-block;will-change:transform">${word}</span>` +
              `</span>`
          )
          .join(" "); // ← real space between words = real spacing!

        gsap.from(h1Ref.current.querySelectorAll(".char-inner"), {
          y: "110%",
          opacity: 0,
          stagger: 0.07,
          duration: 0.75,
          ease: "power3.out",
        });
      }

      /* ── Rest of the elements ── */
      gsap.from(subRef.current,   { opacity: 0, y: 22, duration: 0.6, delay: 0.65, ease: "power2.out" });
      gsap.from(ctaRef.current,   { opacity: 0, y: 22, duration: 0.6, delay: 0.85, ease: "power2.out" });
      gsap.from(trustRef.current, { opacity: 0, y: 22, duration: 0.6, delay: 1.0,  ease: "power2.out" });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleAdd = () => {
    addItem({
      id:      PRODUCT.id,
      name:    PRODUCT.name,
      variant: "Noir",
      price:   PRODUCT.price,
      image:   PRODUCT.images[0].src,
    });
  };

  return (
    <section
      ref={sectionRef}
      data-hero
      className="relative overflow-hidden min-h-[88vh] flex items-center"
      style={{ marginTop: -112, paddingTop: 112 }}
    >
      {/* ── Background Video ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/hero.mp4"  type="video/mp4" />
        <source src="/videos/hero.webm" type="video/webm" />
      </video>

      {/* ── Overlay ── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

      {/* ── Content ── */}
      <div className="container-dawn relative z-20 w-full py-20 lg:py-28 px-4 lg:px-0">
        <div className="max-w-lg">

          <p className="text-xs tracking-[0.25em] uppercase text-white/70 mb-6">
            Nouveau · soins bucco-dentaires 2-en-1
          </p>

          {/* word-spacing gives each word a natural gap on top of the space char */}
          <h1
            ref={h1Ref}
            className="text-4xl sm:text-5xl lg:text-[56px] leading-[1.15] font-normal text-white"
            style={{ wordSpacing: "0.05em" }}
          >
            Un sourire complet, chaque matin.
          </h1>

          <p
            ref={subRef}
            className="mt-5 text-[18px] text-white/80 max-w-md leading-relaxed"
          >
            Le seul kit qui brosse et nettoie au jet d'eau en une seule charge.
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-6">
            <button
              onClick={handleAdd}
              className="bg-white text-black px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-white/90 transition-colors"
            >
              Ajouter au panier — ${PRODUCT.price.toFixed(2)}
            </button>
            <Link
              to="/products"
              className="text-sm text-white underline underline-offset-4 hover:opacity-60 transition-opacity"
            >
              Voir les détails ↓
            </Link>
          </div>

          <div ref={trustRef} className="mt-8 flex flex-wrap gap-6 text-sm text-white/70">
            <span className="inline-flex items-center gap-2"><Check /> Livraison gratuite</span>
            <span className="inline-flex items-center gap-2"><Check /> Étanchéité IPX7</span>
            <span className="inline-flex items-center gap-2"><Check /> Retours sous 30 jours</span>
          </div>

        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}