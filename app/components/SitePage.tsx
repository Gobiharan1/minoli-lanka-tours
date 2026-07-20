import Image from "next/image";
import Link from "next/link";
import type { SitePageData } from "../site-content";
import { ContentRenderer } from "./ContentRenderer";
import { ContactForm } from "./ContactForm";
import { TourExplorer } from "./TourExplorer";

function Hero({ page }: { page: SitePageData }) {
  if (page.kind === "home") {
    return (
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">{page.kicker}</p>
          <h1>{page.title}</h1>
          <p className="hero-intro">{page.intro}</p>
          <p>Immerse yourself in the breathtaking beauty, rich culture, and warm hospitality of Sri Lanka.</p>
          <div className="button-row"><Link className="button button-gold" href="/contact">Start Planning Your Adventure <span aria-hidden="true">→</span></Link><Link className="text-link" href="/tours">Browse all experiences <span aria-hidden="true">↗</span></Link></div>
          <div className="hero-trust"><span><b>Private</b> tours only</span><span><b>24/7</b> trip support</span><span><b>Local</b> Kandy team</span></div>
        </div>
        <div className="hero-gallery" aria-label="Sri Lanka highlights">
          <figure className="hero-main"><Image src="/images/sigiriya.jpg" alt={page.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 52vw" /><figcaption>Sigiriya · Cultural Triangle</figcaption></figure>
          <figure><Image src="/images/elephants.jpg" alt="Elephants in Sri Lanka" fill sizes="25vw" /><figcaption>Minneriya · Wildlife</figcaption></figure>
          <figure><Image src="/images/beach.jpg" alt="Palm-fringed Sri Lanka beach" fill sizes="25vw" /><figcaption>South Coast · Slow days</figcaption></figure>
        </div>
      </section>
    );
  }

  return (
    <section className="inner-hero">
      <Image src={page.image} alt={page.imageAlt} fill priority sizes="100vw" />
      <span className="inner-hero-shade" />
      <div className="inner-hero-copy"><p className="eyebrow">{page.kicker}</p><h1>{page.title}</h1><p>{page.intro}</p>{page.kind === "tour" && <Link className="button button-ivory" href="#tour-details">View full itinerary <span aria-hidden="true">↓</span></Link>}</div>
      <div className="hero-breadcrumb"><Link href="/">Home</Link><span>/</span><span>{page.kind === "tour" ? "Tours" : page.title}</span></div>
    </section>
  );
}

export function SitePage({ page }: { page: SitePageData }) {
  const isTour = page.kind === "tour";
  return (
    <>
      <Hero page={page} />
      {page.kind === "home" && <TourExplorer />}
      {page.kind === "packages" && <TourExplorer compact />}
      <section className={`content-section section-pad ${isTour ? "tour-layout" : ""}`} id="tour-details">
        <div className="content-main">
          <ContentRenderer raw={page.raw} startAt={page.startAt} />
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
      </section>
      {(page.kind === "contact" || page.kind === "home") && (
        <section className="form-section section-pad" id="inquiry">
          <div className="form-intro"><p className="eyebrow">Personal itinerary & quote</p><h2>Tell us about your Sri Lanka plans.</h2><p>We love hearing from you! Fill out the form and your email app will open with everything ready to send to our friendly Kandy team.</p><div className="contact-chip"><span>✉</span><a href="mailto:info@minolilankatours.com">info@minolilankatours.com</a></div></div>
          <ContactForm compact={page.kind === "home"} />
        </section>
      )}
    </>
  );
}

