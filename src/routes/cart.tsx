import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — H2OFLOSS" },
      { name: "description", content: "Review your cart and check out." },
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
        <h1 className="text-3xl md:text-[40px] mb-10">Your cart</h1>

        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground mb-6">Your cart is empty.</p>
            <Link
              to="/"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-[#333] transition-colors"
            >
              Continue shopping
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
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.variant, item.quantity + 1)}
                          className="w-8 h-9"
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.variant)}
                        className="text-xs underline text-muted-foreground hover:text-foreground"
                      >
                        Remove
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
              <h2 className="text-xl mb-4">Order summary</h2>
              <div className="flex justify-between text-sm py-2 border-b border-border">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-border">
                <span>Shipping</span>
                <span>{total > 35 ? "Free" : "$5.00"}</span>
              </div>
              <div className="flex justify-between text-base font-medium pt-4">
                <span>Total</span>
                <span>${(total + (total > 35 ? 0 : 5)).toFixed(2)}</span>
              </div>
              <button
                onClick={() => {
                  clear();
                  navigate({ to: "/thank-you" });
                }}
                className="mt-6 w-full bg-primary text-primary-foreground py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-[#333] transition-colors"
              >
                Checkout
              </button>
              <Link
                to="/"
                className="mt-3 block text-center text-sm underline text-muted-foreground"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
