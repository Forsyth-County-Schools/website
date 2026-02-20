'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  BookOpen,
  Beaker,
  Code,
  Globe,
  Award,
  Users,
  Lightbulb,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { academicPrograms, districtStats } from '@/lib/data';
import Link from 'next/link';

const highlights = [
  { icon: Award, value: '95.8%', label: 'Graduation Rate' },
  { icon: GraduationCap, value: '78.3%', label: 'AP Pass Rate' },
  { icon: Users, value: '89.5%', label: 'College Ready' },
  { icon: Lightbulb, value: '100+', label: 'AP Courses' },
];

const programCategories = [
  {
    title: 'Advanced Placement (AP)',
    icon: Award,
    description: 'College-level courses with the opportunity to earn college credit.',
    details: [
      'Over 100 AP course sections across all high schools',
      'AP Capstone Diploma program available',
      '78.3% of students score 3 or higher',
      'Courses in STEM, humanities, arts, and languages',
    ],
    color: '#FCD34D',
  },
  {
    title: 'International Baccalaureate (IB)',
    icon: Globe,
    description: 'Rigorous international curriculum focused on critical thinking.',
    details: [
      'Full IB Diploma Programme at Forsyth Central High School',
      'Theory of Knowledge and Extended Essay requirements',
      'Community service (CAS) component',
      'Internationally recognized diploma',
    ],
    color: '#3B82F6',
  },
  {
    title: 'STEM Education',
    icon: Beaker,
    description: 'Science, Technology, Engineering, and Mathematics pathways.',
    details: [
      'Dedicated STEM labs in all schools',
      'Robotics and engineering programs',
      'Computer science pathways',
      'Partnership with Georgia Tech and UGA',
    ],
    color: '#10B981',
  },
  {
    title: 'Dual Enrollment',
    icon: BookOpen,
    description: 'Earn college credit while still in high school.',
    details: [
      'Partnerships with UNG, Lanier Tech, and more',
      'Over 1,000 students enrolled annually',
      'Tuition-free through Move On When Ready',
      'Transfer credits to Georgia universities',
    ],
    color: '#8B5CF6',
  },
  {
    title: 'Career & Technical Education',
    icon: Code,
    description: 'Hands-on career preparation in high-demand fields.',
    details: [
      '16 career pathways across healthcare, IT, engineering',
      'Industry certifications available',
      'Work-based learning opportunities',
      'State-of-the-art facilities and equipment',
    ],
    color: '#EF4444',
  },
  {
    title: 'Gifted Education',
    icon: Lightbulb,
    description: 'Advanced curriculum for high-ability learners.',
    details: [
      'K-12 gifted services available',
      'Challenge and enrichment programs',
      'Accelerated math and reading pathways',
      'Independent research opportunities',
    ],
    color: '#F59E0B',
  },
];

export default function AcademicsPage() {
  const [searchOpen, setSearchOpen] = React.useState(false);

  return (
    <>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />

      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1428]/50 to-[#050505]" />
          
          <div className="relative container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge className="mb-4 bg-[#FCD34D]/10 text-[#FCD34D] border-[#FCD34D]/20">
                Excellence in Education
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Academic <span className="gold-gradient-text">Programs</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Forsyth County Schools offers a comprehensive range of academic programs 
                designed to challenge, inspire, and prepare students for success in college, 
                career, and beyond.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-gradient-to-b from-[#050505] via-[#0A1428]/20 to-[#050505]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {highlights.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 flex items-center justify-center border border-[#FCD34D]/20">
                    <stat.icon className="w-7 h-7 text-[#FCD34D]" />
                  </div>
                  <div className="text-3xl font-bold text-[#FCD34D] mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Our <span className="gold-gradient-text">Programs</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover the wide range of academic opportunities available to 
                Forsyth County Schools students.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programCategories.map((program, index) => (
                <motion.div
                  key={program.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-all duration-300 group">
                    <CardContent className="p-6">
                      {/* Icon */}
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${program.color}20`, borderColor: `${program.color}40` }}
                      >
                        <program.icon className="w-7 h-7" style={{ color: program.color }} />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FCD34D] transition-colors">
                        {program.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-4">
                        {program.description}
                      </p>

                      {/* Details */}
                      <ul className="space-y-2">
                        {program.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ChevronRight className="w-4 h-4 text-[#FCD34D] shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gradient-to-b from-[#050505] via-[#0A1428]/20 to-[#050505]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
                Frequently Asked <span className="gold-gradient-text">Questions</span>
              </h2>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border border-[#FCD34D]/10 rounded-lg px-6 bg-[#0A0A0A]">
                  <AccordionTrigger className="text-white hover:text-[#FCD34D]">
                    How do I enroll my child in AP courses?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Students can enroll in AP courses through their school counselor during 
                    course selection. Prerequisites vary by course and are listed in the 
                    high school course catalog. We encourage all students who are willing 
                    to take on the challenge to consider AP courses.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border border-[#FCD34D]/10 rounded-lg px-6 bg-[#0A0A0A]">
                  <AccordionTrigger className="text-white hover:text-[#FCD34D]">
                    What is the Dual Enrollment program?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Dual Enrollment allows high school juniors and seniors to take college 
                    courses tuition-free through Georgia&apos;s Move On When Ready program. 
                    Students can attend classes at partner colleges or take courses online 
                    while earning both high school and college credit.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border border-[#FCD34D]/10 rounded-lg px-6 bg-[#0A0A0A]">
                  <AccordionTrigger className="text-white hover:text-[#FCD34D]">
                    How do I know if my child qualifies for gifted services?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Students may be referred for gifted evaluation by teachers, parents, 
                    or through automatic screening. Eligibility is determined through 
                    multiple criteria including cognitive ability, achievement, and 
                    creativity assessments. Contact your child&apos;s school counselor for 
                    more information.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border border-[#FCD34D]/10 rounded-lg px-6 bg-[#0A0A0A]">
                  <AccordionTrigger className="text-white hover:text-[#FCD34D]">
                    What STEM programs are available?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Every school has STEM labs and programming. High schools offer 
                    engineering, computer science, and biomedical pathways. We also have 
                    robotics teams, coding clubs, and partnerships with Georgia Tech and 
                    UGA for advanced learning opportunities.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-br from-[#0A1428] to-[#050505] border-[#FCD34D]/20">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to Explore?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Connect with your school counselor to learn more about academic programs 
                  and create a personalized education plan for your student.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black font-semibold hover:opacity-90"
                  >
                    <Link href="/schools">
                      Find Your School
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10"
                  >
                    <Link href="/contact">
                      Contact Us
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
