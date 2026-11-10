import type { Metadata } from "next";
import { Opening, Title } from "@/components/Bits";
import { Reveal } from "@/components/Reveal";
import ShopCounter from "@/components/ShopCounter";
import { mailto, wholesale } from "@/lib/site";

export const metadata: Metadata = { title: "Shop", description: "Oysters, mussels and Sugar Kelp from Portland Harbour, for the table and for the trade." };

export default function Page() {
  return (
    <>
      <Opening cap="The shop" title="From the harbour" lede="For the table, and for the trade." image="/img/oyster-bags.jpg" alt="Oyster bags in a line across Portland Harbour" />

      <nav aria-label="Shop sections" className="border-b border-ink/15 bg-ivory">
        <div className="u-wrap flex gap-10 py-5">
          <a href="#table" className="u-cap text-bronze">
            For the table
          </a>
          <a href="#trade" className="u-cap text-mute hover:text-ink">
            Wholesale
          </a>
        </div>
      </nav>

      <section id="table" className="scroll-mt-24 bg-ivory py-24 sm:py-32">
        <div className="u-wrap">
          <Title cap="For the table" title="The counter" className="mb-16" />
          <ShopCounter />
        </div>
      </section>

      <section id="trade" className="scroll-mt-24 bg-night py-28 text-ivory sm:py-36">
        <div className="u-wrap grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="u-cap text-sand">Wholesale</p>
            <h2 className="u-serif mt-5 text-[clamp(2.6rem,5vw,4.4rem)]">{wholesale.title}</h2>
            <p className="mt-6 max-w-[42ch] text-ivory/75">{wholesale.body}</p>
            <a href={mailto("Wholesale enquiry")} className="u-btn u-btn--sand mt-9">
              Open a trade account
            </a>
          </div>
          <ul className="border-t border-ivory/15">
            {wholesale.points.map((p, i) => (
              <Reveal as="li" key={p.title} mode="rise" delay={i * 120} className="flex items-baseline gap-8 border-b border-ivory/15 py-8">
                <span className="u-serif text-[2rem] italic text-sand">{["I", "II", "III"][i]}</span>
                <span>
                  <span className="u-serif block text-[2rem]">{p.title}</span>
                  <span className="mt-1 block text-ivory/65">{p.body}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
