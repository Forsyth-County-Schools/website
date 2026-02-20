import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { schools, getSchoolBySlug } from '@/lib/data';
import SchoolDetailClient from './SchoolDetailClient';

interface SchoolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return schools.map((school) => ({
    slug: school.slug,
  }));
}

export async function generateMetadata({ params }: SchoolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);

  if (!school) {
    return {
      title: 'School Not Found',
    };
  }

  return {
    title: school.name,
    description: school.description,
    openGraph: {
      title: school.name,
      description: school.description,
      type: 'website',
    },
  };
}

export default async function SchoolPage({ params }: SchoolPageProps) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);

  if (!school) {
    notFound();
  }

  return <SchoolDetailClient school={school} />;
}
