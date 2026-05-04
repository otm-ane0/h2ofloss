import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Row {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  image: string;
  imageLeft: boolean;
  imageContain?: boolean;
}

const ROWS: Row[] = [
  {
    eyebrow: "Water Flosser",
    title: "Gum care that goes deeper.",
    body: "Pulsed water pressure reaches where brushing can't. Ideal for braces, implants, and crowns.",
    cta: "Shop Now",
    image: "/images/life1.jpg",
    imageLeft: true,
  },
  {
    eyebrow: "Sonic Toothbrush",
    title: "2 minutes. A lifetime of better smiles.",
    body: "Smart timer and zone reminders guide perfect brushing every time.",
    cta: "Learn More",
    image: "/images/dd.webp",
    imageLeft: false,
  },
  {
    eyebrow: "Combo System",
    title: "Together, they remove 2× more plaque.",
    body: "Use both daily for clinically superior results. Backed by dental professionals worldwide.",
    cta: "See Studies",
    image: "/images/life3.jpg",
    imageLeft: true,
    imageContain: true,
  },
];

export default function ImageWithText() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ref.current?.querySelectorAll("[data-row]").forEach((row) => {
        const img = row.querySelector("[data-img]");
        const txt = row.querySelector("[data-txt]");
        const dir = row.getAttribute("data-dir") === "left" ? -80 : 80;
        if (img) {
          gsap.from(img, {
            x: dir,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 75%" },
          });
        }
        if (txt) {
          gsap.from(txt, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 75%" },
          });
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="how" ref={ref}>
      {ROWS.map((r, i) => (
        <div
          key={i}
          data-row
          data-dir={r.imageLeft ? "left" : "right"}
          className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] bg-background"
        >
          <div
            data-img
            className={`relative min-h-[380px] lg:min-h-[520px] ${
              r.imageLeft ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <img
              src={r.image}
              alt={r.title}
              loading="lazy"
              className={`absolute inset-0 w-full h-full ${
                r.imageContain ? "object-contain" : "object-cover"
              }`}
            />
          </div>
          <div
            data-txt
            className={`flex items-center px-6 lg:px-16 py-16 ${
              r.imageLeft ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <div className="max-w-md">
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/70">
                {r.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl md:text-4xl">{r.title}</h2>
              <p className="mt-5 text-[16px] text-muted-foreground leading-[1.7]">{r.body}</p>
              <button className="mt-8 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-[#333] transition-colors">
                {r.cta}
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
