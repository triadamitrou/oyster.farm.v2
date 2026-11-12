import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";

/**
 * A full-screen opening that is almost all photograph: the plate in the
 * middle of the screen under a soft grey veil, one quiet line set at the
 * left of centre with its last words in italic, a link to the shop, and
 * a small turning seal at the foot inviting the scroll.
 */
export default function Showcase({
  name,
  image,
  alt,
  lead,
  em,
}: {
  name: string;
  image: string;
  alt: string;
  lead: string;
  em: string;
}) {
  return (
    <section className="relative flex h-[100svh] min-h-[34rem] items-center overflow-hidden bg-night text-ivory">
      <Image src={image} alt={alt} fill priority sizes="100vw" className="u-drift object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-[#3a3d42]/55" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night/70 to-transparent" />

      <div className="u-wrap relative">
        <Reveal as="p" mode="fade" className="u-cap text-ivory/80">
          {name}
        </Reveal>
        <Reveal as="h1" mode="rise" delay={150} className="mt-5 max-w-[14ch] text-[clamp(2.2rem,4.6vw,4rem)] font-light leading-[1.12] tracking-[-0.01em]">
          {lead} <em className="u-serif text-[1.12em] italic">{em}</em>
        </Reveal>
        <Reveal mode="fade" delay={500} className="mt-9">
          <Link href="/shop/" className="u-link text-[0.95rem] font-medium">
            Shop now
          </Link>
        </Reveal>
      </div>

      {/* The seal: the invitation to scroll, turning slowly. */}
      <a href="#more" aria-label="Scroll down to discover" className="absolute bottom-7 left-[var(--gutter)] block h-24 w-24">
        <svg viewBox="0 0 100 100" className="u-turn h-full w-full" aria-hidden="true">
          <defs>
            <path id="seal" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1 -76 0" />
          </defs>
          <text fill="currentColor" fontSize="8.4" letterSpacing="3.1" style={{ fontFamily: "var(--font-sans)", textTransform: "uppercase" }}>
            <textPath href="#seal">Scroll down · to discover ·</textPath>
          </text>
        </svg>
        <svg viewBox="0 0 100 60" fill="none" aria-hidden="true" className="absolute left-1/2 top-1/2 w-9 -translate-x-1/2 -translate-y-1/2">
          <path d="M6 54C10 26 32 6 60 6c12 0 24 4 34 11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </a>
    </section>
  );
}
