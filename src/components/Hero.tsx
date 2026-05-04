import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { PRODUCT } from "@/lib/product";
import { useCart } from "@/context/CartContext";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (h1Ref.current) {
        const text = h1Ref.current.textContent || "";
        h1Ref.current.innerHTML = text
          .split("")
          .map((c) =>
            c === " "
              ? `<span style="display:inline-block;width:0.28em"></span>`
              : `<span class="inline-block will-change-transform" style="overflow:hidden">${c}</span>`,
          )
          .join("");
        const chars = h1Ref.current.querySelectorAll("span");
        gsap.from(chars, {
          y: 80,
          opacity: 0,
          stagger: 0.02,
          duration: 0.7,
          ease: "power3.out",
        });
      }

      gsap.from(subRef.current,   { opacity: 0, y: 20, duration: 0.6, delay: 0.7,  ease: "power2.out" });
      gsap.from(ctaRef.current,   { opacity: 0, y: 20, duration: 0.6, delay: 0.9,  ease: "power2.out" });
      gsap.from(trustRef.current, { opacity: 0, y: 20, duration: 0.6, delay: 1.05, ease: "power2.out" });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleAdd = () => {
    addItem({
      id: PRODUCT.id,
      name: PRODUCT.name,
      variant: "Black",
      price: PRODUCT.price,
      image: PRODUCT.images[0].src,
    });
  };

  return (
    <section
      ref={sectionRef}
      data-hero
      className="relative overflow-hidden min-h-[88vh] flex items-center"
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

      {/* ── Overlay — stronger on left so text is readable ── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

      {/* ── Content — left side only ── */}
      <div className="container-dawn relative z-20 w-full py-20 lg:py-28 px-4 lg:px-0">
        <div className="max-w-lg">

          <p className="text-xs tracking-[0.25em] uppercase text-white/70 mb-6">
            New · 2-in-1 oral care
          </p>

          <h1
            ref={h1Ref}
            className="text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] font-normal text-white"
          >
            Your Complete Smile, Every Morning.
          </h1>

          <p
            ref={subRef}
            className="mt-5 text-[18px] text-white/80 max-w-md leading-relaxed"
          >
            The only kit that brushes and flosses in one charge.
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-6">
            <button
              onClick={handleAdd}
              className="bg-white text-black px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-white/90 transition-colors"
            >
              Add to Cart — ${PRODUCT.price.toFixed(2)}
            </button>
            <a
              href="#buy"
              className="text-sm text-white underline underline-offset-4 hover:opacity-60 transition-opacity"
            >
              View Details ↓
            </a>
          </div>

          <div ref={trustRef} className="mt-8 flex flex-wrap gap-6 text-sm text-white/70">
            <span className="inline-flex items-center gap-2"><Check /> Free Shipping</span>
            <span className="inline-flex items-center gap-2"><Check /> IPX7 Waterproof</span>
            <span className="inline-flex items-center gap-2"><Check /> 30-Day Returns</span>
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