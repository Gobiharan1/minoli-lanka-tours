import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const headingStarts = [
  "About Minoli", "Explore Sri Lanka", "Featured Round", "Popular Day", "Why Choose",
  "What Our Guests", "Ready to Begin", "Get Your Personalized", "Our Story", "Who We Are", "Our Vision",
  "Our Mission", "Our Values", "Meet Our Team", "Our Commitment", "Ready to Experience", "Contact Information",
  "Send Us a Message", "Why Contact Us", "Follow Us", "Day Tours from Kandy", "Our Popular", "Round Tour Packages",
  "Our Signature", "Tailor-Made Private", "Create Your Dream", "Popular Custom", "How It Works", "Why Book With Us",
  "Ready to Explore", "Welcome to Your", "Why Book Your", "Why Choose Minoli", "Your Kandy City", "Tour Highlights",
  "Standard ", "Inclusions", "Exclusions", "Pickup & Drop-off", "Make It", "Special Notes", "Ready to Book",
  "Tour Summary", "Major Highlights", "Day-by-Day Itinerary", "Tour Route Map", "Important Facts", "Image Gallery",
  "Contact Form", "Visit Us in Beautiful Kandy",
];

type Block =
  | { type: "paragraph" | "quote" | "offer" | "contact"; text: string }
  | { type: "list"; items: string[] }
  | { type: "day"; label: string; text: string }
  | { type: "fact"; label: string; text: string };

type ContentSection = { heading: string | null; blocks: Block[] };

const editorialWords = /(?:layout|image|slider|carousel|grid|card|section|CTA|button|photos?|form|background|placeholder|visual recommendation)/i;

function removeDesignNotes(line: string) {
  return line
    .replace(/\s*\((?:Primary Button|Floating\/Secondary Button|Button|Buttons|Button linking[^)]*)\)/gi, "")
    .replace(/\s*\(([^)]*)\)\s*$/g, (match, note: string) => editorialWords.test(note) ? "" : match)
    .trim();
}

function isEditorialInstruction(line: string) {
  return (
    line.startsWith("Hero Section (") ||
    line.startsWith("Map Section (") ||
    (line.startsWith("(") && line.endsWith(")") && editorialWords.test(line))
  );
}

function expandEditorialLines(lines: string[]) {
  return lines.flatMap((line) => {
    const match = line.match(/^(.*?)\s*\((?:Section intro text|Section intro)\)\s*(.+)$/i);
    return match ? [match[1], match[2]] : [line];
  });
}

function looksLikeHeading(line: string) {
  return headingStarts.some((start) => line.startsWith(start));
}

function sectionClass(heading: string | null) {
  if (!heading) return "content-panel content-opening";
  if (/^Ready to|^Create Your Dream|^Get Your Personalized/.test(heading)) return "content-panel content-cta";
  if (/What Our Guests/.test(heading)) return "content-panel testimonial-section";
  if (/^About Minoli|^Our Story|^Our Commitment/.test(heading)) return "content-panel story-section";
  if (/Why Choose|Our Mission|Our Values|Popular Custom|How It Works|Why Contact/.test(heading)) return "content-panel feature-section";
  if (/Featured Round|Popular Day|Our Popular|Our Signature/.test(heading)) return "content-panel offers-section";
  if (/Tour Summary/.test(heading)) return "content-panel facts-section";
  if (/Major Highlights|Tour Highlights|Your Kandy City Tour Highlights/.test(heading)) return "content-panel highlights-section";
  if (/Day-by-Day Itinerary|^Standard /.test(heading)) return "content-panel itinerary-section";
  if (/^Inclusions/.test(heading)) return "content-panel inclusions-section";
  if (/^Exclusions/.test(heading)) return "content-panel exclusions-section";
  if (/Tour Route Map/.test(heading)) return "content-panel route-section";
  if (/Image Gallery/.test(heading)) return "content-panel gallery-section";
  if (/Contact Information/.test(heading)) return "content-panel contact-info-section";
  if (/^Explore Sri Lanka/.test(heading)) return "content-panel explore-section";
  return "content-panel";
}

function isOffer(text: string) {
  return /^(Kandy City Tour|Sigiriya Day Tour|Nuwara Eliya Day Tour|Kitulgala Day Tour|Polonnaruwa Day Tour|Sri Lanka Classic Highlights|Sri Lanka Grand Highlights|Sri Lanka Coastal & Cultural Odyssey|Sri Lanka Complete Discovery|Sri Lanka Grand Odyssey)/.test(text);
}

