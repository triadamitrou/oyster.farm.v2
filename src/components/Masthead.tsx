import { Arc } from "./Bits";
import { Reveal } from "./Reveal";

/**
 * The opening for every page that is not a product: no photograph, only
 * type. A folio line across the top, the title set very large with its
 * last word in bronze italic, then a rule and the lede pushed out to the
 * right under the logo's crescent. Product pages keep their photographs;
 * these read like the title page of a book.
 */
export default function Masthead({
  folio,
  cap,
  lead,
  em,
  lede,
}: {
  /** The page's number in the house's order, e.g. "04". */
  folio: string;
  cap: string;
  lead: string;
  em: string;
  lede: string;
}) {
  return (
    <section className="bg-ivory pb-14 pt-36 sm:pb-20 sm:pt-44">
      <div className="u-wrap">
        <Reveal mode="fade" className="flex items-baseline justify-between border-b border-ink/15 pb-4">
          <p className="u-cap text-bronze">{cap}</p>
          <p className="u-serif text-[1.1rem] italic text-mute">
            N<sup>o</sup> {folio}
          </p>
        </Reveal>

        <h1 className="u-serif mt-10 text-[clamp(3.6rem,13.5vw,13.5rem)] leading-[0.9] tracking-[-0.025em] sm:mt-14">
          <Reveal as="span" mode="rise" className="block">
            {lead}
          </Reveal>
          <Reveal as="span" mode="rise" delay={160} className="block pl-[12%] italic text-bronze sm:pl-[22%]">
            {em}
          </Reveal>
        </h1>

        <div className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-12">
          <div className="md:col-span-5 md:col-start-8">
            <Arc className="mb-4 w-12 text-bronze" />
            <Reveal mode="rise" delay={300} className="max-w-[40ch] text-[1.1rem] text-ink/75">
              {lede}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
