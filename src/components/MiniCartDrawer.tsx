import { Link } from "@tanstack/react-router";
import { PRODUCT } from "@/lib/product";
import { useCart } from "@/context/CartContext";

export default function MiniCartDrawer() {
  const { isDrawerOpen, closeDrawer, lastAdded, items } = useCart();
  const item = lastAdded ?? items[items.length - 1];

  if (!item) return null;

  const displayQty = lastAdded?.quantity ?? item.quantity ?? 1;
  const unitComparePrice =
    item.comparePrice ??
    (item.id === PRODUCT.id ? PRODUCT.comparePrice : item.price);
  const comparePrice = unitComparePrice * displayQty;
  const displayPrice = item.price * displayQty;

  return (
    <div
      className={`fixed inset-0 z-[70] ${
        isDrawerOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isDrawerOpen}
    >
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeDrawer}
      />

      <aside
        role="dialog"
        aria-modal="true"
        className={`absolute right-0 top-0 h-full w-full overflow-x-hidden bg-[#3f3a3a] text-white shadow-2xl transition-transform duration-300 ease-out sm:w-[80%] md:w-[420px] ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex h-full flex-col overflow-y-auto p-4 sm:p-6">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-emerald-300">
                <CheckIcon />
              </span>
              <span className="text-sm font-medium">Ajouté au panier</span>
            </div>
            <button
              onClick={closeDrawer}
              aria-label="Fermer le panier"
              className="rounded-md p-1 text-white/70 hover:text-white"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-white/10 bg-white p-1 sm:h-20 sm:w-20">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-base font-medium sm:text-lg">{item.name}</p>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <span className="line-through text-white/50">
                  ${comparePrice.toFixed(2)}
                </span>
                <span className="font-semibold text-[#f5dca8]">
                  ${displayPrice.toFixed(2)}
                </span>
              </div>
              <p className="mt-2 text-sm text-white/70">Couleur : {item.variant}</p>
              {displayQty > 1 && (
                <p className="mt-1 text-xs text-white/60">Qté : {displayQty}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/cart"
              onClick={closeDrawer}
              className="w-full rounded-md bg-white px-6 py-3 text-center text-xs font-medium tracking-[0.2em] uppercase text-[#3f3a3a] hover:bg-white/90 sm:w-auto"
            >
              Voir le panier
            </Link>
            <Link
              to="/cart"
              onClick={closeDrawer}
              className="w-full text-center text-sm font-medium text-white/80 hover:text-white sm:w-auto sm:text-right"
            >
              Passer à la caisse
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
