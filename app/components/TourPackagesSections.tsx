import Image from "next/image";
import Link from "next/link";
import { dayTours, roundTours } from "../site-content";
import { whatsappUrl } from "../contact-details";
import { GuestMoments } from "./GuestMoments";

const tourGuestPhotos = ["09", "15", "19", "20", "21", "22", "28"].map((name) => `/images/guest-moments/${name}.jpeg`);

const dayTourDetails: Record<string, string> = {
  "kandy-city-tour": "Immerse yourself in Sri Lanka’s cultural capital. Visit the sacred Temple of the Tooth Relic (UNESCO), stroll around scenic Kandy Lake, admire panoramic views from Bahirawakanda Big Buddha, explore the magnificent Royal Botanical Gardens in Peradeniya, and end with a vibrant Kandyan Cultural Dance Show. Customizable with tea tasting or craft workshops.",
  "sigiriya-day-tour-from-kandy": "Journey into the Cultural Triangle. Explore Dambulla Cave Temples, climb the iconic Sigiriya Rock Fortress (or choose the easier Pidurangala for stunning views), visit a spice garden, and enjoy an optional thrilling wildlife safari at Minneriya National Park to see elephants in the wild.",
  "nuwara-eliya-day-tour-from-kandy": "Escape to the cool highlands known as “Little England.” Marvel at Ramboda Falls, walk through lush tea plantations with a factory tour and tasting, explore colonial-era Nuwara Eliya town, and relax by serene Gregory Lake. Optional visits to Hakgala Gardens or Seetha Amman Temple.",
  "kitulgala-day-tour-from-kandy": "Adventure meets nature in the wet zone. Enjoy optional white-water rafting on the Kelani River, rainforest hikes rich in birdlife and butterflies, riverside relaxation, and insights into the area’s famous film locations. Perfect balance of thrill and serenity.",
  "polonnaruwa-day-tour-from-kandy": "Step back into Sri Lanka’s medieval glory. Explore the UNESCO-listed ancient city with its royal palace complex, impressive Gal Vihara rock-cut Buddha statues, stupas, and sacred monuments. Scenic reservoir views and optional Minneriya safari extension.",
};

const roundTourDetails: Record<string, string> = {
  "sri-lanka-classic-highlights-4-days": "Pinnawala Elephant Orphanage • Sigiriya Rock Fortress • Minneriya Safari • Kandy Cultural Sites • Peradeniya Botanical Gardens • Nuwara Eliya Tea Country. Perfect short escape with Kandy as your relaxing base.",
  "sri-lanka-grand-highlights-7-days": "Sigiriya & Dambulla • Kandy Temple of the Tooth • Scenic Train Ride to Ella • Nine Arch Bridge & Little Adam’s Peak • Yala Safari • Mirissa Beach. Culture, nature, and coast in one unforgettable week.",
  "sri-lanka-coastal-cultural-odyssey-8-days": "Bentota & Mirissa Beaches • Whale Watching • Galle Fort • Yala Safari • Hill Country Train • Kandy • Sigiriya. Beautiful balance of relaxation and discovery.",
  "sri-lanka-complete-discovery-10-days": "Polonnaruwa Ancient City • Sigiriya • Kandy • Ella Scenic Wonders • Yala Safari • Whale Watching • Galle Fort • Madu River. Comprehensive coverage of Sri Lanka’s top highlights.",
  "sri-lanka-grand-odyssey-14-days": "Anuradhapura & Polonnaruwa • Sigiriya • Kandy • Ella • Yala & Minneriya Safaris • Whale Watching in Mirissa • Galle Fort • Madu River • Colombo. The ultimate in-depth journey through ancient wonders, wildlife, highlands, and pristine beaches.",
};

const customOptions = [
  "Honeymoon romance packages with special beach or hill country stays",
  "Family-friendly tours with kid-appropriate pacing and activities",
  "Solo traveler adventures with extra safety focus",
  "Cultural deep-dives, wildlife-focused safaris, wellness & Ayurveda retreats",
  "East Coast extensions, Ramayana Trail, or off-the-beaten-path hidden gems",
];

const planningSteps = [
  "Tell us your travel dates, interests, group size, and any special requests.",
  "Our team creates a detailed personalized itinerary with flexible options.",
  "We refine it together until it’s perfect.",
  "Enjoy your fully supported private journey with warm hospitality from start to finish.",
];

