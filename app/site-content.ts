import home from "./content/home.txt?raw";
import about from "./content/about.txt?raw";
import contact from "./content/contact.txt?raw";
import packages from "./content/tour-packages.txt?raw";
import kandy from "./content/kandy-city-tour.txt?raw";
import sigiriya from "./content/sigiriya-day-tour.txt?raw";
import nuwaraEliya from "./content/nuwara-eliya-day-tour.txt?raw";
import kitulgala from "./content/kitulgala-day-tour.txt?raw";
import polonnaruwa from "./content/polonnaruwa-day-tour.txt?raw";
import fourDay from "./content/4-day-tour.txt?raw";
import sevenDay from "./content/7-day-tour.txt?raw";
import eightDay from "./content/8-day-tour.txt?raw";
import tenDay from "./content/10-day-tour.txt?raw";
import fourteenDay from "./content/14-day-tour.txt?raw";

export type PageKind = "home" | "about" | "packages" | "contact" | "tour";

export type SitePageData = {
  slug: string;
  kind: PageKind;
  title: string;
  kicker: string;
  intro: string;
  raw: string;
  image: string;
  imageAlt: string;
  startAt: number;
};

const designDirectionWords = /(?:layout|image|slider|carousel|grid|card|section|CTA|button|photos?|form|background|placeholder|visual recommendation)/i;

function prepared(raw: string) {
  return raw.split(/\r?\n/).map((sourceLine) => {
    const line = sourceLine.trim();
    if (line.startsWith("Hero Section (") || line.startsWith("Map Section (")) return "";
    if (line.startsWith("(") && line.endsWith(")") && designDirectionWords.test(line)) return "";
    const intro = line.match(/^(.*?)\s*\((?:Section intro text|Section intro)\)\s*(.+)$/i);
    if (intro) return `${intro[1]}\n${intro[2]}`;
    return line
      .replace(/\s*\((?:Primary Button|Floating\/Secondary Button|Button|Buttons|Button linking[^)]*)\)/gi, "")
      .replace(/\s*\(([^)]*)\)\s*$/g, (match, note: string) => designDirectionWords.test(note) ? "" : match)
      .trim();
  }).join("\n");
}

export const dayTours = [
  {
    slug: "kandy-city-tour",
    title: "Kandy City Tour | Private Experience with Minoli Lanka Tours",
    meta: "5–8 hours",
    image: "/images/kandy.jpg",
    blurb: "Temple of the Tooth, Kandy Lake, Big Buddha, Royal Botanical Gardens & Kandyan Cultural Dance Show.",
  },
  {
    slug: "sigiriya-day-tour-from-kandy",
    title: "Sigiriya Day Tour",
    meta: "Full day · 10–12 hours",
    image: "/images/sigiriya.jpg",
    blurb: "Dambulla Cave Temples, Sigiriya Rock, Spice Garden & optional Minneriya Safari.",
  },
  {
    slug: "nuwara-eliya-day-tour-from-kandy",
    title: "Nuwara Eliya Day Tour",
    meta: "Full day · 9–11 hours",
    image: "/images/tea-country.jpg",
    blurb: "Ramboda Falls, tea plantations, “Little England” colonial charm & Gregory Lake.",
  },
  {
    slug: "kitulgala-day-tour-from-kandy",
    title: "Kitulgala Day Tour",
    meta: "Full day · 8–10 hours",
    image: "/images/train.jpg",
    blurb: "White-water rafting on the Kelani River, rainforest hikes & riverside relaxation.",
  },
  {
    slug: "polonnaruwa-day-tour-from-kandy",
    title: "Polonnaruwa Day Tour",
    meta: "Full day · 9–11 hours",
    image: "/images/kandy.jpg",
    blurb: "UNESCO Ancient City ruins, Gal Vihara Buddha statues & sacred monuments.",
  },
] as const;

export const roundTours = [
  {
    slug: "sri-lanka-classic-highlights-4-days",
    title: "Sri Lanka Classic Highlights",
    meta: "4 Days / 3 Nights",
    image: "/images/elephants.jpg",
    blurb: "Pinnawala, Sigiriya, Minneriya, Kandy and the Nuwara Eliya tea country.",
    route: "Airport → Pinnawala → Kandy → Sigiriya → Nuwara Eliya → Airport",
  },
  {
    slug: "sri-lanka-grand-highlights-7-days",
    title: "Sri Lanka Grand Highlights",
    meta: "7 Days / 6 Nights",
    image: "/images/train.jpg",
    blurb: "Culture, nature and the coast in one unforgettable week.",
    route: "Airport → Sigiriya → Kandy → Nuwara Eliya → Ella → Yala → Mirissa → Airport",
  },
  {
    slug: "sri-lanka-coastal-cultural-odyssey-8-days",
    title: "Sri Lanka Coastal & Cultural Odyssey",
    meta: "8 Days / 7 Nights",
    image: "/images/beach.jpg",
    blurb: "A beautiful balance of southern beaches, wildlife, highlands and heritage.",
    route: "Airport → Bentota → Mirissa → Yala → Ella → Kandy → Sigiriya → Airport",
  },
  {
    slug: "sri-lanka-complete-discovery-10-days",
    title: "Sri Lanka Complete Discovery",
    meta: "10 Days / 9 Nights",
    image: "/images/sigiriya.jpg",
    blurb: "Comprehensive coverage of Sri Lanka’s top cultural, wildlife and coastal highlights.",
    route: "Airport → Sigiriya → Kandy → Ella → Mirissa → Bentota → Airport",
  },
  {
    slug: "sri-lanka-grand-odyssey-14-days",
    title: "Sri Lanka Grand Odyssey",
    meta: "14 Days / 13 Nights",
    image: "/images/tea-country.jpg",
    blurb: "The ultimate in-depth journey through ancient wonders, wildlife, highlands and pristine beaches.",
    route: "Airport → Negombo → Anuradhapura → Sigiriya → Kandy → Ella → Yala → Mirissa → Galle → Bentota → Colombo",
  },
] as const;

