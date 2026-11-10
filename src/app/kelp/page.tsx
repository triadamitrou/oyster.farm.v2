import type { Metadata } from "next";
import LinePage from "@/components/LinePage";
import { lineBySlug } from "@/lib/site";

const l = lineBySlug("kelp")!;

export const metadata: Metadata = { title: l.name, description: l.line };

export default function Page() {
  return <LinePage l={l} />;
}
