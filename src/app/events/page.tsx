import type { Metadata } from "next";
import Image from "next/image";
import Masthead from "@/components/Masthead";
import { Reveal } from "@/components/Reveal";
import { events, inAction, mailto } from "@/lib/site";

export const metadata: Metadata = { title: "Events", description: "Farm tours, the oyster cruise and the oyster bar." };

/**
 * Each event leads with film. The farm has not shot these yet, so each
 * has a wide frame with a play mark, sized for the real film, and a row
 * of stills beneath.
 */
export default function Page() {
  return (
    <>
      <Masthead folio="06" cap="Events" lead="On the" em="water" lede="Farm tours, an evening cruise, and an oyster bar for your own occasion." />

      {/* In action: four tall tiles of silent, looping film. */}
      <section aria-labelledby="in-action" className="bg-white py-20 sm:py-28">
        <div className="u-wrap">
          <div className="max-w-3xl">
            <p className="u-cap text-bronze">{inAction.cap}</p>
            <h2 id="in-action" className="u-serif mt-3 text-[clamp(2rem,3.4vw,2.8rem)]">
              {inAction.title}
            </h2>
            <p className="mt-3 text-ink/65">{inAction.body}</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
            {inAction.clips.map((c, n) => (
              <Reveal key={c.src} mode="rise" delay={n * 90}>
                <div className="aspect-[3/4] overflow-hidden bg-shell">
                  <video
                    className="h-full w-full object-cover"
                    src={c.src}
                    poster={c.poster}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                    aria-label={c.label}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {events.map((e, i) => (
        <section key={e.key} id={e.key} className={`scroll-mt-20 py-28 sm:py-36 ${i % 2 ? "bg-shell" : "bg-ivory"}`}>
          <div className="u-wrap">
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="u-cap text-bronze">
                  {String(i + 1).padStart(2, "0")} &nbsp; {e.kicker}
                </p>
                <h2 className="u-serif mt-5 text-[clamp(2.8rem,6vw,5.4rem)]">{e.title}</h2>
              </div>
              <div className="lg:pb-3">
                <p className="max-w-[48ch] text-[1.08rem] text-ink/75">{e.body}</p>
                <a href={mailto(`${e.title}: enquiry`)} className="u-btn mt-7">
                  Enquire
                </a>
              </div>
            </div>

            <Reveal mode="fade" className="mt-14">
              <div className="u-frame relative aspect-[16/8]">
                <span aria-hidden="true" className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ivory/50 text-ivory">
                  <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor">
                    <path d="M7 4v16l13-8z" />
                  </svg>
                </span>
              </div>
            </Reveal>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {("stills" in e && e.stills ? e.stills : [null, null, null, null]).map((st, n) => (
                <Reveal key={n} mode="rise" delay={n * 90}>
                  {st ? (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={st.src} alt={st.alt} fill sizes="(min-width:640px) 25vw, 50vw" className="object-cover" />
                    </div>
                  ) : (
                    <div className="u-frame aspect-[3/4]" />
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
