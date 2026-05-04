import { useState } from "react";
import { Link } from "@tanstack/react-router";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="bg-surface pt-20 pb-10">
      <div className="container-dawn">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-14">
          <div>
            <p className="text-[18px] font-medium tracking-[0.18em]">H2OFLOSS</p>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs leading-[1.7]">
              Premium oral care, engineered for a deeper clean. Made with care, backed for life.
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-4">Quick links</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">FAQ</a></li>
              <li><a href="#" className="hover:text-foreground">Returns</a></li>
              <li><a href="#" className="hover:text-foreground">Track Order</a></li>
              <li><a href="#" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-4">Newsletter</p>
            <p className="text-sm text-muted-foreground mb-3">
              Tips, offers, and product news.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="flex"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 bg-background border border-border px-3 py-3 text-sm focus:outline-none focus:border-foreground"
              />
              <button className="bg-primary text-primary-foreground px-5 text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#333] transition-colors">
                {submitted ? "✓" : "Join"}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} H2OFLOSS. All rights reserved.</p>
          <div className="flex items-center gap-3 opacity-70">
            <PayBadge label="VISA" />
            <PayBadge label="MC" />
            <PayBadge label="PayPal" />
            <PayBadge label="Pay" />
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/cart" className="text-xs underline text-muted-foreground">View cart</Link>
        </div>
      </div>
    </footer>
  );
}

function PayBadge({ label }: { label: string }) {
  return (
    <span className="border border-border bg-background px-2 py-1 text-[10px] tracking-widest font-medium">
      {label}
    </span>
  );
}
