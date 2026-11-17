"use client";

import Link from "next/link";
import { useState } from "react";
import { addToBasket, clearBasket, setQty, useBasket } from "@/lib/basket";
import { mailto, shop, type ShopItem } from "@/lib/site";

/** The link to the basket, with its count, shown on every shop page. */
export function BasketLink({ className = "" }: { className?: string }) {
  const count = useBasket().reduce((s, l) => s + l.qty, 0);
  return (
    <Link href="/shop/basket/" className={`u-cap inline-flex items-center gap-3 ${className}`}>
      Basket
      <span className="grid h-7 min-w-7 place-items-center bg-night px-2 text-[0.72rem] tracking-normal text-ivory tabular-nums">{count}</span>
    </Link>
  );
}

function Stepper({ value, onChange, label, min = 1, tall = false }: { value: number; onChange: (n: number) => void; label: string; min?: number; tall?: boolean }) {
  return (
    <div role="group" aria-label={label} className={`flex items-stretch border border-ink/25 ${tall ? "h-14" : "h-12"}`}>
      <button type="button" aria-label="One fewer" onClick={() => onChange(Math.max(min, value - 1))} className="w-11 text-lg hover:bg-ink/5">
        &minus;
      </button>
      <span aria-live="polite" className="grid w-10 place-items-center tabular-nums">
        {value}
      </span>
      <button type="button" aria-label="One more" onClick={() => onChange(value + 1)} className="w-11 text-lg hover:bg-ink/5">
        +
      </button>
    </div>
  );
}

/**
 * The buying panel on a product's page: choose a size where there is
 * one, choose a pack, choose how many, add to the basket.
 */
export function BuyBox({ item }: { item: ShopItem }) {
  const [grade, setGrade] = useState(item.grades ? item.grades[Math.min(1, item.grades.length - 1)] : undefined);
  const [pack, setPack] = useState(item.packs[Math.min(1, item.packs.length - 1)].label);
  const [qty, setQ] = useState(1);
  const [added, setAdded] = useState(false);
  const [open, setOpen] = useState(false);
  const chosen = item.packs.find((p) => p.label === pack)!;

  const tile = (on: boolean) =>
    `border px-4 py-3 text-left transition-colors ${on ? "border-night bg-night text-ivory" : "border-ink/25 hover:border-ink"}`;

  return (
    <div>
      {item.grades ? (
        <fieldset>
          <legend className="u-cap text-mute">Size</legend>
          <div className="mt-3 flex gap-2">
            {item.grades.map((g) => (
              <button key={g} type="button" aria-pressed={grade === g} onClick={() => setGrade(g)} className={`${tile(grade === g)} min-w-[3.5rem] text-center`}>
                {g}
              </button>
            ))}
          </div>
          {item.gradeNote ? <p className="mt-2 text-[0.88rem] text-mute">{item.gradeNote}</p> : null}
        </fieldset>
      ) : null}

      {/* Pack as a drop-down, how many beside it, then one wide button. */}
      <div className={`grid grid-cols-[1fr_auto] gap-3 ${item.grades ? "mt-7" : ""}`}>
        <div>
          <p className="u-cap text-mute" id={`pack-${item.key}`}>
            Pack{chosen.price !== null ? <span className="text-ink"> &ndash; £{chosen.price}</span> : null}
          </p>
          <div
            className="relative mt-3"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
          >
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-labelledby={`pack-${item.key}`}
              onClick={() => setOpen((v) => !v)}
              className="flex h-14 w-full items-center justify-between gap-3 border border-ink/25 px-4 text-left"
            >
              <span className="truncate">
                {chosen.label}
                {chosen.detail ? <span className="text-mute"> &ndash; {chosen.detail}</span> : null}
              </span>
              <svg viewBox="0 0 12 8" aria-hidden="true" className={`h-2 w-3 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
                <path d="M0 0h12L6 8z" fill="currentColor" />
              </svg>
            </button>
            {open ? (
              <ul role="listbox" aria-labelledby={`pack-${item.key}`} className="absolute inset-x-0 top-full z-20 -mt-px border border-ink/25 bg-white shadow-[0_18px_40px_-20px_rgba(31,42,69,0.5)]">
                {item.packs.map((p) => (
                  <li key={p.label} role="option" aria-selected={pack === p.label} className="border-b border-ink/15 last:border-0">
                    <button
                      type="button"
                      onClick={() => {
                        setPack(p.label);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition-colors ${pack === p.label ? "bg-night text-ivory" : "hover:bg-ink/5"}`}
                    >
                      <span>
                        {p.label}
                        {p.detail ? <span className="opacity-70"> &ndash; {p.detail}</span> : null}
                      </span>
                      {p.price !== null ? <span className="tabular-nums">£{p.price}</span> : null}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
        <div>
          <p className="u-cap text-mute">Quantity</p>
          <div className="mt-3">
            <Stepper value={qty} onChange={setQ} label="How many packs" tall />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          addToBasket({ key: item.key, name: item.name, pack, grade, qty });
          setAdded(true);
        }}
        className="u-btn mt-4 min-h-[3.75rem] w-full bg-night !text-ivory"
      >
        Add to basket{chosen.price !== null ? ` \u2013 £${chosen.price * qty}` : ""}
      </button>
      {chosen.price === null ? <p className="mt-3 text-[0.88rem] text-mute">Price on request, confirmed by the farm before collection.</p> : null}
      <p aria-live="polite" className="mt-2 min-h-[1.5rem] text-[0.92rem]">
        {added ? (
          <>
            Added.{" "}
            <Link href="/shop/basket/" className="u-link">
              View basket
            </Link>
          </>
        ) : null}
      </p>
    </div>
  );
}


