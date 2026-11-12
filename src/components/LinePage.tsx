import Link from "next/link";
import { Opening, Title } from "./Bits";
import Showcase from "./Showcase";
import ProcessRail from "./ProcessRail";
import { Reveal } from "./Reveal";
import { lines, mailto, type Line } from "@/lib/site";

/** One template for the three lines: the product, then how it is grown. */
export default function LinePage({ l }: { l: Line }) {
  const others = lines.filter((x) => x.slug !== l.slug);
  return (
    <>
      {l.showcase ? (
        <Showcase name={l.name} {...l.showcase} />
      ) : (
        <Opening cap={l.kicker} title={l.name} lede={l.line} image={l.image} alt={l.alt} />
      )}

      <section id="more" className="scroll-mt-20 bg-ivory py-28 sm:py-36">
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

      {/* The process: a rail of small photographs with captions. */}
      <ProcessRail title={`${{ oysters: "Oyster", mussels: "Mussel", kelp: "Kelp" }[l.slug]} farming`} steps={l.steps} />

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
