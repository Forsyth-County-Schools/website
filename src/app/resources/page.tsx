'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FileText,
  Bus,
  Utensils,
  BookOpen,
  Shield,
  HelpCircle,
  ExternalLink,
  Download,
  CreditCard,
  Calendar,
  Bell,
  Smartphone,
  GraduationCap,
  Heart,
  Users,
  Laptop,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const quickLinks = [
  {
    title: 'Parent Portal',
    description: 'Access grades, attendance, and student information',
    icon: Laptop,
    href: 'https://campus.forsyth.k12.ga.us/campus/portal/forsyth.jsp',
    external: true,
    featured: true,
  },
  {
    title: 'School Meals',
    description: 'View menus, nutrition info, and meal accounts',
    icon: Utensils,
    href: 'https://www.forsyth.k12.ga.us/nutrition',
    external: true,
  },
  {
    title: 'Transportation',
    description: 'Bus routes, schedules, and transportation info',
    icon: Bus,
    href: 'https://www.forsyth.k12.ga.us/transportation',
    external: true,
  },
  {
    title: 'Student Registration',
    description: 'New student enrollment and registration',
    icon: FileText,
    href: 'https://www.forsyth.k12.ga.us/registration',
    external: true,
  },
];

const parentResources = [
  {
    title: 'Student Handbook',
    description: 'Policies, procedures, and expectations',
    icon: BookOpen,
    href: '/resources/handbook',
  },
  {
    title: 'School Calendar',
    description: '2025-2026 academic calendar',
    icon: Calendar,
    href: '/calendar',
  },
  {
    title: 'Alert System',
    description: 'Emergency notifications and updates',
    icon: Bell,
    href: '/resources/alerts',
  },
  {
    title: 'Mobile App',
    description: 'Download the FCS mobile app',
    icon: Smartphone,
    href: '/resources/app',
  },
];

const studentResources = [
  {
    title: 'Homework Help',
    description: 'Tutoring and academic support resources',
    icon: HelpCircle,
    href: '/resources/homework',
  },
  {
    title: 'College & Career',
    description: 'College prep and career planning',
    icon: GraduationCap,
    href: '/academics',
  },
  {
    title: 'Health & Wellness',
    description: 'Student health and counseling services',
    icon: Heart,
    href: '/resources/wellness',
  },
  {
    title: 'Clubs & Activities',
    description: 'Extracurricular opportunities',
    icon: Users,
    href: '/arts',
  },
];

const forms = [
  { title: 'Enrollment Forms', description: 'New student registration packet' },
  { title: 'Transportation Request', description: 'Bus transportation forms' },
  { title: 'Free/Reduced Meals', description: 'Meal assistance application' },
  { title: 'Health Forms', description: 'Immunization and medical records' },
  { title: 'Early Release Form', description: 'Student early dismissal authorization' },
  { title: 'Field Trip Permission', description: 'Field trip consent forms' },
];

export default function ResourcesPage() {
  const [searchOpen, setSearchOpen] = React.useState(false);

  return (
    <>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />

      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1428]/50 to-[#050505]" />
          
          <div className="relative container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge className="mb-4 bg-[#FCD34D]/10 text-[#FCD34D] border-[#FCD34D]/20">
                Parent & Student Resources
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Resource <span className="gold-gradient-text">Center</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Everything you need to support your student&apos;s success, from forms and 
                handbooks to portals and support services.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12 bg-gradient-to-b from-[#050505] via-[#0A1428]/20 to-[#050505]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Quick Access</h2>
              <p className="text-muted-foreground">Frequently used resources and portals</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="block h-full"
                  >
                    <Card className={`h-full bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-all duration-300 group ${link.featured ? 'ring-2 ring-[#FCD34D]/30' : ''}`}>
                      <CardContent className="p-6">
                        {link.featured && (
                          <Badge className="mb-3 bg-[#FCD34D] text-black">
                            Most Used
                          </Badge>
                        )}
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 flex items-center justify-center border border-[#FCD34D]/20 mb-4 group-hover:scale-110 transition-transform">
                          <link.icon className="w-6 h-6 text-[#FCD34D]" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FCD34D] transition-colors flex items-center gap-2">
                          {link.title}
                          {link.external && <ExternalLink className="w-4 h-4" />}
                        </h3>
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                      </CardContent>
                    </Card>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Parent & Student Resources */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Parent Resources */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">For Parents</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {parentResources.map((resource) => (
                    <Link key={resource.title} href={resource.href}>
                      <Card className="h-full bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-colors group cursor-pointer">
                        <CardContent className="p-4 flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#FCD34D]/10 flex items-center justify-center shrink-0">
                            <resource.icon className="w-5 h-5 text-[#FCD34D]" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white group-hover:text-[#FCD34D] transition-colors">
                              {resource.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">{resource.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Student Resources */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">For Students</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {studentResources.map((resource) => (
                    <Link key={resource.title} href={resource.href}>
                      <Card className="h-full bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-colors group cursor-pointer">
                        <CardContent className="p-4 flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#FCD34D]/10 flex items-center justify-center shrink-0">
                            <resource.icon className="w-5 h-5 text-[#FCD34D]" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white group-hover:text-[#FCD34D] transition-colors">
                              {resource.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">{resource.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Forms & Documents */}
        <section className="py-16 bg-gradient-to-b from-[#050505] via-[#0A1428]/20 to-[#050505]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Forms & Documents</h2>
              <p className="text-muted-foreground">Downloadable forms for parents and students</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {forms.map((form, index) => (
                <motion.div
                  key={form.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-colors group cursor-pointer">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#FCD34D]/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-[#FCD34D]" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white group-hover:text-[#FCD34D] transition-colors">
                            {form.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">{form.description}</p>
                        </div>
                      </div>
                      <Download className="w-5 h-5 text-[#FCD34D] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Portal */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-br from-[#0A1428] to-[#050505] border-[#FCD34D]/20">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Badge className="mb-4 bg-[#FCD34D]/10 text-[#FCD34D] border-[#FCD34D]/20">
                      Online Payments
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      School Fees & Meal Accounts
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Pay school fees, add funds to meal accounts, and manage student 
                      finances securely online through our payment portal.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        asChild
                        className="bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black font-semibold hover:opacity-90"
                      >
                        <a
                          href="https://www.myschoolbucks.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <CreditCard className="mr-2 w-4 h-4" />
                          Meal Payments
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10"
                      >
                        <a
                          href="https://www.forsyth.k12.ga.us"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          School Fees
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 flex items-center justify-center border border-[#FCD34D]/20">
                      <CreditCard className="w-20 h-20 text-[#FCD34D]" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 bg-gradient-to-b from-[#050505] via-[#0A1428]/30 to-[#050505]">
          <div className="container mx-auto px-4">
            <Card className="bg-[#0A0A0A] border-[#FCD34D]/10">
              <CardContent className="p-8 text-center">
                <Shield className="w-12 h-12 text-[#FCD34D] mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Need Help?</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Can&apos;t find what you&apos;re looking for? Contact our support team 
                  or visit your school&apos;s front office for assistance.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black font-semibold hover:opacity-90"
                  >
                    <Link href="/contact">
                      Contact Us
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10"
                  >
                    <Link href="/schools">
                      Find Your School
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
