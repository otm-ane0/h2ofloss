import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AnnouncementBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { y: -40, opacity: 0, duration: 0.5, ease: "power2.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full bg-primary text-primary-foreground text-[11px] tracking-[0.2em] uppercase text-center py-2.5 font-medium"
    >
      Free shipping on orders over $35 · 30-day returns
    </div>
  );
}
