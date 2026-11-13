import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Title } from "@/components/Bits";
import Masthead from "@/components/Masthead";
import { Reveal } from "@/components/Reveal";
import { recipes, shuck } from "@/lib/site";

export const metadata: Metadata = { title: "Recipes", description: "How to shuck an oyster, and what to do with it afterwards." };

export default function Page() {
  return (
    <>
      <Masthead folio="05" cap="Recipes" lead="In the" em="kitchen" lede="How to open an oyster, and what to do with it afterwards." />

      {/* How to shuck: four numbered moves. */}
      <section id="shuck" className="scroll-mt-24 bg-ivory py-14 sm:py-36">
        <div className="u-wrap">
          <Title cap="First things first" title="How to shuck" arc />
          <p className="mt-6 max-w-[52ch] text-ink/70">An oyster knife, a folded cloth and a steady board. Never a kitchen knife.</p>
          <ol className="mt-10 grid grid-cols-2 gap-px bg-ink/15 sm:mt-16 lg:grid-cols-4">
            {shuck.map((s, i) => (
              <Reveal as="li" key={s.title} mode="rise" delay={i * 110} className="bg-ivory p-5 sm:p-8">
                <span className="u-serif text-[2.4rem] italic leading-none text-bronze sm:text-[3.4rem]">{["I", "II", "III", "IV"][i]}</span>
                <h3 className="u-serif mt-6 text-[1.9rem]">{s.title}</h3>
                <p className="mt-3 text-ink/70">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* The recipes: photographs to click, a title, the time and what it needs. */}
      <section className="bg-shell py-12 sm:py-28">
        <div className="u-wrap">
          <Title cap="From the harbour" title="Four to begin with" />
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-12 sm:gap-x-6 lg:grid-cols-4">
            {recipes.map((r, i) => (
              <li key={r.slug} className={i % 2 ? "lg:mt-12" : ""}>
                <Link href={`/recipes/${r.slug}/`} className="group block">
                  <div className={`relative overflow-hidden ${i % 2 ? "aspect-square" : "aspect-[4/5]"} ${r.image ? "" : "u-frame"}`}>
                    {r.image ? (
                      <Image
                        src={r.image}
                        alt={r.alt ?? ""}
                        fill
                        sizes="(min-width:1024px) 23vw, 46vw"
                        className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]"
                      />
                    ) : null}
                  </div>
                  <h3 className="u-serif mt-3 text-[1.25rem] leading-snug sm:text-[1.6rem]">{r.title}</h3>
                  <p className="u-cap mt-2 text-[0.6rem] text-bronze sm:text-[0.66rem]">
                    {r.time} &nbsp;&middot;&nbsp; {r.needs}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
