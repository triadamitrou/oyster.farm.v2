import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BasketLink, BuyBox } from "@/components/ShopBits";
import { shop } from "@/lib/site";

export function generateStaticParams() {
  return shop.consumer.map((i) => ({ key: i.key }));
}

export async function generateMetadata({ params }: { params: Promise<{ key: string }> }): Promise<Metadata> {
  const { key } = await params;
  const it = shop.consumer.find((x) => x.key === key);
  return it ? { title: `${it.name} | Shop`, description: it.about } : {};
}

/** One product: its photograph on one side, the buying panel on the other. */
export default async function Page({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const it = shop.consumer.find((x) => x.key === key);
  if (!it) notFound();

  return (
    <section className="bg-ivory pb-14 pt-28 sm:pb-28 sm:pt-40">
      <div className="u-wrap">
        <div className="flex items-center justify-between">
          <Link href="/shop/" className="u-cap text-mute hover:text-ink">
            &larr; Shop
          </Link>
          <BasketLink />
        </div>

        <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-14">
          <div className={`relative aspect-[16/10] overflow-hidden md:sticky md:top-28 md:aspect-[4/5] md:self-start ${it.image ? "" : "u-frame"}`}>
            {it.image ? <Image src={it.image} alt={it.alt} fill priority sizes="(min-width:768px) 48vw, 100vw" className="object-cover" /> : null}
          </div>

          <div>
            <p className="u-cap text-bronze">{it.kicker}</p>
            <h1 className="u-serif mt-3 text-[clamp(2.4rem,5vw,4.2rem)]">{it.name}</h1>
            <p className="mt-4 max-w-[46ch] text-ink/75">{it.about}</p>

            <div className="mt-8">
              <BuyBox item={it} />
            </div>

            <ul className="mt-6 space-y-2 border-t border-ink/15 pt-6 text-[0.92rem] text-ink/70">
              <li className="u-cap text-[0.62rem] text-bronze">Collection and keeping</li>
              <li>Collected from Portland Harbour, Dorset.</li>
              {it.care.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
