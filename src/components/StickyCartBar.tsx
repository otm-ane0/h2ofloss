import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCT } from "@/lib/product";
import { useCart } from "@/context/CartContext";

gsap.registerPlugin(ScrollTrigger);

export default function StickyCartBar() {
  const ref = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (!ref.current) return;
    gsap.set(ref.current, { yPercent: 100 });

    const hero = document.querySelector("[data-hero]");
    if (!hero) return;

    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: "bottom top",
      onEnter: () => gsap.to(ref.current, { yPercent: 0, duration: 0.4, ease: "power2.out" }),
      onLeaveBack: () => gsap.to(ref.current, { yPercent: 100, duration: 0.4, ease: "power2.in" }),
    });

    return () => trigger.kill();
  }, []);

  const handleAdd = () => {
    addItem({
      id: PRODUCT.id,
      name: PRODUCT.name,
      variant: "Noir",
      price: PRODUCT.price,
      image: PRODUCT.images[0].src,
    });
  };

  return (
    <div
      ref={ref}
      className="fixed bottom-0 left-0 right-0 z-50 bg-primary text-primary-foreground md:hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 gap-3">
        <div className="min-w-0">
          <p className="text-sm truncate">{PRODUCT.name}</p>
          <p className="text-xs opacity-70">${PRODUCT.price.toFixed(2)}</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-white text-primary text-xs tracking-[0.2em] uppercase font-medium py-3 px-6"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
