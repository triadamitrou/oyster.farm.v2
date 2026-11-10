import Link from "next/link";
import { Opening, Photo, Title } from "./Bits";
import { Reveal } from "./Reveal";
import { lines, mailto, type Line } from "@/lib/site";

/** One template for the three lines: the product, then how it is grown. */
export default function LinePage({ l }: { l: Line }) {
  const others = lines.filter((x) => x.slug !== l.slug);
  return (
    <>
      <Opening cap={l.kicker} title={l.name} lede={l.line} image={l.image} alt={l.alt} />

      <section className="bg-ivory py-28 sm:py-36">
        <div className="u-wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="u-serif text-[1.5rem] italic text-mute">{l.latin}</p>
            <Reveal mode="rise" className="u-serif mt-6 text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.25]">
              {l.intro}
            </Reveal>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            {l.notes ? (
              <dl className="border-t border-ink/15">
                {l.notes.map((n) => (
                  <div key={n.label} className="flex items-baseline justify-between gap-6 border-b border-ink/15 py-4">
                    <dt className="u-cap text-bronze">{n.label}</dt>
                    <dd className="text-right">{n.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop/" className="u-btn">
                Shop
              </Link>
              <a href={mailto(`${l.name}: trade enquiry`)} className="u-btn">
                Trade
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* The process: numbered stages, photographs where the farm has them. */}
      <section className="bg-night py-28 text-ivory sm:py-36">
        <div className="u-wrap">
          <Title cap="The process" title={`${l.steps.length === 4 ? "Four" : l.steps.length} stages, one harbour`} arc className="[&_.u-cap]:text-sand" />
          <ol className="mt-20 grid gap-x-10 gap-y-16 md:grid-cols-2">
            {l.steps.map((s, i) => (
              <li key={s.title} className={i % 2 ? "md:mt-24" : ""}>
                <Photo src={s.image ?? null} alt="" ratio="aspect-[5/4]" sizes="(min-width:768px) 45vw, 100vw" />
                <div className="mt-6 flex items-baseline gap-5">
                  <span className="u-serif text-[2.4rem] italic text-sand">{s.n}</span>
                  <div>
                    <h3 className="u-serif text-[2rem]">{s.title}</h3>
                    <p className="mt-2 max-w-[42ch] text-ivory/70">{s.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {l.uses ? (
        <section className="bg-shell py-28 sm:py-36">
          <div className="u-wrap">
            <Title cap="Benefits and applications" title="One crop, many industries" />
            <div className="mt-14 grid gap-px bg-ink/15 md:grid-cols-3">
              {l.uses.map((u, i) => (
                <Reveal key={u.title} mode="rise" delay={i * 120} className="bg-shell p-8 sm:p-10">
                  <p className="u-cap text-bronze">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="u-serif mt-4 text-[2rem]">{u.title}</h3>
                  <p className="mt-4 text-ink/70">{u.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-ivory">
        <div className="u-wrap grid md:grid-cols-2">
          {others.map((o, i) => (
            <Link
              key={o.slug}
              href={`/${o.slug}/`}
              className={`group flex items-center justify-between gap-6 border-ink/15 py-14 ${i === 0 ? "border-b md:border-b-0 md:border-r md:pr-10" : "md:pl-10"}`}
            >
              <span>
                <span className="u-cap block text-bronze">{o.kicker}</span>
                <span className="u-serif mt-3 block text-[clamp(2rem,4vw,3.2rem)]">{o.name}</span>
              </span>
              <span aria-hidden="true" className="u-serif text-3xl text-bronze transition-transform duration-700 group-hover:translate-x-2">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
