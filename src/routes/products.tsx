import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useCallback, useEffect, useRef, type ReactNode } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyCartBar from "@/components/StickyCartBar";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/products")({
  component: ProductPage,
});

const PROCARE = {
  id: "h2ofloss-procare",
  name: "H2O ProCare",
  variant: "Blanc" as const,
  price: 59.99,
  comparePrice: 89.99,
};

const PRODUCT_IMAGES = [
  "https://h2ofloss.com/cdn/shop/files/1_fcde47ed-19ee-400e-ba06-03e20b190cc5_1296x.jpg?v=1762929933",
  "https://h2ofloss.com/cdn/shop/files/1-1_ebed588d-fbfe-47f3-ba60-d05c6601e1ca_1296x.jpg?v=1762929933",
  "https://h2ofloss.com/cdn/shop/files/1-4_5145f607-9a40-4676-8fea-d5a968d4d936_1296x.jpg?v=1762929933",
  "https://h2ofloss.com/cdn/shop/files/1-3_1a2ed5ce-7294-47dd-a870-94a693a33974_1296x.jpg?v=1762929933",
  "https://h2ofloss.com/cdn/shop/files/f19097017a71024c30fb6d5a6b22e9d8_1296x.jpg?v=1762929933",
  "https://h2ofloss.com/cdn/shop/files/777_1296x.jpg?v=1762929933",
];

/* ─────────────────────────────────────────────────────────────────────────
   STICKY LOGIC — pourquoi ça marche :

   Le navigateur calcule la durée du sticky à partir de la hauteur du
   PARENT DIRECT de l'élément sticky. Si ce parent est trop court (= hauteur
   du formulaire seulement), le sticky s'arrête tôt et laisse un blanc.

   Solution :
   1. Conteneur flex avec  align-items: stretch  →  les deux colonnes ont
      exactement la même hauteur, celle de la colonne gauche (= toutes les
      images empilées). La colonne droite s'étire jusqu'en bas.
   2. Le sticky est sur l'ENFANT intérieur de la colonne droite, pas sur
      la colonne elle-même. Il a maxHeight + overflowY pour scroller en
      interne si le formulaire est plus grand que la viewport.
   3. Résultat : le formulaire reste visible de haut en bas du scroll des
      images, sans aucun espace blanc.
───────────────────────────────────────────────────────────────────────── */

const NAVBAR_H = 0;
const ZOOM_FACTOR = 2.5;
const LENS_SIZE = 160;

