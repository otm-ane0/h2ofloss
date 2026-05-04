import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCT, REVIEWS } from "@/lib/product";

gsap.registerPlugin(ScrollTrigger);

const BREAKDOWN = [
  { stars: 5, pct: 77 },
  { stars: 4, pct: 9 },
  { stars: 3, pct: 0 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 0 },
];

export default function Reviews() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = ref.current?.querySelectorAll("[data-review]");
      if (cards?.length) {
        gsap.from(cards, {
          opacity: 0,
          y: 30,
          scale: 0.97,
          stagger: 0.2,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        });
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="reviews" ref={ref} className="bg-background py-24 lg:py-28">
      <div className="container-dawn">
        <h2 className="text-center text-3xl md:text-[40px]">What our customers say.</h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 max-w-3xl mx-auto items-center">
          <div className="text-center md:text-left">
            <div className="text-6xl font-light">{PRODUCT.rating.toFixed(1)}</div>
            <div className="mt-2 flex justify-center md:justify-start">
              <Stars rating={PRODUCT.rating} />
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              Based on {PRODUCT.reviewCount} reviews
            </div>
          </div>
          <div className="space-y-2">
            {BREAKDOWN.map((b) => (
              <div key={b.stars} className="flex items-center gap-3 text-sm">
                <span className="w-6 text-muted-foreground">{b.stars}★</span>
                <div className="flex-1 h-1 bg-border">
                  <div className="h-full bg-foreground" style={{ width: `${b.pct}%` }} />
                </div>
                <span className="w-10 text-right text-muted-foreground">{b.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-14 border-border" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {REVIEWS.map((r, i) => (
            <div key={i} data-review>
              <Stars rating={r.stars} />
              <p className="mt-4 text-[16px] leading-[1.7]">"{r.text}"</p>
              <p className="mt-3 text-sm text-muted-foreground/80">{r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="inline-flex gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < full ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l3 7h7l-5.5 4.5L18 22l-6-4-6 4 1.5-8.5L2 9h7l3-7Z" />
        </svg>
      ))}
    </span>
  );
}
