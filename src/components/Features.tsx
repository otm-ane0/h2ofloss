import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FEATURES } from "@/lib/product";

gsap.registerPlugin(ScrollTrigger);

const ICONS = [
  // water
  <svg key="1" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 3s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11Z"/></svg>,
  // sonic
  <svg key="2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 12h2M8 8v8M12 5v14M16 8v8M20 12h-2"/></svg>,
  // shield drop
  <svg key="3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3Z"/></svg>,
  // battery
  <svg key="4" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="8" width="16" height="8"/><path d="M19 11v2h2v-2h-2Z"/></svg>,
  // modes
  <svg key="5" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="9"/><path d="M12 3v9l6 3"/></svg>,
  // leaf
  <svg key="6" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14ZM5 19l7-7"/></svg>,
];

export default function Features() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = ref.current?.querySelectorAll("[data-feature]");
      if (cards?.length) {
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        });
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={ref} className="bg-surface py-24 lg:py-28">
      <div className="container-dawn">
        <h2 className="text-center text-3xl md:text-[40px]">Conçu pour un nettoyage plus en profondeur.</h2>
        <p className="text-center mt-4 text-muted-foreground text-[18px] max-w-xl mx-auto">
          Deux appareils de niveau professionnel. Une routine simple.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mt-16">
          {FEATURES.map((f, i) => (
            <div key={f.title} data-feature>
              <div className="text-foreground">{ICONS[i]}</div>
              <h3 className="mt-4 text-[18px] font-medium">{f.title}</h3>
              <p className="mt-2 text-[15px] text-muted-foreground leading-[1.7]">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
