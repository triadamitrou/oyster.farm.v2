import Image from "next/image";
import Link from "next/link";
import { Arc, Photo, Title } from "@/components/Bits";
import { Reveal, Words } from "@/components/Reveal";
import ValuesRail from "@/components/ValuesRail";
import { events, house, lines, serving, site } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* 1. The opening: open sea from above, dark, with the name set over it.
          Stock film (Pexels, "Drone Footage of Blue Water", Engin Akyurt), a
          stand-in until the farm films its own water. */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-night pb-20 text-ivory sm:pb-28">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          src="/video/sea.mp4"
          poster="/img/sea-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night via-night/35 to-night/50" />
        <div className="u-wrap relative">
          <Arc className="mb-7 w-20 text-sand" />
          <Reveal as="p" mode="fade" className="u-cap text-sand">
            Portland Harbour, Jurassic Coast
          </Reveal>
          <Words
            as="h1"
            text="Harvesting the future"
            className="u-serif mt-6 max-w-[13ch] text-[clamp(3.2rem,9.5vw,9rem)]"
            stagger={80}
          />
          <Reveal mode="rise" delay={600} className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/oysters/" className="u-btn u-btn--sand">
              Discover the oysters
            </Link>
            <Link href="/shop/" className="u-btn u-btn--light">
              Shop
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 2. The house, in one sentence. */}
      <section className="bg-ivory py-28 sm:py-40">
        <div className="u-wrap">
          <Reveal as="p" mode="fade" className="u-cap text-bronze">
            The house
          </Reveal>
          <Words
            as="p"
            text="Oysters, mussels and Sugar Kelp, grown side by side in one sheltered harbour, with nothing added but the tide."
            className="u-serif mt-8 max-w-[22ch] text-[clamp(2rem,4.6vw,4.2rem)] leading-[1.12]"
            stagger={30}
          />
        </div>
      </section>

      {/* 3. Three lines: one row each, alternating. */}
      <section aria-label="What the house grows" className="bg-ivory pb-28 sm:pb-40">
        <div className="u-wrap grid gap-24 sm:gap-36">
          {lines.map((l, i) => (
            <article key={l.slug} className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
              <Photo
                src={l.image}
                alt={l.alt}
                light
                ratio={i === 0 ? "aspect-[4/5]" : "aspect-[5/4]"}
                sizes="(min-width:768px) 50vw, 100vw"
                className={`md:col-span-6 ${i % 2 ? "md:order-2 md:col-start-7" : ""}`}
              />
              <div className={`md:col-span-5 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
                <p className="u-cap text-bronze">
                  {String(i + 1).padStart(2, "0")} &nbsp; {l.kicker}
                </p>
                <h2 className="u-serif mt-5 text-[clamp(2.6rem,5vw,4.4rem)]">{l.name}</h2>
                <p className="u-serif mt-2 text-[1.3rem] italic text-mute">{l.latin}</p>
                <p className="mt-6 max-w-[40ch] text-[1.08rem] text-ink/75">{l.line}</p>
                <Link href={`/${l.slug}/`} className="u-btn mt-9">
                  The {l.slug === "kelp" ? "kelp" : l.slug}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Three ways to receive it. */}
      <section className="bg-shell py-28 sm:py-36">
        <div className="u-wrap">
          <Title cap="At the table" title="Three ways to receive it" arc className="text-center [&_svg]:mx-auto [&>div]:mx-auto" />
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {serving.map((s, i) => (
              <Reveal key={s.title} mode="rise" delay={i * 140} className={i === 1 ? "md:mt-16" : ""}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={s.image} alt={s.alt} fill sizes="(min-width:768px) 30vw, 100vw" className="object-cover" />
                </div>
                <h3 className="u-serif mt-6 text-[1.9rem]">{s.title}</h3>
                <p className="mt-2 max-w-[32ch] text-ink/70">{s.body}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link href="/recipes/" className="u-btn">
              Recipes and how to shuck
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Values, in a rail that scrolls sideways. */}
      <ValuesRail />

      {/* 6. Ambassadors: frames for the chefs to come. */}
      <section className="bg-night py-28 text-ivory sm:py-36">
        <div className="u-wrap grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="u-cap text-sand">At the pass</p>
            <h2 className="u-serif mt-5 text-[clamp(2.6rem,5vw,4.4rem)]">
              Meet our <span className="italic">ambassadors</span>
            </h2>
            <p className="mt-6 max-w-[34ch] text-ivory/70">
              The chefs and makers who put the harbour on the plate.
            </p>
            <Link href="/work-with-us/" className="u-btn u-btn--light mt-9">
              Become one
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((n) => (
              <Reveal key={n} mode="rise" delay={n * 140}>
                <div className="u-frame aspect-[3/4] border border-ivory/10" />
                <div aria-hidden="true" className="mt-4 h-px w-10 bg-sand/60" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. On the water. */}
      <section className="bg-ivory py-28 sm:py-36">
        <div className="u-wrap">
          <Title cap="Events" title="Come out on the water" />
          <ul className="mt-14 border-t border-ink/15">
            {events.map((e) => (
              <li key={e.key} className="border-b border-ink/15">
                <Link href={`/events/#${e.key}`} className="group grid items-baseline gap-3 py-8 md:grid-cols-[1fr_2fr_auto] md:gap-10">
                  <span className="u-cap text-bronze">{e.kicker}</span>
                  <span>
                    <span className="u-serif block text-[clamp(1.9rem,3.4vw,2.8rem)] transition-transform duration-700 group-hover:translate-x-3">
                      {e.title}
                    </span>
                    <span className="mt-2 block max-w-[56ch] text-ink/65">{e.body}</span>
                  </span>
                  <span aria-hidden="true" className="u-serif text-3xl text-bronze">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. The people. */}
      <section className="bg-shell py-28 sm:py-36">
        <div className="u-wrap grid items-center gap-12 md:grid-cols-12">
          <Photo src="/img/founders-boat.jpg" alt="Lydia and Andy on the farm boat in Portland Harbour" ratio="aspect-square" className="md:col-span-5" />
          <div className="md:col-span-6 md:col-start-7">
            <p className="u-cap text-bronze">Since {site.since}</p>
            <h2 className="u-serif mt-5 text-[clamp(2.6rem,5vw,4.4rem)]">{house.title}</h2>
            <p className="mt-6 max-w-[46ch] text-[1.08rem] text-ink/75">{house.turn}</p>
            <Link href="/about/" className="u-btn mt-9">
              The house
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
