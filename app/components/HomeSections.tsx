import Image from "next/image";
import Link from "next/link";
import { dayTours, roundTours } from "../site-content";
import { ContactForm } from "./ContactForm";

const reasons = [
  ["Genuine Warm Hospitality", "Feel truly cared for by a team that treats you like family."],
  ["Maximum Flexibility", "We happily adjust plans, timings, and activities to match your energy and wishes."],
  ["Safety Comes First", "Reliable private vehicles, experienced drivers, and proactive support throughout."],
  ["Local Kandy Expertise", "Insider knowledge for the best timings, hidden gems, and practical travel tips."],
  ["Fully Personalized Service", "Tailored experiences for solo travelers, couples, families, and special interests."],
  ["Responsible & Authentic", "Ethical wildlife encounters, respect for local culture, and sustainable practices."],
  ["Peace of Mind", "Transparent communication, honest recommendations, and seamless logistics from start to finish."],
] as const;

const testimonials = [
  ["Manoj was fantastic! When an elephant blocked the road to Pidurangala, he quickly arranged a jeep so we could catch the sunrise. His flexibility and problem-solving made our 14-day trip truly special.", "Couple · May 2026"],
  ["Relaxed trip with a fantastic driver! Priyantha Manoj kept us safe in busy traffic and was always ready to help. Highly recommended Minoli Lanka Tours!", "Couple · March 2026"],
  ["Everything was perfect. We felt safe, well cared for, and could fully enjoy our holiday thanks to the caring team.", "Multiple guests"],
] as const;

export function HomeSections() {
  return (
    <>
      <section className="home-about section-pad" id="about">
        <div className="home-about-image"><Image src="/images/kandy.jpg" alt="The beautiful Kandy landscape in Sri Lanka" fill sizes="(max-width: 760px) 100vw, 46vw" /></div>
        <div className="home-section-copy">
          <p className="eyebrow">About Minoli Lanka Tours</p>
          <h2>Your Kandy-Based Travel Partner Who Cares</h2>
          <p>At Minoli Lanka Tours, we believe travel should feel like coming home. Founded with a passion for authentic Sri Lankan hospitality, we offer private tours that go beyond the ordinary. Our experienced English-speaking driver-guides, comfortable air-conditioned vehicles, and deep local knowledge allow us to create flexible itineraries tailored exactly to you.</p>
          <p>From seamless airport transfers to carefully paced multi-day adventures, we prioritize your safety, comfort, and joy. We handle the details so you can simply relax and create lifelong memories in this beautiful island paradise.</p>
          <Link className="text-link" href="/about">Discover our story <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="home-explore section-pad">
        <p className="eyebrow">Private journeys · Local insight</p>
        <h2>Explore Sri Lanka with Minoli Lanka Tours</h2>
        <p>Sri Lanka is a land of endless wonders — ancient kingdoms, sacred temples, lush rainforests, rolling tea estates, pristine beaches, and incredible wildlife. With Minoli Lanka Tours, you experience it all in comfort and style. Our private tours blend must-see highlights with hidden gems, always delivered with genuine care, flexibility, and insider insights from our local Kandy-based team.</p>
        <div className="button-row"><Link className="button button-gold" href="/tours">Browse all experiences <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="home-tours section-pad" id="featured-round-tours">
        <div className="section-heading"><div><p className="eyebrow">Travel deeper</p><h2>Featured Round Tours</h2></div><p>Thoughtfully paced private journeys with culture, wildlife, hill country and coast — personalized around you.</p></div>
        <div className="home-card-grid home-round-grid">
          {roundTours.map((tour) => (
            <Link className="home-tour-card" href={`/${tour.slug}`} key={tour.slug}>
              <span className="home-tour-image"><Image src={tour.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></span>
              <span className="home-tour-card-copy"><small>{tour.meta}</small><strong>{tour.title}</strong><span>{tour.blurb}</span><b>View full itinerary <span aria-hidden="true">↗</span></b></span>
            </Link>
          ))}
        </div>
        <Link className="content-action-link" href="/tours#round-tours">View all round tour packages <span aria-hidden="true">→</span></Link>
      </section>

      <section className="home-day-tours section-pad" id="popular-day-tours">
        <div className="section-heading"><div><p className="eyebrow">Start from Kandy</p><h2>Popular Day Tours from Kandy</h2></div><p>Ancient cities, cool highlands, river adventures and cultural treasures — all with your own private driver-guide.</p></div>
        <div className="home-card-grid home-day-grid">
          {dayTours.map((tour) => (
            <Link className="home-tour-card home-day-card" href={`/${tour.slug}`} key={tour.slug}>
              <span className="home-tour-image"><Image src={tour.image} alt="" fill sizes="(max-width: 760px) 100vw, 25vw" /></span>
              <span className="home-tour-card-copy"><small>{tour.meta}</small><strong>{tour.title}</strong><span>{tour.blurb}</span><b>Explore tour <span aria-hidden="true">↗</span></b></span>
            </Link>
          ))}
        </div>
        <Link className="content-action-link" href="/tours#day-tours">Explore all day tours <span aria-hidden="true">→</span></Link>
      </section>

      <section className="home-why section-pad">
        <div className="section-heading"><div><p className="eyebrow">Travel with confidence</p><h2>Why Choose Minoli Lanka Tours</h2></div><p>Warm local care, complete flexibility and thoughtful support from your first message to your final airport transfer.</p></div>
        <div className="reason-grid">{reasons.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="home-testimonials section-pad">
        <div className="section-heading"><div><p className="eyebrow">Stories from the road</p><h2>What Our Guests Say</h2></div><p>Real moments of care, flexibility and peace of mind shared by travelers who explored Sri Lanka with us.</p></div>
        <div className="testimonial-grid">{testimonials.map(([quote, guest]) => <blockquote key={guest}><span aria-hidden="true">“</span><p>{quote}</p><cite>{guest}</cite></blockquote>)}</div>
      </section>

      <section className="home-final-cta section-pad">
        <div><p className="eyebrow">Your island story starts here</p><h2>Ready to Begin Your Sri Lanka Adventure?</h2><p>Let Minoli Lanka Tours create a private journey filled with wonder, comfort, and lasting memories. Share your travel dates, interests, and preferences — we’ll handle the rest with care.</p><div className="button-row"><Link className="button button-gold" href="#inquiry">Contact us now <span aria-hidden="true">→</span></Link><a className="text-link" href="mailto:info@minolilankatours.com">Email our team</a></div></div>
      </section>

      <section className="form-section section-pad" id="inquiry">
        <div className="form-intro"><p className="eyebrow">Personal itinerary & quote</p><h2>Get Your Personalized Itinerary &amp; Quote</h2><p>Tell us when you plan to travel, who is joining you and what you would love to experience. Our friendly Kandy team will shape a private itinerary around you.</p><div className="contact-chip"><span>✉</span><a href="mailto:info@minolilankatours.com">info@minolilankatours.com</a></div></div>
        <ContactForm compact />
      </section>
    </>
  );
}
