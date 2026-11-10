import type { Metadata } from "next";
import { Opening } from "@/components/Bits";
import { Reveal } from "@/components/Reveal";
import { mailto, site, work } from "@/lib/site";

export const metadata: Metadata = { title: "Work with us", description: "Restaurants, retailers, ambassadors and kelp partners." };

export default function Page() {
  return (
    <>
      <Opening cap="Work with us" title="Become a partner" lede="For kitchens, counters and makers who want the harbour on their side." image="/img/kelp-harvest.jpg" alt="Kelp harvested into the farm boat" />

      <section className="bg-ivory py-28 sm:py-36">
        <div className="u-wrap">
          <ul className="border-t border-ink/15">
            {work.map((w, i) => (
              <Reveal as="li" key={w.title} mode="rise" delay={i * 80} className="border-b border-ink/15">
                <a href={mailto(`Work with us: ${w.subject}`)} className="group grid items-baseline gap-3 py-9 md:grid-cols-[auto_1.2fr_1.5fr_auto] md:gap-10">
                  <span className="u-serif w-12 text-[1.8rem] italic text-bronze">{["I", "II", "III", "IV", "V"][i]}</span>
                  <span className="u-serif text-[clamp(2rem,3.6vw,3rem)] transition-transform duration-700 group-hover:translate-x-3">{w.title}</span>
                  <span className="text-ink/65">{w.body}</span>
                  <span className="u-cap text-bronze">Write &rarr;</span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-night py-28 text-center text-ivory sm:py-36">
        <div className="u-wrap">
          <p className="u-cap text-sand">Or simply</p>
          <a href={mailto()} className="u-serif u-link mt-6 inline-block text-[clamp(1.8rem,5vw,4rem)]">
            {site.email}
          </a>
        </div>
      </section>
    </>
  );
}