/** The basket page: the lines, a collection day and time, and the order. */
export function BasketView() {
  const lines = useBasket();
  const [day, setDay] = useState("");
  const [slot, setSlot] = useState("Morning");
  const count = lines.reduce((s, l) => s + l.qty, 0);

  const body = [
    ...lines.map((l) => `${l.qty} x ${l.name}${l.grade ? ` ${l.grade}` : ""}, ${l.pack}`),
    "",
    `Collection: ${day || "day to agree"}, ${slot.toLowerCase()}`,
  ].join("\n");
  const order = `${mailto("Order for collection")}&body=${encodeURIComponent(body)}`;

  if (lines.length === 0) {
    return (
      <div>
        <p className="text-ink/70">The basket is empty.</p>
        <Link href="/shop/" className="u-btn mt-7">
          Back to the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
      <ul className="border-t border-ink/15">
        {lines.map((l, i) => (
          <li key={`${l.key}-${l.pack}-${l.grade}`} className="flex items-center justify-between gap-4 border-b border-ink/15 py-5">
            <div>
              <p className="u-serif text-[1.5rem]">{l.name}</p>
              <p className="text-[0.92rem] text-mute">
                {l.pack}
                {l.grade ? `, size ${l.grade}` : ""}
              </p>
            </div>
            <Stepper value={l.qty} min={0} onChange={(n) => setQty(i, n)} label={`${l.name}, ${l.pack}`} />
          </li>
        ))}
      </ul>

      <div>
        <label className="block">
          <span className="u-cap text-mute">Collection day</span>
          <input type="date" value={day} onChange={(e) => setDay(e.target.value)} className="mt-3 h-12 w-full border border-ink/25 bg-transparent px-4" />
        </label>
        <fieldset className="mt-6">
          <legend className="u-cap text-mute">Time</legend>
          <div className="mt-3 flex gap-2">
            {["Morning", "Afternoon"].map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={slot === s}
                onClick={() => setSlot(s)}
                className={`h-12 flex-1 border transition-colors ${slot === s ? "border-night bg-night text-ivory" : "border-ink/25 hover:border-ink"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>
        <a href={order} className="u-btn mt-8 w-full bg-night !text-ivory">
          Send order ({count})
        </a>
        <p className="mt-4 text-[0.88rem] text-mute">{shop.note} Sending opens an email to the farm; nothing is charged here.</p>
        <button type="button" onClick={clearBasket} className="u-link mt-5 text-[0.88rem] text-mute">
          Empty the basket
        </button>
      </div>
    </div>
  );
}