function buildSections(raw: string, startAt: number) {
  const sourceLines = raw.split(/\r?\n/).map((line) => line.trim()).slice(startAt);
  const lines = expandEditorialLines(sourceLines);
  const sections: ContentSection[] = [{ heading: null, blocks: [] }];
  let current = sections[0];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (!bullets.length) return;
    current.blocks.push({ type: "list", items: bullets });
    bullets = [];
  };

  for (let index = 0; index < lines.length; index += 1) {
    const original = lines[index];
    if (!original || original === ".") {
      flushBullets();
      continue;
    }
    if (isEditorialInstruction(original)) continue;
    if (original.startsWith("•")) {
      bullets.push(removeDesignNotes(original.replace(/^•\s*/, "")));
      continue;
    }
    flushBullets();
    const line = removeDesignNotes(original);
    if (!line) continue;

    if (looksLikeHeading(line)) {
      current = { heading: line, blocks: [] };
      sections.push(current);
      continue;
    }
    if (/^Day \d+:/.test(line)) {
      const splitAt = line.indexOf(" ", line.indexOf(":") + 1);
      current.blocks.push({ type: "day", label: line.slice(0, splitAt), text: line.slice(splitAt + 1) });
      continue;
    }
    if (/^(Duration|Tour Type|Starting Point|Ending Point|Overnight Location|Overnight Locations|Best Time to Travel|Group Size|Vehicle|Departure|Location):?$/.test(line)) {
      let value = "";
      for (let lookAhead = index + 1; lookAhead < lines.length; lookAhead += 1) {
        if (!lines[lookAhead] || lines[lookAhead] === ".") continue;
        value = removeDesignNotes(lines[lookAhead]);
        index = lookAhead;
        break;
      }
      current.blocks.push({ type: "fact", label: line.replace(/:$/, ""), text: value });
      continue;
    }
    if (/^[“\"]/.test(line)) {
      current.blocks.push({ type: "quote", text: line });
      continue;
    }
    if (/^[📍📞✉️🕒]/u.test(line)) {
      current.blocks.push({ type: "contact", text: line });
      continue;
    }
    current.blocks.push({ type: isOffer(line) ? "offer" : "paragraph", text: line });
  }
  flushBullets();
  return sections.filter((section) => section.heading || section.blocks.length);
}

function Gallery() {
  return (
    <div className="content-gallery" aria-label="Sri Lanka tour gallery">
      <figure><Image src="/images/sigiriya.jpg" alt="Sigiriya Rock Fortress" fill sizes="50vw" /></figure>
      <figure><Image src="/images/elephants.jpg" alt="Elephants in Sri Lanka" fill sizes="25vw" /></figure>
      <figure><Image src="/images/train.jpg" alt="Scenic train through Sri Lanka" fill sizes="25vw" /></figure>
      <figure><Image src="/images/beach.jpg" alt="Sri Lanka’s southern coast" fill sizes="50vw" /></figure>
    </div>
  );
}

function StoryMosaic() {
  return (
    <div className="story-mosaic" aria-hidden="true">
      <figure><Image src="/images/kandy.jpg" alt="" fill sizes="30vw" /></figure>
      <figure><Image src="/images/tea-country.jpg" alt="" fill sizes="20vw" /></figure>
      <figure><Image src="/images/train.jpg" alt="" fill sizes="20vw" /></figure>
    </div>
  );
}

function RouteVisual({ route }: { route?: string }) {
  const stops = route?.split("→").map((stop) => stop.trim()) ?? ["Kandy", "Your chosen highlights", "Kandy"];
  return <div className="route-visual">{stops.map((stop, index) => <div className="route-stop" key={`${stop}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><b>{stop}</b></div>)}</div>;
}

function renderBlock(block: Block, index: number): ReactNode {
  if (block.type === "list") return <ul className="content-list" key={index}>{block.items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}</ul>;
  if (block.type === "quote") return <blockquote key={index}>{block.text}</blockquote>;
  if (block.type === "day") return <article className="itinerary-day" key={index}><span>{block.label}</span><p>{block.text}</p></article>;
  if (block.type === "fact") return <div className="quick-fact" key={index}><small>{block.label}</small><strong>{block.text}</strong></div>;
  if (block.type === "offer") return <article className="content-offer" key={index}><span aria-hidden="true">✦</span><p>{block.text}</p></article>;
  if (block.type === "contact") return <article className="contact-detail" key={index}>{block.text}</article>;
  if (block.text === "View All Round Tour Packages →") {
    return <Link className="content-action-link" href="/tours#round-tours" key={index}>View all round tour packages <span aria-hidden="true">→</span></Link>;
  }
  if (block.text === "Explore All Day Tours →") {
    return <Link className="content-action-link" href="/tours#day-tours" key={index}>Explore all day tours <span aria-hidden="true">→</span></Link>;
  }
  return <p key={index}>{block.text}</p>;
}

export function ContentRenderer({ raw, startAt = 0, route }: { raw: string; startAt?: number; route?: string }) {
  const sections = buildSections(raw, startAt);
  return (
    <div className="rich-content">
      {sections.map((section, index) => (
        <section className={sectionClass(section.heading)} key={`${section.heading ?? "opening"}-${index}`}>
          {section.heading && <h2>{section.heading}</h2>}
          <div className="panel-body">{section.blocks.map(renderBlock)}</div>
          {section.heading && /^About Minoli|^Our Story|^Our Commitment/.test(section.heading) && <StoryMosaic />}
          {section.heading?.startsWith("Tour Route Map") && <RouteVisual route={route} />}
          {section.heading?.startsWith("Image Gallery") && <Gallery />}
        </section>
      ))}
    </div>
  );
}
