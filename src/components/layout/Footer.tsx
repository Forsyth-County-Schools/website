'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  schools: [
    { label: 'Find a School', href: '/schools' },
    { label: 'Elementary Schools', href: '/schools?level=elementary' },
    { label: 'Middle Schools', href: '/schools?level=middle' },
    { label: 'High Schools', href: '/schools?level=high' },
    { label: 'School Locator', href: '/schools/locator' },
  ],
  academics: [
    { label: 'Programs Overview', href: '/academics' },
    { label: 'AP & IB Programs', href: '/academics/ap-ib' },
    { label: 'STEM Education', href: '/academics/stem' },
    { label: 'Fine Arts', href: '/arts' },
    { label: 'Career Pathways', href: '/academics/careers' },
  ],
  community: [
    { label: 'News & Announcements', href: '/news' },
    { label: 'Calendar', href: '/calendar' },
    { label: 'Board of Education', href: '/board' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact Us', href: '/contact' },
  ],
  resources: [
    { label: 'Parent Portal', href: 'https://campus.forsyth.k12.ga.us/campus/portal/forsyth.jsp', external: true },
    { label: 'Student Resources', href: '/resources' },
    { label: 'Food & Nutrition', href: '/resources/nutrition' },
    { label: 'Transportation', href: '/resources/transportation' },
    { label: 'Registration', href: '/resources/registration' },
  ],
};

const socialLinks = [
  { label: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/ForsythCountySchools' },
  { label: 'Twitter', icon: Twitter, href: 'https://twitter.com/ForssythSchools' },
  { label: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/user/ForsythCountySchools' },
  { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/forsythcountyschools' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/forsyth-county-schools' },
];

export function Footer() {
  return (
    <footer className="relative bg-[#030303] border-t border-[#FCD34D]/10">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428]/50 to-transparent pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group mb-6">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FCD34D] to-[#C99600] flex items-center justify-center gold-glow"
              >
                <GraduationCap className="w-8 h-8 text-black" />
              </motion.div>
              <div>
                <h2 className="text-xl font-bold text-white">Forsyth County</h2>
                <p className="text-sm text-[#FCD34D] font-medium tracking-wider uppercase">
                  Schools
                </p>
              </div>
            </Link>
            
            <p className="text-muted-foreground mb-6 max-w-sm">
              Safe. Connected. Thriving. Serving over 54,000 students across 42 schools 
              in Forsyth County, Georgia.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-[#FCD34D] mt-1 shrink-0" />
                <div className="text-muted-foreground">
                  <p>1120 Dahlonega Highway</p>
                  <p>Cumming, GA 30040</p>
                </div>
              </div>
              <a
                href="tel:7708872461"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-[#FCD34D] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#FCD34D]" />
                (770) 887-2461
              </a>
              <a
                href="mailto:info@forsyth.k12.ga.us"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-[#FCD34D] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#FCD34D]" />
                info@forsyth.k12.ga.us
              </a>
            </div>
          </div>

          {/* Schools */}
          <div>
            <h3 className="text-white font-semibold mb-4">Schools</h3>
            <ul className="space-y-2">
              {footerLinks.schools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[#FCD34D] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h3 className="text-white font-semibold mb-4">Academics</h3>
            <ul className="space-y-2">
              {footerLinks.academics.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[#FCD34D] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[#FCD34D] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  {'external' in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-[#FCD34D] transition-colors"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-[#FCD34D] transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 p-6 rounded-2xl premium-card">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Stay Connected
              </h3>
              <p className="text-sm text-muted-foreground">
                Subscribe to receive important district updates and news.
              </p>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="min-w-[250px] bg-black/50 border-[#FCD34D]/20 focus:border-[#FCD34D]"
              />
              <Button className="bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black font-semibold hover:opacity-90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8 bg-[#FCD34D]/10" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Forsyth County Schools. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-[#FCD34D]/10 flex items-center justify-center text-muted-foreground hover:text-[#FCD34D] hover:bg-[#FCD34D]/20 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-[#FCD34D] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/accessibility" className="hover:text-[#FCD34D] transition-colors">
              Accessibility
            </Link>
            <Link href="/sitemap" className="hover:text-[#FCD34D] transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
