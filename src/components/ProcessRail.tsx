"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Step } from "@/lib/site";

/**
 * The process as a row of small photographs that scrolls sideways, each
 * with a short caption beneath, the last one running off the edge so it
 * is plain there is more. A stage with no photograph yet keeps a silent
 * frame of the same size.
 */
export default function ProcessRail({ title, steps }: { title: string; steps: Step[] }) {
  const rail = useRef<HTMLOListElement>(null);
  const move = (dir: number) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.6, behavior: "smooth" });

  return (
    <section aria-labelledby="process-title" className="border-t border-ink/10 bg-ivory py-12 sm:py-32">
      <div className="u-wrap flex items-end justify-between gap-8">
        <div>
          <p className="u-cap text-bronze">The process</p>
          <h2 id="process-title" className="u-serif mt-4 text-[clamp(2.6rem,5vw,4.4rem)]">
            {title}
          </h2>
        </div>
        <div className="flex gap-3">
          {[-1, 1].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => move(d)}
              aria-label={d < 0 ? "Previous stages" : "Next stages"}
              className="grid h-12 w-12 place-items-center border border-ink/25 text-xl transition-colors hover:bg-night hover:text-ivory"
            >
              {d < 0 ? "←" : "→"}
            </button>
          ))}
        </div>
      </div>

      <ol
        ref={rail}
        tabIndex={0}
        aria-label={`${title}, scroll sideways`}
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {steps.map((s) => (
          <li key={s.title} className="w-[62vw] shrink-0 snap-start sm:w-[36vw] lg:w-[25vw] xl:w-[23vw]">
            <div className={`relative aspect-[7/8] overflow-hidden ${s.image ? "" : "u-frame--light"}`}>
              {s.image ? (
                <Image src={s.image} alt="" fill sizes="(min-width:1024px) 25vw, (min-width:640px) 36vw, 62vw" className="object-cover" />
              ) : null}
            </div>
            <p className="mt-4 flex items-baseline gap-3">
              <span className="u-serif text-[1.15rem] italic text-bronze">{s.n}</span>
              <span className="u-serif text-[1.45rem]">{s.title}</span>
            </p>
            <p className="mt-1 max-w-[34ch] text-[0.9rem] leading-relaxed text-ink/65">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
