import { Metadata } from 'next';
import Link from 'next/link';
import { schools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'Complete sitemap of Forsyth County Schools website.',
};

export default function SitemapPage() {
  const highSchools = schools.filter(s => s.level === 'high');
  const middleSchools = schools.filter(s => s.level === 'middle');
  const elementarySchools = schools.filter(s => s.level === 'elementary');

  return (
    <main className="min-h-screen bg-[#050505] py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Sitemap</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Main Pages */}
          <div>
            <h2 className="text-xl font-bold text-[#FCD34D] mb-4">Main Pages</h2>
            <ul className="space-y-2">
              <li><Link href="/" className="text-white hover:text-[#FCD34D] transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-white hover:text-[#FCD34D] transition-colors">About Us</Link></li>
              <li><Link href="/schools" className="text-white hover:text-[#FCD34D] transition-colors">Schools</Link></li>
              <li><Link href="/schools/locator" className="text-white hover:text-[#FCD34D] transition-colors">School Locator</Link></li>
              <li><Link href="/academics" className="text-white hover:text-[#FCD34D] transition-colors">Academics</Link></li>
              <li><Link href="/academics/ap-ib" className="text-white hover:text-[#FCD34D] transition-colors">AP & IB Programs</Link></li>
              <li><Link href="/athletics" className="text-white hover:text-[#FCD34D] transition-colors">Athletics</Link></li>
              <li><Link href="/calendar" className="text-white hover:text-[#FCD34D] transition-colors">Calendar</Link></li>
              <li><Link href="/board" className="text-white hover:text-[#FCD34D] transition-colors">Board of Education</Link></li>
              <li><Link href="/careers" className="text-white hover:text-[#FCD34D] transition-colors">Careers</Link></li>
              <li><Link href="/resources" className="text-white hover:text-[#FCD34D] transition-colors">Resources</Link></li>
              <li><Link href="/privacy" className="text-white hover:text-[#FCD34D] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* High Schools */}
          <div>
            <h2 className="text-xl font-bold text-[#FCD34D] mb-4">High Schools ({highSchools.length})</h2>
            <ul className="space-y-2">
              {highSchools.map(school => (
                <li key={school.id}>
                  <Link 
                    href={`/schools/${school.slug}`} 
                    className="text-white hover:text-[#FCD34D] transition-colors"
                  >
                    {school.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle Schools */}
          <div>
            <h2 className="text-xl font-bold text-[#FCD34D] mb-4">Middle Schools ({middleSchools.length})</h2>
            <ul className="space-y-2">
              {middleSchools.map(school => (
                <li key={school.id}>
                  <Link 
                    href={`/schools/${school.slug}`} 
                    className="text-white hover:text-[#FCD34D] transition-colors"
                  >
                    {school.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Elementary Schools */}
          <div className="md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-bold text-[#FCD34D] mb-4">Elementary Schools ({elementarySchools.length})</h2>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {elementarySchools.map(school => (
                <li key={school.id}>
                  <Link 
                    href={`/schools/${school.slug}`} 
                    className="text-white hover:text-[#FCD34D] transition-colors"
                  >
                    {school.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#FCD34D]/20">
          <Link href="/" className="text-[#FCD34D] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
