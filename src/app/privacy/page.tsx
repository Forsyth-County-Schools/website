import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Forsyth County Schools website.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#050505] py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert prose-gold max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: February 2024
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#FCD34D] mb-4">Introduction</h2>
            <p className="text-white/80 mb-4">
              Forsyth County Schools (&quot;FCS,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting 
              the privacy of our students, parents, staff, and website visitors. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you visit 
              our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#FCD34D] mb-4">Information We Collect</h2>
            <p className="text-white/80 mb-4">
              We may collect information about you in various ways, including:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Information you provide directly (name, email, phone number)</li>
              <li>Automatically collected data (IP address, browser type, pages visited)</li>
              <li>Cookies and tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#FCD34D] mb-4">Use of Information</h2>
            <p className="text-white/80 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Provide and maintain our services</li>
              <li>Respond to inquiries and provide support</li>
              <li>Send administrative information</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#FCD34D] mb-4">Student Privacy (FERPA)</h2>
            <p className="text-white/80 mb-4">
              Forsyth County Schools complies with the Family Educational Rights and Privacy Act (FERPA), 
              which protects the privacy of student education records. Parents and eligible students have 
              the right to access, review, and request amendments to education records.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#FCD34D] mb-4">Data Security</h2>
            <p className="text-white/80 mb-4">
              We implement appropriate technical and organizational security measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#FCD34D] mb-4">Contact Us</h2>
            <p className="text-white/80 mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact:
            </p>
            <div className="bg-[#0A0A0A] p-4 rounded-lg border border-[#FCD34D]/20">
              <p className="text-white font-semibold">Forsyth County Schools</p>
              <p className="text-white/80">1120 Dahlonega Highway</p>
              <p className="text-white/80">Cumming, GA 30040</p>
              <p className="text-white/80">Phone: (770) 887-2461</p>
              <p className="text-white/80">Email: info@forsyth.k12.ga.us</p>
            </div>
          </section>
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
