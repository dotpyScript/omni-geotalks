import { notFound } from 'next/navigation';
import { SPEAKERS } from '@/components/sections/speakerSection/data';
import { SpeakerProfilePage } from '@/components/sections/speakerSection/SpeakerProfilePage';
import type { Metadata } from 'next';

// ─── Static params — pre-render one page per speaker ──────────────────────────

export function generateStaticParams() {
  return SPEAKERS.map((s) => ({ id: String(s.id) }));
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const speaker = SPEAKERS.find((s) => s.id === Number(id));
  if (!speaker) return { title: 'Speaker Not Found' };

  return {
    title: `${speaker.name} — IEGS Speaker`,
    description: `${speaker.title} at ${speaker.org}. ${speaker.bio.slice(0, 140)}…`,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SpeakerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (!SPEAKERS.find((s) => s.id === numericId)) notFound();

  return <SpeakerProfilePage id={numericId} />;
}
