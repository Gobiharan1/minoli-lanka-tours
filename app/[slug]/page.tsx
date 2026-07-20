import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePage } from "../components/SitePage";
import { SiteShell } from "../components/SiteShell";
import { pages } from "../site-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) return {};
  return { title: page.title, description: page.intro };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();
  return <SiteShell><SitePage page={page} /></SiteShell>;
}

