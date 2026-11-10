"use client";

import Image from "next/image";
import { useState } from "react";
import { mailto, shop } from "@/lib/site";

/**
 * The counter: a photograph, a name, one line, a grade where there is
 * one, then a row per pack with a square Add button. A preview: the
 * order goes to the farm as an email, and nothing is charged.
 */
export default function ShopCounter() {
  const [grade, setGrade] = useState<Record<string, string>>(
    Object.fromEntries(shop.consumer.filter((i) => i.grades).map((i) => [i.key, i.grades![1]])),
  );
  const [qty, setQty] = useState<Record<string, number>>({});

  const set = (k: string, n: number) =>
    setQty((q) => {
      const next = { ...q };
      if (n <= 0) delete next[k];
      else next[k] = n;
      return next;
    });

  const lines = Object.entries(qty).map(([k, n]) => {
    const [item, pack] = k.split("|");
    const i = shop.consumer.find((x) => x.key === item)!;
    return `${n} x ${i.name}${grade[item] ? ` ${grade[item]}` : ""}, ${pack}`;
  });
  const count = Object.values(qty).reduce((s, n) => s + n, 0);
  const order = `mailto:hello@jurassicseafarms.co.uk?subject=${encodeURIComponent("Order for collection")}&body=${encodeURIComponent(lines.join("\n"))}`;

  return (
    <>
      <div className="grid gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
        {shop.consumer.map((it) => (
          <article key={it.key} className="flex flex-col">
            <div className={`relative aspect-square overflow-hidden ${it.image ? "" : "u-frame"}`}>
              {it.image ? <Image src={it.image} alt={it.alt} fill sizes="(min-width:1280px) 30vw, (min-width:768px) 45vw, 100vw" className="object-cover" /> : null}
            </div>
            <p className="u-cap mt-8 text-bronze">{it.kicker}</p>
            <h3 className="u-serif mt-3 text-[2.4rem]">{it.name}</h3>
            <p className="mt-2 text-ink/65">{it.line}</p>

            {it.grades ? (
              <div className="mt-6 flex items-center gap-4">
                <span className="u-cap text-mute">Grade</span>
                <div className="flex gap-2">
                  {it.grades.map((g) => (
                    <button
                      key={g}
                      type="button"
                      aria-pressed={grade[it.key] === g}
                      onClick={() => setGrade((s) => ({ ...s, [it.key]: g }))}
                      className={`h-10 min-w-[3rem] border px-3 text-[0.95rem] transition-colors ${grade[it.key] === g ? "border-night bg-night text-ivory" : "border-ink/25 hover:border-ink"}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <ul className="mt-6 border-t border-ink/15">
              {it.packs.map((p) => {
                const k = `${it.key}|${p.label}`;
                const n = qty[k] ?? 0;
                return (
                  <li key={p.label} className="flex items-center justify-between gap-6 border-b border-ink/15 py-5">
                    <div>
                      <p>{p.label}</p>
                      <p className="mt-0.5 text-mute">
                        {p.price === null ? (
                          <span className="text-[0.9rem]">Price on request</span>
                        ) : (
                          <>
                            <span className="u-serif text-[1.5rem] text-ink">£{p.price}</span> <span className="text-[0.9rem]">collected</span>
                          </>
                        )}
                      </p>
                    </div>
                    {n === 0 ? (
                      <button
                        type="button"
                        onClick={() => set(k, 1)}
                        aria-label={`Add ${p.label} of ${it.name}`}
                        className="u-btn min-h-[3rem] w-[7.5rem] px-0"
                      >
                        Add
                      </button>
                    ) : (
                      <div role="group" aria-label={`${p.label} of ${it.name}`} className="flex h-12 w-[7.5rem] items-stretch bg-night text-ivory">
                        <button type="button" aria-label="One fewer" onClick={() => set(k, n - 1)} className="flex-1 text-lg hover:bg-ivory/10">
                          &minus;
                        </button>
                        <span aria-live="polite" className="grid w-8 place-items-center tabular-nums">
                          {n}
                        </span>
                        <button type="button" aria-label="One more" onClick={() => set(k, n + 1)} className="flex-1 text-lg hover:bg-ivory/10">
                          +
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-ink/15 pt-8">
        <p className="max-w-[52ch] text-[0.92rem] text-mute">{shop.note}</p>
        <a
          href={count ? order : mailto("Order for collection")}
          aria-disabled={!count}
          className={`u-btn ${count ? "bg-night !text-ivory" : "pointer-events-none opacity-35"}`}
        >
          {count ? `Send order (${count})` : "Add to order"}
        </a>
      </div>
    </>
  );
}