export function TourPackagesSections() {
  return (
    <>
      <section className="package-day-section section-pad" id="day-tours">
        <div className="section-heading"><div><p className="eyebrow">Five unforgettable directions</p><h2>Our Popular Day Tours</h2></div><p>Choose a ready-made experience or ask us to adjust the route, pace and activities around you.</p></div>
        <div className="package-day-grid">
          {dayTours.map((tour) => (
            <Link className="package-day-card" href={`/${tour.slug}`} key={tour.slug}>
              <span className="package-card-image"><Image src={tour.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></span>
              <span className="package-card-copy"><small>{tour.meta}</small><strong>{tour.title}</strong><span>{dayTourDetails[tour.slug]}</span><b>View tour <span aria-hidden="true">↗</span></b></span>
            </Link>
          ))}
        </div>
        <div className="button-row"><Link className="button" href="#day-tours">View all day tours</Link><Link className="text-link" href="/contact">Customize your day tour <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="package-round-section section-pad" id="round-tours">
        <div className="package-round-intro"><p className="eyebrow">Round Tour Packages</p><h2>Our Signature Round Tours</h2><p>Our multi-day private round tours offer seamless exploration of Sri Lanka’s highlights. With comfortable pacing, handpicked accommodations, and expert guidance, these packages are ideal for first-time visitors and seasoned travelers alike. All tours include private vehicle, English-speaking driver-guide, daily breakfast, and airport transfers where applicable.</p></div>
        <div className="package-round-grid">
          {roundTours.map((tour, index) => (
            <Link className="package-round-card" href={`/${tour.slug}`} key={tour.slug}>
              <Image src={tour.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" />
              <span className="package-round-shade" />
              <span className="package-round-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="package-round-copy"><small>{tour.meta}</small><strong>{tour.title}</strong><span>{roundTourDetails[tour.slug]}</span><b>View full itinerary &amp; book <span aria-hidden="true">→</span></b></span>
            </Link>
          ))}
        </div>
        <Link className="button button-gold" href="#round-tours">View all round tours</Link>
      </section>

      <GuestMoments eyebrow="Travel together" title="Welcomes, Adventures & Farewells" intro="From airport greetings to mountain viewpoints, our guests are supported with thoughtful local care throughout their Sri Lanka journey." images={tourGuestPhotos} variant="light" />

      <section className="package-tailor section-pad">
        <div className="package-tailor-image"><Image src="/images/tea-country.jpg" alt="Sri Lanka’s green hill country, ready for a tailor-made journey" fill sizes="(max-width: 760px) 100vw, 42vw" /></div>
        <div className="package-tailor-copy">
          <p className="eyebrow">Tailor-Made Private Tours</p><h2>Create Your Dream Sri Lanka Holiday</h2>
          <p>Don’t see exactly what you’re looking for? No problem. At Minoli Lanka Tours, we specialize in fully customized private tours designed around your unique preferences, travel style, budget, and interests.</p>
          <h3>Popular Custom Options Include:</h3><ul>{customOptions.map((option) => <li key={option}>{option}</li>)}</ul>
          <h3>How It Works:</h3><ol>{planningSteps.map((step) => <li key={step}>{step}</li>)}</ol>
          <div className="button-row"><Link className="button button-gold" href="/contact">Request your tailor-made tour <span aria-hidden="true">→</span></Link><span>Contact us via WhatsApp or email today — we reply quickly and love creating special experiences.</span></div>
        </div>
      </section>

      <section className="package-why section-pad">
        <div><p className="eyebrow">Travel with confidence</p><h2>Why Book With Us?</h2></div>
        <ul><li>Private tours only — no groups</li><li>Kandy-based local team</li><li>Flexible &amp; transparent pricing</li><li>24/7 support during your trip</li><li>Responsible tourism practices</li></ul>
        <div className="package-why-cta"><h3>Ready to Explore Sri Lanka?</h3><p>Contact Minoli Lanka Tours today for availability, pricing, or to start planning your perfect trip.</p><div className="button-row"><a className="button button-gold" href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp us <span aria-hidden="true">↗</span></a></div></div>
      </section>
      <div className="package-footer-gap" aria-hidden="true" />
    </>
  );
}
