import type { Metadata } from "next";
import { Opening, Title } from "@/components/Bits";
import { Reveal } from "@/components/Reveal";
import { recipes, shuck } from "@/lib/site";

export const metadata: Metadata = { title: "Recipes", description: "How to shuck an oyster, and what to do with it afterwards." };

export default function Page() {
  return (
    <>
      <Opening cap="In the kitchen" title="Recipes" lede="How to open an oyster, and what to do with it afterwards." image="/img/oysters-crate.jpg" alt="Oysters being sorted by hand" />

      {/* How to shuck: four numbered moves. */}
      <section id="shuck" className="scroll-mt-24 bg-ivory py-28 sm:py-36">
        <div className="u-wrap">
          <Title cap="First things first" title="How to shuck" arc />
          <p className="mt-6 max-w-[52ch] text-ink/70">An oyster knife, a folded cloth and a steady board. Never a kitchen knife.</p>
          <ol className="mt-16 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {shuck.map((s, i) => (
              <Reveal as="li" key={s.title} mode="rise" delay={i * 110} className="bg-ivory p-8">
                <span className="u-serif text-[3.4rem] italic leading-none text-bronze">{["I", "II", "III", "IV"][i]}</span>
                <h3 className="u-serif mt-6 text-[1.9rem]">{s.title}</h3>
                <p className="mt-3 text-ink/70">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-shell py-28 sm:py-36">
        <div className="u-wrap">
          <Title cap="From the harbour" title="Four to begin with" />
          <div className="mt-16 grid gap-x-12 gap-y-20 md:grid-cols-2">
            {recipes.map((r, i) => (
              <article key={r.slug} id={r.slug} className={`scroll-mt-28 ${i % 2 ? "md:mt-24" : ""}`}>
                <Reveal mode="fade">
                  <div className="u-frame aspect-[5/4]" />
                </Reveal>
                <p className="u-cap mt-7 text-bronze">
                  {r.time} &nbsp;/&nbsp; {r.serves}
                </p>
                <h3 className="u-serif mt-3 text-[clamp(2rem,3.4vw,2.8rem)]">{r.title}</h3>
                <p className="u-serif mt-1 text-[1.25rem] italic text-mute">{r.line}</p>
                <div className="mt-7 grid gap-8 sm:grid-cols-[1fr_1.3fr]">
                  <ul className="space-y-2 border-t border-ink/15 pt-4 text-[0.95rem] text-ink/75">
                    {r.ingredients.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <ol className="space-y-4 border-t border-ink/15 pt-4 text-ink/80">
                    {r.method.map((m, k) => (
                      <li key={k} className="flex gap-4">
                        <span className="u-serif text-[1.2rem] italic text-bronze">{k + 1}</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
