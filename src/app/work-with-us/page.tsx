import type { Metadata } from "next";
import Link from "next/link";
import { Arc } from "@/components/Bits";
import { Reveal } from "@/components/Reveal";
import { mailto, site } from "@/lib/site";

export const metadata: Metadata = { title: "Work with us", description: "Jurassic Seafarms welcomes volunteers on the farm in Portland Harbour." };

/**
 * One short page, no opening spread: the farm accepts volunteers, and
 * this is how to get in touch. Trade buyers are pointed to the shop.
 */
export default function Page() {
  return (
    <section className="flex min-h-[78svh] items-center bg-ivory pb-24 pt-40">
      <div className="u-wrap">
        <div className="max-w-[46rem]">
          <Arc className="mb-5 w-14 text-bronze" />
          <p className="u-cap text-bronze">Work with us</p>
          <Reveal as="h1" mode="rise" className="u-serif mt-5 text-[clamp(2.6rem,6vw,5rem)]">
            We welcome <em className="italic text-bronze">volunteers</em>
          </Reveal>
          <Reveal mode="rise" delay={150} className="mt-7 max-w-[46ch] text-[1.12rem] text-ink/75">
            Jurassic Seafarms accepts volunteers on the farm in {site.farm}. To lend a hand, write to us and say a little
            about yourself.
          </Reveal>
          <Reveal mode="fade" delay={300} className="mt-9 flex flex-wrap items-center gap-6">
            <a href={mailto("Volunteering")} className="u-btn bg-night !text-ivory">
              Volunteer
            </a>
            <a href={mailto("Volunteering")} className="u-link">
              {site.email}
            </a>
          </Reveal>
          <p className="mt-14 border-t border-ink/15 pt-6 text-[0.92rem] text-mute">
            Buying for a restaurant or shop?{" "}
            <Link href="/shop/#trade" className="u-link text-ink">
              Wholesale
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