/* ── Lightbox (fullscreen image overlay) ─────────────────────────────── */

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0,0,0,0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "zoom-out",
        animation: "lb-fade-in 0.25s ease",
      }}
    >
      <style>{`
        @keyframes lb-fade-in { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Fermer"
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "none",
          backgroundColor: "rgba(255,255,255,0.15)",
          color: "#fff",
          fontSize: 22,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(8px)",
          transition: "background-color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.3)")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")}
      >
        ✕
      </button>
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "90vw",
          maxHeight: "90vh",
          objectFit: "contain",
          cursor: "default",
          borderRadius: 4,
        }}
      />
    </div>
  );
}

/* ── ZoomableImage (hover lens + click to lightbox) ──────────────────── */

function ZoomableImage({
  src,
  alt,
  loading,
  onOpenLightbox,
  badge,
}: {
  src: string;
  alt: string;
  loading?: "eager" | "lazy";
  onOpenLightbox: () => void;
  badge?: ReactNode;
}) {
  return (
    <div
      className="relative"
      onClick={onOpenLightbox}
    >
      {badge}
      <img
        src={src}
        alt={alt}
        className="w-full block"
        style={{ height: "auto" }}
        loading={loading}
        draggable={false}
      />
    </div>
  );
}

function ProductPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <HeroSection />
        <PortableDesignSection />
        <FreshenBreathSection />
        <NozzlesSection />

        {/* Banner */}
        <section className="py-12 px-4 flex justify-center">
          <img
            src="https://h2ofloss.com/cdn/shop/articles/Black_and_White_Smiley_World_Smile_Day_Facebook_Post_1905_x_460_px_1_1296x.png?v=1748501111"
            alt="World Smile Day"
            className="max-w-4xl w-full"
            style={{ height: "auto" }}
            loading="lazy"
          />
        </section>
      </main>
      <Footer />
      <StickyCartBar />
    </>
  );
}

/* ── Accordion ───────────────────────────────────────────────────────── */

function AccordionItem({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-border">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-xs font-semibold uppercase tracking-widest">{title}</span>
        <span
          className="text-2xl leading-none shrink-0 select-none"
          style={{
            display: "inline-block",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.3s ease",
        }}
      >
        <div className="overflow-hidden">
          <div className="pb-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ── BuyForm ─────────────────────────────────────────────────────────── */

function BuyForm({
  qty,
  setQty,
  onAddToCart,
  onBuyNow,
}: {
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
  onAddToCart: () => void;
  onBuyNow: () => void;
}) {
  return (
    <div className="flex flex-col gap-5 px-6 lg:px-10 py-8">
      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">h2ofloss</p>
      <h1 className="text-3xl font-light tracking-tight leading-snug">H2O ProCare</h1>

      <div className="flex items-baseline flex-wrap gap-3">
        <span className="text-lg text-muted-foreground line-through">$89.99</span>
        <span className="text-3xl font-semibold">$59.59</span>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-border">
        {TRUST_BADGES.map(({ icon, label }) => (
          <div key={label} className="flex flex-col items-center text-center gap-2">
            <span style={{ color: "#5A31F4" }}>{icon}</span>
            <span className="text-[10px] text-muted-foreground leading-tight">{label}</span>
          </div>
        ))}
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-5">
        <span className="text-sm text-muted-foreground">Quantité</span>
        <div className="flex items-center border border-border">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center hover:bg-surface transition-colors text-lg select-none"
          >
            −
          </button>
          <span className="w-12 text-center text-sm font-medium tabular-nums">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-10 h-10 flex items-center justify-center hover:bg-surface transition-colors text-lg select-none"
          >
            +
          </button>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onAddToCart}
          className="w-full py-4 border border-foreground text-sm tracking-[0.18em] uppercase font-medium hover:bg-surface transition-colors"
        >
          Ajouter au panier
        </button>
        <button
          onClick={onBuyNow}
          className="w-full py-4 text-white text-sm tracking-[0.18em] uppercase font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#5A31F4" }}
          
        >
          
          Acheter maintenant
        </button>
      </div>

     

      {/* Accordions */}
      <AccordionItem title="Avis">
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#F59E0B">
                <path d="M12 2l2.09 6.26L20 9.27l-5 4.87 1.18 6.88L12 17.77l-4.18 3.25L9 14.14 4 9.27l5.91-1.01z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">4.8 · 127 avis</span>
        </div>
      </AccordionItem>

      <AccordionItem title="Caractéristiques">
        <ul className="flex flex-col gap-3">
          {FEATURES_LIST.map((f, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
              <span className="mt-1 shrink-0" style={{ color: "#5A31F4" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 12l5 5L20 6" />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>
      </AccordionItem>

      <AccordionItem title="Avantages">
        <ul className="flex flex-col gap-3">
          {BENEFITS_LIST.map((b, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
              <span className="mt-1 shrink-0" style={{ color: "#2D9954" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 12l5 5L20 6" />
                </svg>
              </span>
              {b}
            </li>
          ))}
        </ul>
      </AccordionItem>

      <AccordionItem title="Contenu du kit">
        <ul className="flex flex-col gap-3">
          {GOODS_LIST.map((g, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
              <span className="mt-1 shrink-0" style={{ color: "#5A31F4" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 12l5 5L20 6" />
                </svg>
              </span>
              {g}
            </li>
          ))}
        </ul>
      </AccordionItem>
    </div>
  );
}

function HeroSection() {
  const [qty, setQty] = useState(1);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const { addItem, openDrawer } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: PROCARE.id,
        name: PROCARE.name,
        variant: PROCARE.variant,
        price: PROCARE.price,
        comparePrice: PROCARE.comparePrice,
        image: PRODUCT_IMAGES[0],
      });
    }
    openDrawer();
  };

  const handleBuyNow = () => {
    navigate({ to: "/cart" });
  };

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  const saleBadge = (
    <span
      className="absolute top-4 left-4 z-10 text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1.5"
      style={{ backgroundColor: "#5A31F4" }}
    >
      PROMO
    </span>
  );

  return (
    <>
      {/* ══════════ DESKTOP (lg+) ══════════ */}
      <div
        className="hidden lg:flex"
        style={{ alignItems: "stretch" }}
      >
        {/* ── Colonne gauche : images empilées, scroll naturel ── */}
        <div style={{ width: "60%", flexShrink: 0 }}>
          {PRODUCT_IMAGES.map((src, i) => (
            <ZoomableImage
              key={i}
              src={src}
              alt={`H2O ProCare — vue ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              onOpenLightbox={() => setLightboxIdx(i)}
              badge={i === 0 ? saleBadge : undefined}
            />
          ))}
        </div>

        {/* ── Colonne droite : sticky form ── */}
        <div style={{ width: "40%", position: "relative" }}>
          <div
            style={{
              position: "sticky",
              top: NAVBAR_H,
              maxHeight: `calc(100vh - ${NAVBAR_H}px)`,
              overflowY: "auto",
              scrollbarWidth: "none",
            }}
          >
            <style>{`.hf-form::-webkit-scrollbar { display: none }`}</style>
            <div className="hf-form">
              <BuyForm qty={qty} setQty={setQty} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ MOBILE (<lg) ══════════ */}
      <div className="lg:hidden">
        {PRODUCT_IMAGES.map((src, i) => (
          <ZoomableImage
            key={i}
            src={src}
            alt={`H2O ProCare — vue ${i + 1}`}
            loading={i === 0 ? "eager" : "lazy"}
            onOpenLightbox={() => setLightboxIdx(i)}
            badge={i === 0 ? saleBadge : undefined}
          />
        ))}
        <BuyForm qty={qty} setQty={setQty} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
      </div>

      {/* ══════════ LIGHTBOX ══════════ */}
      {lightboxIdx !== null && (
        <Lightbox
          src={PRODUCT_IMAGES[lightboxIdx]}
          alt={`H2O ProCare — vue ${lightboxIdx + 1}`}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}


/* ── Data ────────────────────────────────────────────────────────────── */

const FEATURES_LIST = [
  "Élimine efficacement la plaque et les résidus alimentaires — Votre pression, votre choix : cinq réglages ajustables vous permettent de choisir entre un nettoyage doux ou un nettoyage en profondeur puissant.",
  "Haleine fraîche toute la journée – 360° rotative élimine les bactéries et les particules alimentaires, gardant votre bouche fraîche.",
  "Utilisez-le sous la douche – Étanche et facile à utiliser, pour une expérience de nettoyage sans tracas.",
  "Une seule charge, un mois d'utilisation – Jusqu'à 30 jours d'autonomie, le compagnon idéal pour votre routine quotidienne et vos voyages.",
];

const BENEFITS_LIST = [
  "Nettoie efficacement autour des bagues, couronnes et implants, réduisant l'accumulation et améliorant l'hygiène bucco-dentaire globale.",
  "La pression de l'eau stimule les gencives, augmentant la circulation sanguine pour renforcer les tissus gingivaux.",
  "La formule naturelle à la cannelle neutralise la mauvaise haleine instantanément et garde votre bouche fraîche pendant des heures, assurant confiance tout au long de la journée.",
  "Un partenaire indispensable pour les personnes portant des bagues, des gouttières ou d'autres appareils orthodontiques.",
];

const GOODS_LIST = [
  "Hydropulseur sans fil × 1",
  "Câble de charge × 1",
  "Manuel d'utilisation × 2",
  "Sac de voyage × 1",
  "Pastilles de nettoyage du réservoir × 1",
  "Pastilles rafraîchissantes de recharge × 1",
  "Jeu de buses hydropulseur × 3",
];

/* ── FeatureRow ──────────────────────────────────────────────────────── */

function FeatureRow({
  imageSrc,
  imageAlt,
  imageLeft,
  bg,
  children,
}: {
  imageSrc: string;
  imageAlt: string;
  imageLeft: boolean;
  bg?: string;
  children: ReactNode;
}) {
  const imgCol = (
    <div className="relative min-h-[340px] lg:min-h-[560px]">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );

  const textCol = (
    <div className="flex flex-col justify-center gap-6 px-8 lg:px-16 py-14">
      {children}
    </div>
  );

  return (
    <section style={{ backgroundColor: bg ?? "transparent" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Mobile : image en haut, texte en bas */}
        <div className="lg:hidden">{imgCol}</div>
        <div className="lg:hidden">{textCol}</div>

        {/* Desktop : respect imageLeft */}
        {imageLeft ? (
          <>
            <div className="hidden lg:block">{imgCol}</div>
            <div className="hidden lg:flex flex-col justify-center gap-6 px-8 lg:px-16 py-14">
              {children}
            </div>
          </>
        ) : (
          <>
            <div className="hidden lg:flex flex-col justify-center gap-6 px-8 lg:px-16 py-14">
              {children}
            </div>
            <div className="hidden lg:block">{imgCol}</div>
          </>
        )}
      </div>
    </section>
  );
}

/* ── Section 2A: Portable Design ─────────────────────────────────────── */

function PortableDesignSection() {
  return (
    <FeatureRow
      imageSrc="https://h2ofloss.com/cdn/shop/files/7-3_68cb9828-3754-49aa-afaa-e8d0485e0bb8.jpg?v=1745652951"
      imageAlt="H2O ProCare — portable design"
      imageLeft={true}
    >
      <div>
        <h2 className="text-3xl lg:text-4xl font-light mb-3">Design Portable</h2>
        <div className="w-10 h-0.5" style={{ backgroundColor: "#5A31F4" }} />
      </div>
      <ul className="flex flex-col gap-5">
        {[
          "Un nettoyage en déplacement commence par la portabilité. Notre hydropulseur portable vous permet de prendre soin de vos dents où que vous soyez.",
          "Conçu pour une vie en mouvement, il s'intègre parfaitement à vos déplacements quotidiens. Son design compact se glisse facilement dans les sacs à dos, sacs à main ou bagages.",
          "Son corps léger ne vous alourdira pas lors de vos trajets ou aventures. Conçu pour être utilisé dans les salles de bain d'hôtel, en avion ou même en voiture pour un nettoyage rapide à tout moment.",
        ].map((text, i) => (
          <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0 mt-[0.45rem]"
              style={{ backgroundColor: "#5A31F4" }}
            />
            {text}
          </li>
        ))}
      </ul>
    </FeatureRow>
  );
}

/* ── Section 2B: Freshen Your Breath ─────────────────────────────────── */

function FreshenBreathSection() {
  return (
    <FeatureRow
      imageSrc="https://h2ofloss.com/cdn/shop/files/2-3_e46b7da9-1c6d-4d9e-8277-75f17825f1d3.jpg?v=1744878426"
      imageAlt="h2ofloss Breath Freshener Tabs — Cinnamon Flavor"
      imageLeft={false}
    >
      <div>
        <h2 className="text-3xl lg:text-4xl font-light mb-3">Rafraîchissez votre haleine</h2>
        <div className="w-10 h-0.5" style={{ backgroundColor: "#2D9954" }} />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Un comprimé rafraîchissant d'haleine démarre instantanément un voyage magique de fraîcheur, vous permettant de discuter en toute confiance !
      </p>
      <ul className="flex flex-col gap-4">
        <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
          <GreenCheck />
          <span>
            <span className="font-semibold text-foreground">Action Rapide : </span>
            En quelques minutes seulement, le comprimé rafraîchissant agit rapidement et libère des facteurs de fraîcheur hautement efficaces.
          </span>
        </li>
        <li className="flex items-center gap-3 text-sm text-muted-foreground">
          <GreenCheck />Fraîcheur longue durée
        </li>
        <li className="flex items-center gap-3 text-sm text-muted-foreground">
          <GreenCheck />Pratique à transporter
        </li>
      </ul>
    </FeatureRow>
  );
}

/* ── Section 2C: Multiple Replaceable Nozzles ────────────────────────── */

function NozzlesSection() {
  return (
    <FeatureRow
      imageSrc="https://h2ofloss.com/cdn/shop/files/7-1_f8d742b0-9bc1-4579-8ab9-334cd605ed13.jpg?v=1754039134"
      imageAlt="Multiple replaceable nozzles"
      imageLeft={true}
    >
      <div>
        <h2 className="text-3xl lg:text-4xl font-light mb-3">Buses Interchangeables</h2>
        <div className="w-10 h-0.5" style={{ backgroundColor: "#5A31F4" }} />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Personnalisez vos soins bucco-dentaires avec une variété de buses spécialisées conçues pour répondre à différents besoins de nettoyage.
      </p>
      <ul className="flex flex-col gap-4">
        {[
          "Plusieurs buses pour un nettoyage en profondeur : buse parodontale, buse orthodontique, buse standard, buse brosse à dents, buse blanchiment et gratte-langue.",
          "Quick replacement for better hygiene — ideal for family use.",
          "Buses durables et de haute qualité pour un nettoyage sûr et efficace.",
        ].map((text, i) => (
          <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
            <span className="shrink-0 mt-[0.2rem]" style={{ color: "#5A31F4" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 12l5 5L20 6" />
              </svg>
            </span>
            {text}
          </li>
        ))}
      </ul>
    </FeatureRow>
  );
}

/* ── Helpers ─────────────────────────────────────────────────────────── */

function GreenCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D9954" strokeWidth="2.5" className="shrink-0">
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

const TRUST_BADGES = [
  {
    label: "Certifié professionnel",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l2.09 6.26L20 9.27l-5 4.87 1.18 6.88L12 17.77l-4.18 3.25L9 14.14 4 9.27l5.91-1.01z" />
      </svg>
    ),
  },
  {
    label: "Matériaux écologiques",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 22c1.25-1.25 2.5-2.5 3.75-3.75C7 17 8.5 16.5 10 17c2 .67 4.33.33 6-1 2-1.6 3-4 3-6.5C19 5 15.5 2 12 2 7 2 4 6 4 10c0 1.5.5 3 1.5 4.25" />
      </svg>
    ),
  },
  {
    label: "Livraison rapide",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
        <rect x="9" y="11" width="14" height="10" rx="2" />
        <circle cx="12" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
      </svg>
    ),
  },
  {
    label: "Fabricant de référence",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 20h20M4 20V10l6-6 6 6v10" />
        <rect x="9" y="14" width="6" height="6" />
      </svg>
    ),
  },
];