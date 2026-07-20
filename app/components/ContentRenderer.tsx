import type { ReactNode } from "react";

const headingStarts = [
  "About Minoli", "Your Kandy-Based", "Explore Sri Lanka", "Featured Round", "Popular Day", "Why Choose",
  "What Our Guests", "Ready to Begin", "Get Your Personalized", "Our Story", "Who We Are", "Our Vision",
  "Our Mission", "Our Values", "Meet Our Team", "Our Commitment", "Ready to Experience", "Contact Information",
  "Send Us a Message", "Why Contact Us", "Follow Us", "Map Section", "Day Tours from Kandy", "Our Popular",
  "Round Tour Packages", "Our Signature", "Tailor-Made Private", "Create Your Dream", "Popular Custom",
  "How It Works", "Why Book With Us", "Ready to Explore", "Welcome to Your", "Why Book Your", "Why Choose Minoli",
  "Your Kandy City", "Tour Highlights", "Standard ", "Inclusions", "Exclusions", "Pickup & Drop-off",
  "Make It", "Special Notes", "Ready to Book", "Tour Summary", "Major Highlights", "Day-by-Day Itinerary",
  "Tour Route Map", "Important Facts", "Image Gallery",
];

function looksLikeHeading(line: string) {
  return headingStarts.some((start) => line.startsWith(start));
}

function isEditorialInstruction(line: string) {
  return line.startsWith("Hero Section (") || line.startsWith("(Visual Recommendation:") || line.startsWith("(High-quality photos:");
}

export function ContentRenderer({ raw, startAt = 0 }: { raw: string; startAt?: number }) {
  const lines = raw.split(/\r?\n/).map((line) => line.trim()).slice(startAt);
  const nodes: ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (!bullets.length) return;
    nodes.push(<ul className="content-list" key={`list-${nodes.length}`}>{bullets.map((item, index) => <li key={index}>{item}</li>)}</ul>);
    bullets = [];
  };

  lines.forEach((line, index) => {
    if (!line || line === ".") {
      flushBullets();
      return;
    }
    if (line.startsWith("•")) {
      bullets.push(line.replace(/^•\s*/, ""));
      return;
    }
    flushBullets();

    if (isEditorialInstruction(line)) {
      nodes.push(<p className="editorial-note" key={index}>{line}</p>);
      return;
    }
    if (looksLikeHeading(line)) {
      nodes.push(<h2 key={index}>{line}</h2>);
      return;
    }
    if (/^Day \d+:/.test(line)) {
      const splitAt = line.indexOf(" ", line.indexOf(":") + 1);
      nodes.push(
        <article className="itinerary-day" key={index}>
          <span>{line.slice(0, splitAt)}</span>
          <p>{line.slice(splitAt + 1)}</p>
        </article>,
      );
      return;
    }
    if (/^(Duration|Tour Type|Starting Point|Ending Point|Overnight Location|Overnight Locations|Best Time to Travel|Group Size|Vehicle|Departure|Location):?$/.test(line)) {
      nodes.push(<h3 className="fact-label" key={index}>{line}</h3>);
      return;
    }
    if (/^[“\"]/.test(line)) {
      nodes.push(<blockquote key={index}>{line}</blockquote>);
      return;
    }
    nodes.push(<p key={index}>{line}</p>);
  });
  flushBullets();

  return <div className="rich-content">{nodes}</div>;
}

