'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Award,
  BookOpen,
  Globe,
  CheckCircle,
  ArrowRight,
  School,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const apCourses = [
  'AP Calculus AB/BC',
  'AP Statistics',
  'AP Physics 1, 2, C',
  'AP Chemistry',
  'AP Biology',
  'AP Environmental Science',
  'AP Computer Science A',
  'AP Computer Science Principles',
  'AP English Language',
  'AP English Literature',
  'AP US History',
  'AP World History',
  'AP European History',
  'AP Government & Politics',
  'AP Psychology',
  'AP Spanish Language',
  'AP French Language',
  'AP Art History',
  'AP Studio Art',
  'AP Music Theory',
];

const ibBenefits = [
  'Internationally recognized diploma',
  'Critical thinking and research skills',
  'Community service requirements',
  'Extended essay experience',
  'Theory of Knowledge course',
  'College credit opportunities',
];

const participatingSchools = [
  { name: 'Forsyth Central High School', programs: ['AP', 'IB'] },
  { name: 'South Forsyth High School', programs: ['AP'] },
  { name: 'Lambert High School', programs: ['AP'] },
  { name: 'West Forsyth High School', programs: ['AP'] },
  { name: 'North Forsyth High School', programs: ['AP'] },
  { name: 'Denmark High School', programs: ['AP'] },
  { name: 'East Forsyth High School', programs: ['AP'] },
];

export default function APIPPageClient() {
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
                <Award className="w-3 h-3 mr-1" />
                Advanced Programs
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                AP & <span className="gold-gradient-text">IB Programs</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Challenge yourself with college-level coursework through our Advanced Placement 
                and International Baccalaureate programs, preparing you for success in higher education.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Programs Tabs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="ap" className="w-full">
              <TabsList className="bg-[#0A0A0A] border border-[#FCD34D]/10 w-full justify-center mb-8">
                <TabsTrigger
                  value="ap"
                  className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black px-8"
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Advanced Placement (AP)
                </TabsTrigger>
                <TabsTrigger
                  value="ib"
                  className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black px-8"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  International Baccalaureate (IB)
                </TabsTrigger>
              </TabsList>

              {/* AP Tab */}
              <TabsContent value="ap">
                <div className="grid lg:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card className="bg-[#0A0A0A] border-[#FCD34D]/10 h-full">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-[#FCD34D]" />
                          About AP Programs
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                          Advanced Placement (AP) courses are college-level classes offered in high school. 
                          Students who score well on AP exams can earn college credit, saving time and money 
                          in higher education.
                        </p>
                        <div className="space-y-3">
                          <h4 className="text-white font-semibold">Benefits:</h4>
                          <ul className="space-y-2">
                            {['Earn college credit while in high school', 'Stand out in college admissions', 'Develop college-level study skills', 'Explore subjects in depth'].map((benefit) => (
                              <li key={benefit} className="flex items-center gap-2 text-muted-foreground">
                                <CheckCircle className="w-4 h-4 text-[#FCD34D] shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-4">
                          {/* District-wide AP pass rate - source: FCS Annual Report */}
                          <p className="text-[#FCD34D] font-semibold text-2xl">78%</p>
                          <p className="text-sm text-muted-foreground">AP Exam Pass Rate (Score 3+)</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <Card className="bg-[#0A0A0A] border-[#FCD34D]/10 h-full">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Award className="w-5 h-5 text-[#FCD34D]" />
                          AP Courses Offered
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {apCourses.map((course) => (
                            <Badge
                              key={course}
                              variant="outline"
                              className="border-[#FCD34D]/30 text-white bg-[#FCD34D]/5"
                            >
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </TabsContent>

              {/* IB Tab */}
              <TabsContent value="ib">
                <div className="grid lg:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card className="bg-[#0A0A0A] border-[#FCD34D]/10 h-full">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Globe className="w-5 h-5 text-[#FCD34D]" />
                          About the IB Programme
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                          The International Baccalaureate (IB) Diploma Programme is a rigorous, 
                          internationally recognized curriculum that develops students intellectually, 
                          personally, emotionally, and socially.
                        </p>
                        <div className="space-y-3">
                          <h4 className="text-white font-semibold">IB Diploma Requirements:</h4>
                          <ul className="space-y-2">
                            {ibBenefits.map((benefit) => (
                              <li key={benefit} className="flex items-center gap-2 text-muted-foreground">
                                <CheckCircle className="w-4 h-4 text-[#FCD34D] shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <Card className="bg-[#0A0A0A] border-[#FCD34D]/10 h-full">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <School className="w-5 h-5 text-[#FCD34D]" />
                          IB World School
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                          Forsyth Central High School is an authorized IB World School, offering 
                          the full IB Diploma Programme to qualified students.
                        </p>
                        <div className="p-4 rounded-lg bg-[#FCD34D]/5 border border-[#FCD34D]/20">
                          <p className="text-white font-semibold mb-2">Forsyth Central High School</p>
                          <p className="text-sm text-muted-foreground mb-4">
                            The only IB World School in Forsyth County
                          </p>
                          <Button
                            asChild
                            className="w-full bg-[#FCD34D] text-black hover:bg-[#C99600]"
                          >
                            <Link href="/schools/forsyth-central-high-school">
                              Learn More
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Participating Schools */}
        <section className="py-16 bg-gradient-to-b from-[#050505] via-[#0A1428]/20 to-[#050505]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Participating <span className="gold-gradient-text">Schools</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                All Forsyth County high schools offer AP courses, with Forsyth Central 
                additionally offering the full IB Diploma Programme.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {participatingSchools.map((school, index) => (
                <motion.div
                  key={school.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <School className="w-8 h-8 text-[#FCD34D]" />
                        <div className="flex gap-2">
                          {school.programs.map((program) => (
                            <Badge
                              key={program}
                              className={program === 'IB' 
                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' 
                                : 'bg-[#FCD34D]/10 text-[#FCD34D] border-[#FCD34D]/30'
                              }
                            >
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white">{school.name}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-[#0A1428] to-[#050505] border-[#FCD34D]/20">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Ready to Challenge Yourself?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Speak with your school counselor to learn more about AP and IB course 
                  enrollment requirements and opportunities.
                </p>
                <Button
                  asChild
                  className="bg-[#FCD34D] text-black hover:bg-[#C99600]"
                >
                  <Link href="/schools">
                    Find Your School
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
