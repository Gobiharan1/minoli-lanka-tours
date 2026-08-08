import Link from "next/link";
import type { ReactNode } from "react";
import { whatsappUrl } from "../contact-details";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Minoli Lanka Tours home">
          <span className="brand-mark" aria-hidden="true">M</span>
          <span><b>Minoli Lanka Tours</b><small>Sri Lanka</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/tours">Tours</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <Link className="button button-small" href="/contact">Plan my trip <span aria-hidden="true">↗</span></Link>
        <details className="mobile-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/tours">Tours</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </details>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="footer-lead">
          <p className="eyebrow">Your island. Your pace.</p>
          <h2>Let’s create a Sri Lanka journey you’ll remember.</h2>
          <Link className="button button-ivory" href="/contact">Start planning <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="footer-grid">
          <div>
            <Link className="brand brand-footer" href="/">
              <span className="brand-mark" aria-hidden="true">M</span>
              <span><b>Minoli Lanka Tours</b><small>Sri Lanka</small></span>
            </Link>
            <p>Private, personalized journeys delivered with warmth, flexibility, and genuine Sri Lankan hospitality.</p>
          </div>
          <div><h3>Explore</h3><Link href="/tours">Tour packages</Link><Link href="/about">Our story</Link><Link href="/contact">Contact us</Link></div>
          <div><h3>Contact</h3><span>Kandy, Sri Lanka</span><a href="mailto:info@minolilankatours.com">info@minolilankatours.com</a><span>+94 XX XXX XXXX</span></div>
          <div><h3>Photo credits</h3><a href="https://unsplash.com" target="_blank" rel="noreferrer">Travel photography from Unsplash</a><span>Free to use under the Unsplash License</span></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Minoli Lanka Tours</span><span>Made with care in Kandy</span></div>
      </footer>
      <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Message Minoli Lanka Tours on WhatsApp" title="WhatsApp us">
        <span aria-hidden="true">✆</span>
      </a>
    </div>
  );
}
