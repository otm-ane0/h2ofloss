import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  "4.6★ Rating",
  "10,000+ Happy Customers",
  "Dentist Recommended",
  "IPX7 Certified",
  "BPA-Free",
];

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = ref.current?.querySelectorAll("[data-item]");
      if (items?.length) {
        gsap.from(items, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        });
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="border-y border-border bg-background py-6">
      <div className="container-dawn flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {ITEMS.map((t) => (
          <span
            key={t}
            data-item
            className="text-xs sm:text-sm tracking-[0.18em] uppercase text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
