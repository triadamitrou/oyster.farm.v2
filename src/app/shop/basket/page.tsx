import type { Metadata } from "next";
import Link from "next/link";
import { BasketView } from "@/components/ShopBits";

export const metadata: Metadata = { title: "Basket" };

export default function Page() {
  return (
    <section className="min-h-[80svh] bg-ivory pb-14 pt-28 sm:pb-28 sm:pt-40">
      <div className="u-wrap">
        <Link href="/shop/" className="u-cap text-mute hover:text-ink">
          &larr; Shop
        </Link>
        <h1 className="u-serif mt-5 text-[clamp(2.6rem,6vw,5rem)]">
          Your <em className="italic text-bronze">basket</em>
        </h1>
        <div className="mt-8 sm:mt-12">
          <BasketView />
        </div>
      </div>
    </section>
  );
}
