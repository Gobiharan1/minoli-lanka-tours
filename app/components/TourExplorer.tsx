import Image from "next/image";
import Link from "next/link";
import { dayTours, roundTours, routeMaps } from "../site-content";
import { RouteMap } from "./RouteMap";

export function TourExplorer({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`tour-explorer section-pad ${compact ? "compact" : ""}`} id="experiences">
      <div className="section-heading">
        <div><p className="eyebrow">Journeys with meaning</p><h2>Choose your way to explore</h2></div>
        <p>From one unforgettable day in Kandy to a two-week island odyssey, every tour is private and flexible.</p>
      </div>
      <div className="tour-tabs" aria-label="Tour categories">
        <span>Day tours from Kandy</span><span>Signature round tours</span>
      </div>
      <div className="tour-card-grid" id="day-tours">
        {dayTours.map((tour, index) => (
          <Link className={compact ? "tour-card" : `tour-card tour-card-style-${index} ${index === 0 ? "tour-card-wide" : ""}`} href={`/${tour.slug}`} key={tour.slug}>
            <Image src={tour.image} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" />
            <span className="tour-card-shade" />
            <span className="tour-card-index">0{index + 1}</span>
            <span className="tour-card-copy"><small>{tour.meta}</small><strong>{tour.title}</strong><span>{tour.blurb}</span><b>Explore tour ↗</b></span>
          </Link>
        ))}
      </div>
      {compact ? (
        <>
          <div className="round-section-heading" id="round-tours">
            <span />
            <h3>Signature round tours</h3>
            <span />
          </div>
          <div className="round-list">
            {roundTours.map((tour, index) => (
              <Link href={`/${tour.slug}`} className="round-row" key={tour.slug}>
                <span className="round-image"><Image src={tour.image} alt="" fill sizes="(max-width: 760px) 100vw, 32vw" /></span>
                <span className="round-number">0{index + 1}</span>
                <span className="round-copy"><small>{tour.meta}</small><strong>{tour.title}</strong><em>{tour.blurb}</em></span>
                <span className="round-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="route-showcase-heading" id="round-tours">
            <p className="eyebrow">Animated island routes</p>
            <h3>See the journey before you take it.</h3>
            <p>Each private round tour traces a different rhythm through Sri Lanka—from compact cultural escapes to the complete grand circuit.</p>
          </div>
          <div className="route-package-grid">
            {roundTours.map((tour, index) => (
              <Link href={`/${tour.slug}`} className={`route-package-card route-package-${index}`} key={tour.slug}>
                <span className="route-package-copy"><small>{tour.meta}</small><strong>{tour.title}</strong><span>{tour.blurb}</span><b>View full journey ↗</b></span>
                <RouteMap route={routeMaps[tour.slug]} compact variant={index} />
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
