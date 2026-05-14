import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Panier — H2OFLOSS" },
      { name: "description", content: "Vérifiez votre panier et passez à la caisse." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, total, updateQty, removeItem, clear } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="container-dawn py-20 min-h-[60vh]">
        <h1 className="text-3xl md:text-[40px] mb-10">Votre panier</h1>

        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground mb-6">Votre panier est vide.</p>
            <Link
              to="/"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-[#333] transition-colors"
            >
              Continuer les achats
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
            <div className="border-t border-border">
              {items.map((item) => (
                <div
                  key={item.id + item.variant}
                  className="flex gap-4 py-6 border-b border-border"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover bg-surface"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.variant}</p>
                    <p className="text-sm mt-1">${item.price.toFixed(2)}</p>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQty(item.id, item.variant, item.quantity - 1)}
                          className="w-8 h-9"
                          aria-label="Diminuer"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.variant, item.quantity + 1)}
                          className="w-8 h-9"
                          aria-label="Augmenter"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.variant)}
                        className="text-xs underline text-muted-foreground hover:text-foreground"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <aside className="bg-surface p-8 self-start">
              <h2 className="text-xl mb-4">Récapitulatif de commande</h2>
              <div className="flex justify-between text-sm py-2 border-b border-border">
                <span>Sous-total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-border">
                <span>Livraison</span>
                <span>{total > 35 ? "Gratuite" : "$5.00"}</span>
              </div>
              <div className="flex justify-between text-base font-medium pt-4">
                <span>Total</span>
                <span>${(total + (total > 35 ? 0 : 5)).toFixed(2)}</span>
              </div>
              <button
                onClick={() => {
                  clear();
                  // Redirect user to external tracking/checkout URL
                  window.location.href =
                    "https://www.nhlv1trk.com/FG4FQZ7/C8MDTLF/?sub3=H2ofloss%202-in-1%20Oral%20Care%20Kit&sub4=https://h2ofloss.com/cdn/shop/files/1_fcde47ed-19ee-400e-ba06-03e20b190cc5_1728x.jpg?v=1762929933";
                }}
                className="mt-6 w-full bg-primary text-primary-foreground py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-[#333] transition-colors"
              >
                Passer à la caisse
              </button>
              <Link
                to="/"
                className="mt-3 block text-center text-sm underline text-muted-foreground"
              >
                Continuer les achats
              </Link>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
