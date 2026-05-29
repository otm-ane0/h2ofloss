import { Outlet, Link, createRootRoute, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { CartProvider } from "@/context/CartContext";
import MiniCartDrawer from "@/components/MiniCartDrawer";
import { ttqPage } from "@/lib/tiktok";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-light text-foreground">404</h1>
        <h2 className="mt-4 text-xl">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-primary px-6 py-3 text-xs tracking-[0.2em] uppercase font-medium text-primary-foreground hover:bg-[#333] transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <CartProvider>
      <PixelRouteTracker />
      <Outlet />
      <MiniCartDrawer />
    </CartProvider>
  );
}

function PixelRouteTracker() {
  const location = useRouterState({ select: (state) => state.location });
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    ttqPage();
  }, [location.pathname, location.search, location.hash]);

  return null;
}
