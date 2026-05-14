import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ProductVariant } from "@/lib/product";

export interface CartItem {
  id: string;
  name: string;
  variant: ProductVariant;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (id: string, variant: ProductVariant) => void;
  updateQty: (id: string, variant: ProductVariant, qty: number) => void;
  clear: () => void;
  isDrawerOpen: boolean;
  lastAdded: CartItem | null;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "h2ofloss_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartItem | null>(null);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, hydrated]);

  const addItem: CartContextValue["addItem"] = (item, qty = 1) => {
    setLastAdded({ ...item, quantity: qty });
    setIsDrawerOpen(true);
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id && p.variant === item.variant);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
        return next;
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };

  const removeItem: CartContextValue["removeItem"] = (id, variant) => {
    setItems((prev) => prev.filter((p) => !(p.id === id && p.variant === variant)));
  };

  const updateQty: CartContextValue["updateQty"] = (id, variant, qty) => {
    setItems((prev) =>
      prev
        .map((p) =>
          p.id === id && p.variant === variant ? { ...p, quantity: Math.max(1, qty) } : p,
        )
        .filter((p) => p.quantity > 0),
    );
  };

  const clear = () => setItems([]);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const total = items.reduce((s, i) => s + i.quantity * i.price, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        total,
        addItem,
        removeItem,
        updateQty,
        clear,
        isDrawerOpen,
        lastAdded,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
