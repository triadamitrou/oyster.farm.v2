import Image from "next/image";
import { Reveal, Words } from "./Reveal";

/**
 * The crescent from the logo: a thin bronze arc that draws itself. The
 * house's one ornament, used sparingly above a section's title.
 */
export function Arc({ className = "w-16 text-bronze" }: { className?: string }) {
  return (
    <Reveal mode="draw" className={className}>
      <svg viewBox="0 0 100 60" fill="none" aria-hidden="true" className="w-full">
        <path d="M6 54C10 26 32 6 60 6c12 0 24 4 34 11" stroke="currentColor" strokeWidth="1.4" pathLength={1} strokeLinecap="round" />
      </svg>
    </Reveal>
  );
}

/** A photograph, or a silent frame of the same size when there is none yet. */
export function Photo({
  src,
  alt,
  ratio = "aspect-[4/5]",
  sizes = "50vw",
  light = false,
  priority = false,
  className = "",
}: {
  src: string | null;
  alt: string;
  ratio?: string;
  sizes?: string;
  light?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Reveal mode="port" className={className}>
      <div className={`relative ${ratio} ${src ? "" : light ? "u-frame--light" : "u-frame"}`}>
        {src ? <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" /> : null}
      </div>
    </Reveal>
  );
}

/** The house's title block: tracked capital, then a serif line. */
export function Title({
  cap,
  title,
  as = "h2",
  className = "",
  size = "text-[clamp(2.6rem,5.4vw,4.8rem)]",
  arc = false,
}: {
  cap: string;
  title: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  size?: string;
  arc?: boolean;
}) {
  return (
    <div className={className}>
      {arc ? <Arc className="mb-5 w-14 text-bronze" /> : null}
      <Reveal as="p" mode="fade" className="u-cap text-bronze">
        {cap}
      </Reveal>
      <Words as={as} text={title} className={`u-serif mt-4 ${size}`} />
    </div>
  );
}

/** The dark opening every inner page starts with. */
export function Opening({
  cap,
  title,
  lede,
  image,
  alt,
}: {
  cap: string;
  title: string;
  lede?: string;
  image?: string | null;
  alt?: string;
}) {
  return (
    <section className="relative flex min-h-[86svh] items-end overflow-hidden bg-night pb-16 pt-40 text-ivory sm:pb-24">
      {image ? (
        <>
          <Image src={image} alt={alt ?? ""} fill priority sizes="100vw" className="object-cover opacity-55" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/30" />
        </>
      ) : (
        <div aria-hidden="true" className="u-frame absolute inset-0" />
      )}
      <div className="u-wrap relative">
        <Arc className="mb-6 w-16 text-sand" />
        <Reveal as="p" mode="fade" className="u-cap text-sand">
          {cap}
        </Reveal>
        <Words as="h1" text={title} className="u-serif mt-5 max-w-[14ch] text-[clamp(3.2rem,9vw,8rem)]" />
        {lede ? (
          <Reveal mode="rise" delay={300} className="mt-8 max-w-[52ch] text-[1.08rem] text-ivory/80">
            {lede}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
