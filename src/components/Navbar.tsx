import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { href: "/#features", anchor: "#features", label: "Fonctionnalités" },
  { href: "/#how", anchor: "#how", label: "Comment ça marche" },
  { href: "/#reviews", anchor: "#reviews", label: "Avis" },
  { to: "/products", label: "Produits" },
] as const;

const HOVER_BG = "#3A3838";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();
  const matchRoute = useMatchRoute();
  const isHome = !!matchRoute({ to: "/" });

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  let navBg: string;
  let navText: string;
  let borderStyle: string;

  if (hovered) {
    navBg = HOVER_BG;
    navText = "#ffffff";
    borderStyle = "1px solid rgba(255,255,255,0.06)";
  } else if (isHome) {
    navBg = "transparent";
    navText = "#ffffff";
    borderStyle = "none";
  } else {
    navBg = "#ffffff";
    navText = "#1a1a1a";
    borderStyle = "1px solid #e5e0d8";
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
        ease: "power2.out",
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const resolveHref = (link: (typeof NAV_LINKS)[number]) => {
    if ("to" in link) return undefined;
    return isHome ? link.anchor : link.href;
  };

  return (
    <nav
      ref={navRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="hf-navbar relative z-40 transition-colors duration-300"
      style={{
        backgroundColor: navBg,
        borderBottom: borderStyle,
        color: navText,
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          nav.hf-navbar {
            background-color: #ffffff !important;
            color: #1a1a1a !important;
            border-bottom: 1px solid #e5e0d8 !important;
          }
        }
      `}</style>
      <div className="container-dawn flex items-center justify-between h-28">
        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex items-center"
          aria-label="Accueil H2OFLOSS"
        >
          <img
            src="/images/logoh2ofmoss-removebg-preview.png"
            alt="H2OFLOSS"
            className="h-24 w-auto"
          />
        </Link>

        {/* ── Desktop links ── */}
        <div className="hidden md:flex items-center gap-10 text-sm tracking-[0.15em] uppercase font-medium">
          {NAV_LINKS.map((link) =>
            "to" in link ? (
              <Link
                key={link.label}
                to={link.to}
                className="transition-opacity duration-200 hover:opacity-70"
                style={{ color: "inherit" }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={resolveHref(link)}
                className="transition-opacity duration-200 hover:opacity-70"
                style={{ color: "inherit" }}
              >
                {link.label}
              </a>
            ),
          )}
        </div>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-1">
          <Link
            to="/cart"
            aria-label={`Panier, ${count} articles`}
            className="relative inline-flex items-center justify-center w-10 h-10 hover:opacity-70 transition-opacity"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 7h12l-1.2 12.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7Z" />
              <path d="M9 7V5a3 3 0 1 1 6 0v2" />
            </svg>
            {count > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-medium flex items-center justify-center"
                style={{ backgroundColor: "#1DA1D4", color: "#fff" }}
              >
                {count}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 hover:opacity-70 transition-opacity"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile slide-down menu ── */}
      <div
        className="md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: mobileOpen ? 320 : 0 }}
      >
        <div
          className="flex flex-col gap-1 px-6 py-4"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            backgroundColor: HOVER_BG,
          }}
        >
          {NAV_LINKS.map((link) =>
            "to" in link ? (
              <Link
                key={link.label}
                to={link.to}
                onClick={closeMobile}
                className="py-3 text-sm tracking-wide hover:opacity-70 transition-opacity"
                style={{ color: "#fff" }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={resolveHref(link)}
                onClick={closeMobile}
                className="py-3 text-sm tracking-wide hover:opacity-70 transition-opacity"
                style={{ color: "#fff" }}
              >
                {link.label}
              </a>
            ),
          )}
        </div>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 top-[80px] bg-black/30 backdrop-blur-sm z-[-1]"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}
