import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { PRODUCT, type ProductVariant } from "@/lib/product";
import { useCart } from "@/context/CartContext";

export default function BuyBox() {
  const { addItem } = useCart();
  const [variant, setVariant] = useState<ProductVariant>("Noir");
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const mainImgRef = useRef<HTMLImageElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [openAcc, setOpenAcc] = useState<string | null>("box");
  const variantSwatches: Record<ProductVariant, string> = {
    Noir: "#1a1a1a",
    Blanc: "#f4f0eb",
    Rose: "#f7a1c4",
  };

  const swapImage = (idx: number) => {
    if (idx === activeImg || !mainImgRef.current) return;
    gsap.to(mainImgRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setActiveImg(idx);
        requestAnimationFrame(() => {
          if (mainImgRef.current) gsap.to(mainImgRef.current, { opacity: 1, duration: 0.3 });
        });
      },
    });
  };

  const handleAdd = () => {
    addItem(
      {
        id: PRODUCT.id,
        name: PRODUCT.name,
        variant,
        price: PRODUCT.price,
        image: PRODUCT.images[0].src,
      },
      qty,
    );
    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { scale: 0.96 },
        { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" },
      );
    }
  };

  return (
    <section id="buy" className="bg-background py-24 lg:py-28">
      <div className="container-dawn grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="aspect-square w-full bg-surface overflow-hidden">
            <img
              ref={mainImgRef}
              src={PRODUCT.images[activeImg].src}
              alt={PRODUCT.images[activeImg].alt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {PRODUCT.images.map((img, i) => (
              <button
                key={img.src}
                onClick={() => swapImage(i)}
                aria-label={`Voir l'image ${i + 1}`}
                className={`aspect-square overflow-hidden border ${
                  i === activeImg ? "border-foreground" : "border-border"
                }`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-24 self-start">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/70 mb-2">
            {PRODUCT.vendor}
          </p>
          <h1 className="text-3xl md:text-[28px] font-normal">{PRODUCT.name}</h1>
          <p className="mt-1 text-muted-foreground">{PRODUCT.subtitle}</p>

          <a href="#reviews" className="mt-3 flex items-center gap-2 text-sm hover:opacity-60">
            <Stars rating={PRODUCT.rating} />
            <span>{PRODUCT.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">· ({PRODUCT.reviewCount} avis)</span>
          </a>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-2xl">${PRODUCT.price.toFixed(2)}</span>
            <span className="line-through text-muted-foreground">${PRODUCT.comparePrice.toFixed(2)}</span>
            <span className="bg-gold text-white text-xs px-2 py-0.5 tracking-wide font-medium">
              Économisez ${(PRODUCT.comparePrice - PRODUCT.price).toFixed(0)}
            </span>
          </div>

          <hr className="my-6 border-border" />

          <div>
            <p className="text-sm mb-3">
              Couleur — <span className="text-muted-foreground">{variant}</span>
            </p>
            <div className="flex gap-3">
              {PRODUCT.variants.map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  aria-label={`Couleur ${v}`}
                  className={`w-9 h-9 rounded-full border ${
                    variant === v ? "ring-2 ring-foreground ring-offset-2" : "border-border"
                  }`}
                  style={{ background: variantSwatches[v] }}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-12 hover:bg-surface"
                aria-label="Diminuer la quantité"
              >
                −
              </button>
              <span className="w-10 text-center">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-10 h-12 hover:bg-surface"
                aria-label="Augmenter la quantité"
              >
                +
              </button>
            </div>
          </div>

          <button
            ref={btnRef}
            onClick={handleAdd}
            className="mt-6 w-full bg-primary text-primary-foreground py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-[#333] transition-colors"
          >
            Ajouter au panier — ${(PRODUCT.price * qty).toFixed(2)}
          </button>

          <p className="text-sm text-muted-foreground mt-3">
            Livraison gratuite · Expédié sous 1 à 2 jours ouvrés en général
          </p>

          <div className="mt-8 border-t border-border">
            {[
              { id: "box", title: "Contenu de la boîte", body: PRODUCT.inBox.join(" · ") },
              {
                id: "ship",
                title: "Livraison et retours",
                body: "Livraison gratuite pour les commandes de plus de 35 $ aux États-Unis. Retours sous 30 jours, sans tracas — remboursement complet, sans questions.",
              },
              {
                id: "spec",
                title: "Caractéristiques",
                body: "Pression : 20–110 PSI · Réservoir : 300 ml sans BPA · Batterie : 90 jours brosse à dents / 30 jours hydropulseur · Charge USB-C · Étanche IPX7.",
              },
            ].map((acc) => (
              <Accordion
                key={acc.id}
                title={acc.title}
                body={acc.body}
                open={openAcc === acc.id}
                onToggle={() => setOpenAcc(openAcc === acc.id ? null : acc.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Accordion({
  title,
  body,
  open,
  onToggle,
}: {
  title: string;
  body: string;
  open: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    if (open) {
      gsap.fromTo(
        contentRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power2.inOut" },
      );
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [open]);

  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-[15px] font-medium">{title}</span>
        <span className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <div ref={contentRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <p className="pb-5 text-[15px] text-muted-foreground leading-[1.7]">{body}</p>
      </div>
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="inline-flex" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < full ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2l3 7h7l-5.5 4.5L18 22l-6-4-6 4 1.5-8.5L2 9h7l3-7Z" />
        </svg>
      ))}
    </span>
  );
}
