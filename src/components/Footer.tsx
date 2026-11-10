import Link from "next/link";
import { lines, mailto, nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-night pb-10 pt-24 text-ivory">
      <div className="u-wrap grid gap-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logo-stacked-dark.png"
            alt="Jurassic Seafarms, finest quality oysters, Jurassic Coast, Dorset"
            width={624}
            height={700}
            className="h-auto w-[12rem]"
          />
        </div>
        <div>
          <p className="u-cap text-sand">The house</p>
          <ul className="mt-6 space-y-3 text-ivory/80">
            {lines.map((l) => (
              <li key={l.slug}>
                <Link href={`/${l.slug}/`} className="hover:text-ivory">
                  {l.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/shop/" className="hover:text-ivory">
                Shop
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="u-cap text-sand">Discover</p>
          <ul className="mt-6 space-y-3 text-ivory/80">
            {nav.slice(3).map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-ivory">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="u-cap text-sand">Write to us</p>
          <a href={mailto()} className="u-link mt-6 inline-block">
            {site.email}
          </a>
          <p className="mt-6 text-ivory/70">{site.farm}</p>
          <address className="mt-4 text-[0.9rem] not-italic leading-relaxed text-ivory/50">
            {site.registered.join(", ")}
          </address>
        </div>
      </div>
      <div className="u-wrap mt-24 flex flex-col justify-between gap-3 border-t border-ivory/10 pt-8 text-[0.78rem] text-ivory/45 sm:flex-row">
        <span>&copy; {site.name}</span>
        <span className="u-cap text-[0.62rem] text-ivory/45">{site.tagline}</span>
      </div>
    </footer>
  );
}
