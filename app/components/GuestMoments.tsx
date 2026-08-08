import Image from "next/image";

type GuestMomentsProps = {
  eyebrow: string;
  title: string;
  intro: string;
  images: readonly string[];
  variant?: "light" | "ivory" | "forest";
};

export function GuestMoments({ eyebrow, title, intro, images, variant = "light" }: GuestMomentsProps) {
  return (
    <section className={`guest-moments guest-moments-${variant} section-pad`}>
      <div className="section-heading">
        <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>
        <p>{intro}</p>
      </div>
      <div className={`guest-moments-grid guest-moments-count-${images.length}`}>
        {images.map((src, index) => (
          <figure key={src}>
            <Image src={src} alt={`A Minoli Lanka Tours guest moment in Sri Lanka ${index + 1}`} fill sizes="(max-width: 760px) 100vw, 33vw" />
          </figure>
        ))}
      </div>
    </section>
  );
}
