import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();

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
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-40 bg-background border-b transition-shadow duration-300 ${
        scrolled ? "border-border shadow-[0_1px_0_0_var(--border)]" : "border-border"
      }`}
    >
      <div className="container-dawn flex items-center justify-between h-16">
        <Link
          to="/"
          className="flex items-center"
          aria-label="H2OFLOSS home"
        >
          <img src="/images/ions.webp" alt="H2OFLOSS" className="h-16 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-10 text-sm tracking-wide text-foreground">
          <a href="#features" className="hover:opacity-60 transition-opacity">Features</a>
          <a href="#how" className="hover:opacity-60 transition-opacity">How It Works</a>
          <a href="#reviews" className="hover:opacity-60 transition-opacity">Reviews</a>
        </div>

        <Link
          to="/cart"
          aria-label={`Cart, ${count} items`}
          className="relative inline-flex items-center justify-center w-10 h-10 hover:opacity-60 transition-opacity"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 7h12l-1.2 12.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7Z" />
            <path d="M9 7V5a3 3 0 1 1 6 0v2" />
          </svg>
          {count > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
