"use client";

import Image from "next/image";
import { useRef } from "react";
import { values } from "@/lib/site";

/**
 * The values as tall dark panels in a row that scrolls sideways, each a
 * photograph with its words set in a small plate at the foot.
 */
export default function ValuesRail() {
  const rail = useRef<HTMLDivElement>(null);
  const move = (dir: number) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.6, behavior: "smooth" });

  return (
    <section aria-labelledby="values-title" className="bg-night py-24 text-ivory sm:py-32">
      <div className="u-wrap flex items-end justify-between gap-8">
        <div>
          <p className="u-cap text-sand">What we hold to</p>
          <h2 id="values-title" className="u-serif mt-4 text-[clamp(2.6rem,5vw,4.4rem)]">
            Our values
          </h2>
        </div>
        <div className="flex gap-3">
          {[-1, 1].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => move(d)}
              aria-label={d < 0 ? "Previous values" : "More values"}
              className="grid h-12 w-12 place-items-center border border-ivory/30 text-xl transition-colors hover:bg-ivory hover:text-night"
            >
              {d < 0 ? "←" : "→"}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={rail}
        tabIndex={0}
        aria-label="Our values, scroll sideways"
        className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {values.map((v) => (
          <article key={v.title} className="relative h-[52vh] min-h-[20rem] w-[72vw] sm:h-[70vh] sm:min-h-[26rem] shrink-0 snap-start overflow-hidden sm:w-[42vw] lg:w-[27vw]">
            <Image src={v.image} alt="" fill sizes="(min-width:1024px) 27vw, 78vw" className="object-cover opacity-70" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-5 bg-night/85 p-5 backdrop-blur-sm">
              <h3 className="u-serif text-[1.7rem] italic">{v.title}</h3>
              <p className="mt-2 text-[0.92rem] text-ivory/75">{v.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
