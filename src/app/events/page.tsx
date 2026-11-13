import type { Metadata } from "next";
import Image from "next/image";
import Masthead from "@/components/Masthead";
import { Reveal } from "@/components/Reveal";
import { events, inAction, mailto } from "@/lib/site";

export const metadata: Metadata = { title: "Events", description: "Farm tours, and an oyster bar for your own occasion." };

/**
 * Each event leads with film. The farm has not shot these yet, so each
 * has a wide frame with a play mark, sized for the real film, and a row
 * of stills beneath.
 */
export default function Page() {
  return (
    <>
      <Masthead folio="06" cap="Events" lead="On the" em="water" lede="Farm tours on the harbour, and an oyster bar for your own occasion." />

      {/* In action: four tall tiles of silent, looping film. */}
      <section aria-labelledby="in-action" className="bg-white py-12 sm:py-28">
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
        <section key={e.key} id={e.key} className={`scroll-mt-20 py-12 sm:py-24 ${i % 2 ? "bg-shell" : "bg-ivory"}`}>
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

            {/* One low strip: the film frame, then the stills, all the same modest height. */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-6 sm:gap-4">
              <Reveal mode="fade" className="col-span-2">
                <div className="u-frame relative h-36 sm:h-44">
                  <span aria-hidden="true" className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ivory/50 text-ivory">
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor">
                      <path d="M7 4v16l13-8z" />
                    </svg>
                  </span>
                </div>
              </Reveal>
              {("stills" in e && e.stills ? e.stills : [null, null, null, null]).map((st, n) => (
                <Reveal key={n} mode="rise" delay={n * 90}>
                  <div className={`relative h-28 overflow-hidden sm:h-44 ${st ? "" : "u-frame"}`}>
                    {st ? <Image src={st.src} alt={st.alt} fill sizes="(min-width:640px) 17vw, 50vw" className="object-cover" /> : null}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
