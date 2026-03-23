import { notFound } from 'next/navigation';
import { WEBINARS } from '@/components/sections/webinerDiscovery/data';
import WebinarProfilePage from '@/components/sections/webinarProfile/WebinarProfilePage';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return WEBINARS.map((w) => ({ id: String(w.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const webinar = WEBINARS.find((w) => w.id === Number(id));
  if (!webinar) return { title: 'Webinar Not Found' };

  return {
    title: `${webinar.title} | IEGS Webinars`,
    description: webinar.description,
    openGraph: {
      title: webinar.title,
      description: webinar.description,
      type: 'website',
    },
  };
}

export default async function WebinarProfileRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  const webinar = WEBINARS.find((w) => w.id === numericId);
  if (!webinar) notFound();

  return <WebinarProfilePage webinar={webinar} allWebinars={WEBINARS} />;
}
