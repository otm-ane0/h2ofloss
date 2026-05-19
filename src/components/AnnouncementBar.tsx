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
      className="w-full text-[11px] tracking-[0.2em] uppercase text-center py-2.5 font-medium"
      style={{ backgroundColor: "#ffffff", color: "#1DA1D4" }}
    >
      Welcome to h2ofloss!
    </div>
  );
}
