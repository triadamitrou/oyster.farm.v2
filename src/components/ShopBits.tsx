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

function Stepper({ value, onChange, label, min = 1 }: { value: number; onChange: (n: number) => void; label: string; min?: number }) {
  return (
    <div role="group" aria-label={label} className="flex h-12 items-stretch border border-ink/25">
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

      <fieldset className={item.grades ? "mt-7" : ""}>
        <legend className="u-cap text-mute">Quantity</legend>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {item.packs.map((p) => (
            <button key={p.label} type="button" aria-pressed={pack === p.label} onClick={() => setPack(p.label)} className={tile(pack === p.label)}>
              <span className="block">{p.label}</span>
              {p.detail ? <span className="block text-[0.82rem] opacity-65">{p.detail}</span> : null}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-7 flex items-center justify-between border-y border-ink/15 py-4">
        <span className="u-cap text-mute">Price</span>
        {chosen.price === null ? (
          <span className="text-mute">On request</span>
        ) : (
          <span>
            <span className="u-serif text-[1.8rem]">£{chosen.price * qty}</span> <span className="text-[0.9rem] text-mute">collected</span>
          </span>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <Stepper value={qty} onChange={setQ} label="How many packs" />
        <button
          type="button"
          onClick={() => {
            addToBasket({ key: item.key, name: item.name, pack, grade, qty });
            setAdded(true);
          }}
          className="u-btn flex-1 bg-night !text-ivory"
        >
          Add to basket
        </button>
      </div>
      <p aria-live="polite" className="mt-3 min-h-[1.5rem] text-[0.92rem]">
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
