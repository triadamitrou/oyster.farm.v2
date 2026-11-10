"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/site";

/**
 * Clear over the dark opening of each page, with the light-lettered
 * logo; once the page moves it becomes an ivory bar with the dark one.
 * The state is written from a rAF loop straight to the DOM.
 */
export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    let last: boolean | null = null;
    const tick = () => {
      const s = window.scrollY > 60;
      if (s !== last) {
        last = s;
        setSolid(s);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const dark = solid && !open;

  return (
    <header ref={ref} data-solid={dark} className="site-header fixed inset-x-0 top-0 z-50">
      <div className="u-wrap flex h-20 items-center justify-between gap-8">
        <Link href="/" aria-label="Jurassic Seafarms, home" onClick={() => setOpen(false)} className="relative z-10 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dark ? "/img/logo-header.png" : "/img/logo-header-dark.png"}
            alt="Jurassic Seafarms"
            width={946}
            height={240}
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 xl:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={pathname?.startsWith(n.href.replace(/\/$/, "")) ? "page" : undefined}
              className="u-cap opacity-90 transition-opacity hover:opacity-100 aria-[current=page]:text-bronze"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/shop/" className={`u-btn hidden min-h-[2.75rem] px-6 sm:inline-flex ${dark ? "" : "u-btn--light"}`}>
            Shop
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-[7px] xl:hidden"
          >
            <span className={`block h-px w-7 bg-current transition-transform duration-500 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`block h-px w-7 bg-current transition-transform duration-500 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <div
        id="menu"
        inert={!open}
        aria-hidden={!open}
        className={`fixed inset-0 -z-10 bg-night text-ivory transition-opacity duration-700 xl:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <nav aria-label="Menu" className="u-wrap flex h-full flex-col justify-center gap-2 pt-20">
          {[{ label: "Home", href: "/" }, ...nav, { label: "Shop", href: "/shop/" }].map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="u-serif py-1 text-[clamp(2.2rem,8vw,3.6rem)]"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(0.8rem)",
                transition: `opacity 800ms var(--ease-out-expo) ${100 + i * 50}ms, transform 800ms var(--ease-out-expo) ${100 + i * 50}ms`,
              }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