export const pages: Record<string, SitePageData> = {
  home: {
    slug: "home",
    kind: "home",
    title: "Welcome to Sri Lanka’s Warmest Private Tour Experience",
    kicker: "Kandy-based · Private · Personal",
    intro: "Discover the Real Heart of Sri Lanka with Minoli Lanka Tours",
    raw: prepared(home),
    image: "/images/sigiriya.jpg",
    imageAlt: "Sigiriya Rock rising above Sri Lanka’s green landscape",
    startAt: 3,
  },
  about: {
    slug: "about",
    kind: "about",
    title: "About Minoli Lanka Tours",
    kicker: "Our story",
    intro: "Your Trusted Kandy-Based Partner for Authentic Sri Lanka Journeys",
    raw: prepared(about),
    image: "/images/kandy.jpg",
    imageAlt: "Kandy landscape in Sri Lanka",
    startAt: 3,
  },
  tours: {
    slug: "tours",
    kind: "packages",
    title: "Discover Our Sri Lanka Tour Packages",
    kicker: "Day tours & round tours",
    intro: "Private, Personalized & Filled with Warm Hospitality",
    raw: prepared(packages),
    image: "/images/tea-country.jpg",
    imageAlt: "Misty tea plantations in Sri Lanka’s hill country",
    startAt: 3,
  },
  contact: {
    slug: "contact",
    kind: "contact",
    title: "Get in Touch With Us",
    kicker: "Plan your journey",
    intro: "We’re here to help plan your perfect Sri Lanka adventure. Reach out anytime — we reply fast!",
    raw: prepared(contact),
    image: "/images/kandy.jpg",
    imageAlt: "Scenic Kandy, home of Minoli Lanka Tours",
    startAt: 3,
  },
  "kandy-city-tour": {
    slug: "kandy-city-tour",
    kind: "tour",
    title: "Kandy City Tour",
    kicker: "Private day tour · 5–8 hours",
    intro: "Immerse Yourself in the Cultural Heart of Sri Lanka",
    raw: prepared(kandy),
    image: "/images/kandy.jpg",
    imageAlt: "Temple of the Tooth in Kandy, Sri Lanka",
    startAt: 2,
  },
  "sigiriya-day-tour-from-kandy": {
    slug: "sigiriya-day-tour-from-kandy",
    kind: "tour",
    title: "Sigiriya Day Tour from Kandy | Private Adventure with Minoli Lanka Tours",
    kicker: "Private day tour · 10–12 hours",
    intro: "Discover Ancient Wonders, Rock Fortresses & Wildlife – Your Way",
    raw: prepared(sigiriya),
    image: "/images/sigiriya.jpg",
    imageAlt: "Sigiriya Rock Fortress surrounded by forest",
    startAt: 2,
  },
  "nuwara-eliya-day-tour-from-kandy": {
    slug: "nuwara-eliya-day-tour-from-kandy",
    kind: "tour",
    title: "Nuwara Eliya Day Tour from Kandy | Private Hill Country Escape with Minoli Lanka Tours",
    kicker: "Private day tour · 9–11 hours",
    intro: "Experience “Little England,” Misty Tea Plantations & Cool Highland Charm",
    raw: prepared(nuwaraEliya),
    image: "/images/tea-country.jpg",
    imageAlt: "Emerald tea plantations in Sri Lanka’s highlands",
    startAt: 2,
  },
  "kitulgala-day-tour-from-kandy": {
    slug: "kitulgala-day-tour-from-kandy",
    kind: "tour",
    title: "Kitulgala Day Tour from Kandy | Private Adventure with Minoli Lanka Tours",
    kicker: "Private day tour · 8–10 hours",
    intro: "Experience Rainforest Thrills, River Adventures & Nature’s Serenity",
    raw: prepared(kitulgala),
    image: "/images/train.jpg",
    imageAlt: "Lush green Sri Lankan highlands",
    startAt: 3,
  },
  "polonnaruwa-day-tour-from-kandy": {
    slug: "polonnaruwa-day-tour-from-kandy",
    kind: "tour",
    title: "Polonnaruwa Day Tour from Kandy | Private Ancient City Adventure with Minoli Lanka Tours",
    kicker: "Private day tour · 9–11 hours",
    intro: "Explore Sri Lanka’s Glorious Medieval Capital & UNESCO Wonders",
    raw: prepared(polonnaruwa),
    image: "/images/sigiriya.jpg",
    imageAlt: "Sri Lanka’s ancient cultural triangle landscape",
    startAt: 2,
  },
  "sri-lanka-classic-highlights-4-days": {
    slug: "sri-lanka-classic-highlights-4-days",
    kind: "tour",
    title: "Sri Lanka Classic Highlights – 4 Days / 3 Nights",
    kicker: "Private cultural & wildlife tour",
    intro: "Discover Sri Lanka’s Iconic Wonders in Just 4 Days Experience the perfect short escape to Sri Lanka with Minoli Lanka Tours. This private tour blends unforgettable wildlife encounters at Pinnawala Elephant Orphanage, the majestic Sigiriya Rock Fortress, thrilling Minneriya Safari, sacred Kandy temples, lush botanical gardens, and scenic hill country charm in Nuwara Eliya. Ideal for first-time visitors with limited time, this well-paced itinerary offers a rich mix of culture, nature, and adventure while returning to the comfort of Kandy each night.",
    raw: prepared(fourDay),
    image: "/images/elephants.jpg",
    imageAlt: "Elephants in Sri Lanka",
    startAt: 2,
  },
  "sri-lanka-grand-highlights-7-days": {
    slug: "sri-lanka-grand-highlights-7-days",
    kind: "tour",
    title: "Sri Lanka Grand Highlights – 7 Days / 6 Nights",
    kicker: "Private culture, nature & beach tour",
    intro: "Experience the Best of Sri Lanka in One Unforgettable Week This private round tour with Minoli Lanka Tours takes you from ancient rock fortresses and wildlife safaris to sacred temples, misty hill country, scenic train rides, and pristine southern beaches. With comfortable pacing and Kandy, Nuwara Eliya, Ella, and Mirissa as bases, you’ll enjoy Sri Lanka’s rich culture, nature, and coastal beauty without rushing. Ideal for travelers seeking a comprehensive yet relaxed introduction to the island.",
    raw: prepared(sevenDay),
    image: "/images/train.jpg",
    imageAlt: "Sri Lanka’s scenic hill-country train",
    startAt: 2,
  },
  "sri-lanka-coastal-cultural-odyssey-8-days": {
    slug: "sri-lanka-coastal-cultural-odyssey-8-days",
    kind: "tour",
    title: "Sri Lanka Coastal & Cultural Odyssey – 8 Days / 7 Nights",
    kicker: "Private coast, culture & wildlife tour",
    intro: "Discover Sri Lanka’s Beaches, Wildlife, Hill Country & Ancient Wonders This private 8-day tour with Minoli Lanka Tours offers the perfect mix of relaxation on golden beaches, thrilling wildlife safaris, misty highlands, scenic train rides, and rich cultural heritage. Starting from the southern coast and moving through Ella, Nuwara Eliya, Kandy, and Sigiriya, it’s ideal for travelers wanting a comprehensive yet relaxed Sri Lankan experience.",
    raw: prepared(eightDay),
    image: "/images/beach.jpg",
    imageAlt: "Palm-fringed beach on Sri Lanka’s southern coast",
    startAt: 2,
  },
  "sri-lanka-complete-discovery-10-days": {
    slug: "sri-lanka-complete-discovery-10-days",
    kind: "tour",
    title: "Sri Lanka Complete Discovery – 10 Days / 9 Nights",
    kicker: "Private comprehensive tour",
    intro: "The Ultimate 10-Day Sri Lanka Experience: Culture, Wildlife, Highlands & Beaches This private tour with Minoli Lanka Tours covers the very best of Sri Lanka — from ancient rock fortresses and sacred temples to thrilling safaris, misty tea plantations, scenic train rides, and relaxing southern beaches. With comfortable pacing and expert guidance, it’s perfect for first-time visitors wanting a full, unforgettable island adventure.",
    raw: prepared(tenDay),
    image: "/images/sigiriya.jpg",
    imageAlt: "Sigiriya Rock at sunrise",
    startAt: 2,
  },
  "sri-lanka-grand-odyssey-14-days": {
    slug: "sri-lanka-grand-odyssey-14-days",
    kind: "tour",
    title: "Sri Lanka Grand Odyssey – 14 Days / 13 Nights",
    kicker: "Private grand island tour",
    intro: "The Ultimate 14-Day Sri Lanka Journey: Ancient Wonders, Wildlife, Highlands & Pristine Beaches This extensive private tour with Minoli Lanka Tours takes you through the best of Sri Lanka — from ancient cities and sacred temples to thrilling safaris, misty tea plantations, scenic train rides, and idyllic southern beaches. With comfortable pacing and expert guidance, it offers an unforgettable, in-depth exploration of the island’s culture, nature, and hospitality.",
    raw: prepared(fourteenDay),
    image: "/images/tea-country.jpg",
    imageAlt: "Sri Lanka’s misty tea country",
    startAt: 2,
  },
};
