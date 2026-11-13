import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Masthead from "@/components/Masthead";
import { Reveal } from "@/components/Reveal";
import { BasketLink } from "@/components/ShopBits";
import { mailto, shop, wholesale } from "@/lib/site";

export const metadata: Metadata = { title: "Shop", description: "Oysters, mussels and Sugar Kelp from Portland Harbour, for the table and for the trade." };

/**
 * The shop is a short list: three products, each a photograph and a
 * name that open that product's own page. Choosing size and quantity
 * happens there, not here.
 */
export default function Page() {
  return (
    <>
      <Masthead folio="04" cap="The shop" lead="From the" em="harbour" lede="Order online and collect from Portland Harbour. Choose a product to see sizes and quantities." />

      <section id="table" className="scroll-mt-24 bg-ivory pb-14 sm:pb-28">
        <div className="u-wrap">
          <div className="flex items-center justify-between border-y border-ink/15 py-4">
            <p className="u-cap text-bronze">Click and collect</p>
            <BasketLink />
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:mt-12 sm:gap-x-8 lg:grid-cols-3">
            {shop.consumer.map((it, i) => (
              <Reveal as="li" key={it.key} mode="rise" delay={i * 100} className={i === 0 ? "col-span-2 lg:col-span-1" : ""}>
                <Link href={`/shop/${it.key}/`} className="group block">
                  <div className={`relative overflow-hidden ${i === 0 ? "aspect-[16/10] lg:aspect-[4/5]" : "aspect-[4/5]"} ${it.image ? "" : "u-frame"}`}>
                    {it.image ? (
                      <Image
                        src={it.image}
                        alt={it.alt}
                        fill
                        sizes="(min-width:1024px) 30vw, (min-width:640px) 46vw, 100vw"
                        className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                      />
                    ) : null}
                  </div>
                  <p className="u-cap mt-4 text-[0.62rem] text-bronze">{it.kicker}</p>
                  <h2 className="u-serif mt-1 text-[1.6rem] sm:text-[2.1rem]">{it.name}</h2>
                  <p className="mt-1 text-[0.92rem] text-ink/65">
                    {it.packs[0].label} to {it.packs[it.packs.length - 1].label.toLowerCase()}
                  </p>
                  <span className="u-cap mt-3 inline-block border-b border-ink/40 pb-1 text-[0.62rem] transition-colors group-hover:border-bronze group-hover:text-bronze">
                    Choose
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="trade" className="scroll-mt-24 bg-night py-14 text-ivory sm:py-28">
        <div className="u-wrap grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <div>
            <p className="u-cap text-sand">Wholesale</p>
            <h2 className="u-serif mt-4 text-[clamp(2rem,4.4vw,3.8rem)]">{wholesale.title}</h2>
            <p className="mt-5 max-w-[42ch] text-ivory/75">{wholesale.body}</p>
            <a href={mailto("Wholesale enquiry")} className="u-btn u-btn--sand mt-8">
              Open a trade account
            </a>
          </div>
          <ul className="border-t border-ivory/15">
            {wholesale.points.map((p, i) => (
              <li key={p.title} className="flex items-baseline gap-6 border-b border-ivory/15 py-5 sm:py-7">
                <span className="u-serif text-[1.6rem] italic text-sand">{["I", "II", "III"][i]}</span>
                <span>
                  <span className="u-serif block text-[1.6rem] sm:text-[2rem]">{p.title}</span>
                  <span className="mt-1 block text-ivory/65">{p.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
