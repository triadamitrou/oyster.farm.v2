import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { recipes } from "@/lib/site";

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = recipes.find((x) => x.slug === slug);
  return r ? { title: r.title, description: r.line } : {};
}

/** One recipe on one short page: photograph beside the facts, then the method. */
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = recipes.find((x) => x.slug === slug);
  if (!r) notFound();
  const others = recipes.filter((x) => x.slug !== r.slug);

  return (
    <>
      <section className="bg-ivory pb-12 pt-28 sm:pb-24 sm:pt-40">
        <div className="u-wrap">
          <Link href="/recipes/" className="u-cap text-mute hover:text-ink">
            &larr; All recipes
          </Link>
          <div className="mt-6 grid gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <div className={`relative aspect-[5/4] overflow-hidden md:aspect-[4/5] ${r.image ? "" : "u-frame"}`}>
                {r.image ? <Image src={r.image} alt={r.alt ?? ""} fill priority sizes="(min-width:768px) 40vw, 100vw" className="object-cover" /> : null}
              </div>
            </div>
            <div className="md:col-span-7">
              <h1 className="u-serif text-[clamp(2.2rem,5vw,4.2rem)]">{r.title}</h1>
              <p className="u-serif mt-2 text-[1.3rem] italic text-mute">{r.line}</p>
              <dl className="mt-6 grid grid-cols-3 border-y border-ink/15 py-4 text-center">
                {[
                  ["Time", r.time],
                  ["Needs", r.needs],
                  ["Makes", r.serves],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="u-cap text-[0.6rem] text-bronze">{k}</dt>
                    <dd className="mt-1 text-[0.95rem]">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 grid gap-8 sm:grid-cols-[1fr_1.4fr]">
                <div>
                  <h2 className="u-cap text-bronze">Ingredients</h2>
                  <ul className="mt-3 space-y-1.5 text-[0.98rem] text-ink/80">
                    {r.ingredients.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="u-cap text-bronze">Method</h2>
                  <ol className="mt-3 space-y-3 text-ink/85">
                    {r.method.map((m, k) => (
                      <li key={k} className="flex gap-4">
                        <span className="u-serif text-[1.2rem] italic text-bronze">{k + 1}</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="More recipes" className="border-t border-ink/15 bg-shell py-8">
        <div className="u-wrap flex flex-wrap items-baseline gap-x-8 gap-y-2">
          <span className="u-cap text-bronze">More</span>
          {others.map((o) => (
            <Link key={o.slug} href={`/recipes/${o.slug}/`} className="u-serif u-link text-[1.2rem]">
              {o.title}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
