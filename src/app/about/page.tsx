import type { Metadata } from "next";
import Link from "next/link";
import { Opening, Photo, Title } from "@/components/Bits";
import { Reveal, Words } from "@/components/Reveal";
import ValuesRail from "@/components/ValuesRail";
import { house, site } from "@/lib/site";

export const metadata: Metadata = { title: "The house", description: house.lede };

export default function Page() {
  return (
    <>
      <Opening cap={`The house, since ${site.since}`} title={house.title} lede={house.lede} image="/img/oyster-bags.jpg" alt="The farm's oyster lines in Portland Harbour" />

      <section className="bg-ivory py-28 sm:py-40">
        <div className="u-wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Words
              as="h2"
              text="Part of the change, not the problem."
              className="u-serif text-[clamp(2.6rem,5.6vw,5rem)] italic"
            />
            <Reveal mode="rise" className="mt-8 max-w-[48ch] text-[1.08rem] text-ink/75">
              {house.turn}
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:col-start-8">
            <Photo src="/img/founder-beach.jpg" alt="One of the founders on the beach" ratio="aspect-[3/4]" sizes="25vw" className="mt-16" />
            <Photo src="/img/founder-boat.jpg" alt="One of the founders at the farm, in oilskins" ratio="aspect-[3/4]" sizes="25vw" />
          </div>
        </div>
      </section>

      <section className="bg-shell py-28 sm:py-36">
        <div className="u-wrap grid items-center gap-12 md:grid-cols-2">
          <Photo src="/img/kelp-pontoon.jpg" alt="The farm boat at the pontoon, loaded with kelp" ratio="aspect-[4/5]" />
          <div>
            <Title cap="How the farm works" title="A natural recycling system" arc />
            <p className="mt-8 max-w-[46ch] text-[1.08rem] text-ink/75">{house.imta}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/oysters/" className="u-btn">
                The oysters
              </Link>
              <Link href="/kelp/" className="u-btn">
                The kelp
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ValuesRail />
    </>
  );
}
