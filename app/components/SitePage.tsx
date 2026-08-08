import Image from "next/image";
import Link from "next/link";
import type { SitePageData } from "../site-content";
import { ContentRenderer } from "./ContentRenderer";
import { HomeSections } from "./HomeSections";
import { TourPackagesSections } from "./TourPackagesSections";
import { dayTours, roundTours } from "../site-content";
import { whatsappUrl } from "../contact-details";

function Hero({ page }: { page: SitePageData }) {
  if (page.kind === "home") {
    return (
      <section className="home-hero">
        <div className="hero-slides" aria-hidden="true">
          <figure><Image src="/images/sigiriya.jpg" alt="" fill priority sizes="100vw" /></figure>
          <figure><Image src="/images/elephants.jpg" alt="" fill sizes="100vw" /></figure>
          <figure><Image src="/images/beach.jpg" alt="" fill sizes="100vw" /></figure>
        </div>
        <span className="home-hero-shade" />
        <div className="hero-copy">
          <div className="hero-heading">
            <h1>{page.title}</h1>
            <p className="hero-intro">{page.intro}</p>
          </div>
          <div className="hero-story">
            <p>Immerse yourself in the breathtaking beauty, rich culture, and warm hospitality of Sri Lanka. As a trusted Kandy-based inbound tour operator, we specialize in private, personalized journeys that adapt to your pace, preferences, and dreams. Whether you seek ancient wonders, thrilling wildlife safaris, scenic hill country escapes, or relaxing beach getaways, our caring team ensures every moment feels safe, comfortable, and truly special.</p>
            <div className="button-row"><Link className="button button-gold" href="/contact">Start Planning Your Adventure <span aria-hidden="true">→</span></Link><a className="button whatsapp-hero-button" href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp us <span aria-hidden="true">↗</span></a></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="inner-hero">
      <Image src={page.image} alt={page.imageAlt} fill priority sizes="100vw" />
      <span className="inner-hero-shade" />
      <div className="inner-hero-copy"><p className="eyebrow">{page.kicker}</p><h1>{page.title}</h1><p>{page.intro}</p>{page.kind === "tour" && <Link className="button button-ivory" href="#tour-details">View full itinerary <span aria-hidden="true">↓</span></Link>}{page.kind === "packages" && <div className="button-row"><Link className="button button-ivory" href="#day-tours">Browse day tours <span aria-hidden="true">↓</span></Link><Link className="text-link" href="#round-tours">Browse round tours <span aria-hidden="true">↓</span></Link></div>}</div>
      <div className="hero-breadcrumb"><Link href="/">Home</Link><span>/</span><span>{page.kind === "tour" ? "Tours" : page.title}</span></div>
    </section>
  );
}

export function SitePage({ page }: { page: SitePageData }) {
  const isTour = page.kind === "tour";
  const isDayTour = dayTours.some((tour) => tour.slug === page.slug);
  const route = roundTours.find((tour) => tour.slug === page.slug)?.route;
  const decorVariant = page.kind === "home"
    ? 0
    : [...page.slug].reduce((total, character) => total + character.charCodeAt(0), 0) % 3;
  const pageContent = (
    <>
      <Hero page={page} />
      {page.kind === "home" && <HomeSections />}
      {page.kind === "packages" && <TourPackagesSections />}
      {page.kind !== "home" && page.kind !== "packages" && <section className={`content-section section-pad ${isTour ? "tour-layout" : ""}`} id="tour-details" data-decor-variant={decorVariant}>
        <div className="content-main">
          <ContentRenderer raw={page.raw} startAt={page.startAt} route={route} ensureGallery={isDayTour} />
        </div>
        {isTour && (
          <aside className="booking-card">
            <p className="eyebrow">Make it yours</p>
            <h2>Plan this private journey</h2>
            <p>Share your dates, hotel, group size, and preferences. The Minoli Lanka Tours team will tailor the details around you.</p>
            <Link className="button button-gold" href="/contact">Request your quote <span aria-hidden="true">↗</span></Link>
            <span className="booking-note">Kandy-based · English-speaking driver-guide · Flexible pacing</span>
          </aside>
        )}
      </section>}
    </>
  );

  return page.kind === "tour" || page.kind === "packages"
    ? <div className={`page-theme page-${page.kind} page-${page.slug}`}>{pageContent}</div>
    : pageContent;
}
