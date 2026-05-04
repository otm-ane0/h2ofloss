export type ProductVariant = "Black" | "White" | "Pink";

export interface Product {
  id: string;
  vendor: string;
  name: string;
  subtitle: string;
  price: number;
  comparePrice: number;
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  images: { src: string; alt: string }[];
  inBox: string[];
}

export const PRODUCT: Product = {
  id: "h2ofloss-2in1",
  vendor: "H2OFLOSS",
  name: "2-in-1 Oral Care Kit",
  subtitle: "Water Flosser + Sonic Electric Toothbrush",
  price: 59.99,
  comparePrice: 89.99,
  rating: 4.6,
  reviewCount: 14,
  variants: ["Black", "White", "Pink"],
  images: [
    { src: "/images/1.webp", alt: "H2ofloss kit — front view" },
    { src: "/images/best.webp", alt: "H2ofloss kit — both devices" },
    { src: "/images/best2.webp", alt: "H2ofloss sonic toothbrush — side view" },
    { src: "/images/best3.webp", alt: "H2ofloss complete kit — flat lay" },
  ],
  inBox: [
    "Sonic Toothbrush",
    "Cordless Water Flosser",
    "300ml water tank",
    "5 nozzle tips",
    "4 brush heads",
    "USB-C charging cable",
    "Travel pouch",
  ],
};

export const FEATURES = [
  {
    title: "Water Flosser",
    body:
      "300ml tank, 20–110 PSI, 5 pressure modes. Deep-cleans between teeth and below the gumline.",
  },
  {
    title: "Sonic Toothbrush",
    body:
      "50° wide sweep angle. 2-min smart timer with 30-sec zone reminders.",
  },
  {
    title: "IPX7 Waterproof",
    body: "Shower-safe. Use it anywhere without worry.",
  },
  {
    title: "Long Battery Life",
    body: "Up to 90 days on one charge. Travel-ready USB-C.",
  },
  {
    title: "5 Cleaning Modes",
    body: "Daily, Gentle, Deep, Pulse, Custom. For every sensitivity.",
  },
  {
    title: "BPA-Free",
    body: "Safe materials. Dentist-recommended design.",
  },
];

export const FAQS = [
  {
    q: "Is it safe to use in the shower?",
    a: "Yes. Both devices are IPX7 waterproof and fully sealed.",
  },
  {
    q: "How long does the battery last?",
    a: "The toothbrush runs up to 90 days; the flosser up to 30 days on one USB-C charge.",
  },
  {
    q: "Can I use it with braces?",
    a: "Absolutely. The flosser's pulsed water stream cleans around brackets effectively.",
  },
  {
    q: "What comes in the box?",
    a: "Sonic toothbrush, water flosser, 300ml tank, 5 nozzle tips, 4 brush heads, USB-C cable, travel pouch.",
  },
  {
    q: "What is your return policy?",
    a: "30-day hassle-free returns. Full refund, no questions asked.",
  },
];

export const REVIEWS = [
  {
    stars: 5,
    text:
      "Honestly the best oral care upgrade I've made. My gums feel cleaner after a week than they did after a year of regular flossing.",
    name: "Sarah M. — Verified Purchase",
  },
  {
    stars: 5,
    text:
      "I have braces and this thing is a lifesaver. The pulsed water gets everything out, and the toothbrush is gentle but powerful.",
    name: "James R. — Verified Purchase",
  },
  {
    stars: 4,
    text:
      "Great battery life — charged it once in three weeks. Travel pouch is a nice touch. Would buy again.",
    name: "Priya K. — Verified Purchase",
  },
];
