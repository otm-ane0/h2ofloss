import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FAQS } from "@/lib/product";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-surface py-24 lg:py-28">
      <div className="container-dawn">
        <h2 className="text-center text-3xl md:text-[40px]">Des questions ? Nous avons les réponses.</h2>
        <div className="max-w-2xl mx-auto mt-12">
          {FAQS.map((f, i) => (
            <FAQItem
              key={i}
              q={f.q}
              a={f.a}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (open) {
      gsap.fromTo(
        ref.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power2.inOut" },
      );
    } else {
      gsap.to(ref.current, { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" });
    }
  }, [open]);

  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-[16px] md:text-[17px]">{q}</span>
        <span className={`text-xl transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <div ref={ref} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <p className="pb-5 text-[15px] text-muted-foreground leading-[1.7]">{a}</p>
      </div>
    </div>
  );
}
