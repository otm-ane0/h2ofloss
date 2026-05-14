export type ProductVariant = "Noir" | "Blanc" | "Rose";

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
  name: "Kit de soins bucco-dentaires 2-en-1",
  subtitle: "Hydropulseur + brosse à dents sonique électrique",
  price: 59.99,
  comparePrice: 89.99,
  rating: 4.6,
  reviewCount: 14,
  variants: ["Noir", "Blanc", "Rose"],
  images: [
    { src: "/images/1.webp", alt: "Kit H2OFLOSS — vue de face" },
    { src: "/images/best.webp", alt: "Kit H2OFLOSS — les deux appareils" },
    { src: "/images/best2.webp", alt: "Brosse à dents sonique H2OFLOSS — vue de côté" },
    { src: "/images/best3.webp", alt: "Kit complet H2OFLOSS — vue à plat" },
  ],
  inBox: [
    "Brosse à dents sonique",
    "Hydropulseur sans fil",
    "Réservoir d'eau 300 ml",
    "5 embouts",
    "4 têtes de brosse",
    "Câble de charge USB-C",
    "Pochette de voyage",
  ],
};

export const FEATURES = [
  {
    title: "Hydropulseur",
    body:
      "Réservoir 300 ml, 20–110 PSI, 5 modes de pression. Nettoie en profondeur entre les dents et sous la gencive.",
  },
  {
    title: "Brosse à dents sonique",
    body:
      "Angle de balayage large de 50°. Minuteur intelligent de 2 min avec rappels de zone de 30 s.",
  },
  {
    title: "Étanche IPX7",
    body: "Utilisable sous la douche. Utilisez-le partout sans souci.",
  },
  {
    title: "Autonomie longue durée",
    body: "Jusqu'à 90 jours sur une charge. USB-C prêt pour les voyages.",
  },
  {
    title: "5 modes de nettoyage",
    body: "Quotidien, Doux, Profond, Pulse, Personnalisé. Pour chaque sensibilité.",
  },
  {
    title: "Sans BPA",
    body: "Matériaux sûrs. Conception recommandée par les dentistes.",
  },
];

export const FAQS = [
  {
    q: "Est-ce sûr d'utiliser sous la douche ?",
    a: "Oui. Les deux appareils sont étanches IPX7 et totalement scellés.",
  },
  {
    q: "Quelle est l'autonomie de la batterie ?",
    a: "La brosse à dents tient jusqu'à 90 jours ; l'hydropulseur jusqu'à 30 jours sur une charge USB-C.",
  },
  {
    q: "Puis-je l'utiliser avec un appareil dentaire ?",
    a: "Absolument. Le jet d'eau pulsé nettoie efficacement autour des bagues.",
  },
  {
    q: "Que contient la boîte ?",
    a: "Brosse à dents sonique, hydropulseur, réservoir 300 ml, 5 embouts, 4 têtes de brosse, câble USB-C, pochette de voyage.",
  },
  {
    q: "Quelle est votre politique de retour ?",
    a: "Retours sous 30 jours, sans tracas. Remboursement complet, sans questions.",
  },
];

export const REVIEWS = [
  {
    stars: 5,
    text:
      "Honnêtement, la meilleure amélioration de soins bucco-dentaires que j'ai faite. Mes gencives sont plus propres en une semaine qu'en un an de fil dentaire classique.",
    name: "Sarah M. — Achat vérifié",
  },
  {
    stars: 5,
    text:
      "J'ai un appareil et ce produit m'a sauvé. Le jet pulsé enlève tout, et la brosse est douce mais puissante.",
    name: "James R. — Achat vérifié",
  },
  {
    stars: 4,
    text:
      "Excellente autonomie — chargée une fois en trois semaines. La pochette de voyage est un vrai plus. Je rachèterais.",
    name: "Priya K. — Achat vérifié",
  },
];
