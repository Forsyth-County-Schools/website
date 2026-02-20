'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Users, Heart, Target, Eye } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { leadershipTeam, boardMembers, districtStats, districtFacts } from '@/lib/data';

const timelineEvents = [
  { year: '1832', title: 'Forsyth County Established', description: 'Forsyth County was established in Georgia.' },
  { year: '1872', title: 'First Public Schools', description: 'First organized public school system established in the county.' },
  { year: '1956', title: 'Forsyth Central Opens', description: 'Forsyth Central High School opens as the flagship high school.' },
  { year: '1998', title: 'Rapid Growth Begins', description: 'South Forsyth High School opens to accommodate growing population.' },
  { year: '2009', title: 'Expansion Continues', description: 'Lambert High School and West Forsyth High School open.' },
  { year: '2018', title: 'Denmark High Opens', description: 'Denmark High School opens with state-of-the-art facilities.' },
  { year: '2022', title: 'East Forsyth Opens', description: 'East Forsyth High School opens, bringing total to 8 high schools.' },
  { year: '2024', title: 'New Leadership', description: 'Dr. Mitch Young begins tenure as Superintendent.' },
];

export default function AboutPage() {
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
                About FCS
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Our <span className="gold-gradient-text">Story</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                For over 150 years, Forsyth County Schools has been committed to educational 
                excellence, serving our community and preparing students for success in a 
                rapidly changing world.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-colors">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 flex items-center justify-center border border-[#FCD34D]/20 mb-6">
                      <Target className="w-7 h-7 text-[#FCD34D]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To ensure that all students are <strong className="text-[#FCD34D]">safe</strong>, 
                      {' '}<strong className="text-[#FCD34D]">connected</strong>, and 
                      {' '}<strong className="text-[#FCD34D]">thriving</strong> in our schools 
                      by focusing on student experience, teacher excellence, and community engagement.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-colors">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 flex items-center justify-center border border-[#FCD34D]/20 mb-6">
                      <Eye className="w-7 h-7 text-[#FCD34D]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Our Vision</h3>
                    <p className="text-muted-foreground">
                      To be a premier school district where every student is inspired to achieve 
                      their full potential, equipped with the knowledge, skills, and character 
                      to succeed in an ever-changing global society.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Values */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-colors">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 flex items-center justify-center border border-[#FCD34D]/20 mb-6">
                      <Heart className="w-7 h-7 text-[#FCD34D]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Our Values</h3>
                    <ul className="text-muted-foreground space-y-2">
                      <li>• Excellence in all we do</li>
                      <li>• Respect for all individuals</li>
                      <li>• Innovation and continuous improvement</li>
                      <li>• Integrity and ethical behavior</li>
                      <li>• Community partnerships</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-gradient-to-b from-[#050505] via-[#0A1428]/20 to-[#050505]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Our <span className="gold-gradient-text">History</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A journey of growth, innovation, and commitment to educational excellence.
              </p>
            </motion.div>

            <div className="relative max-w-3xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#FCD34D]/20" />

              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center mb-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-[#FCD34D] border-4 border-[#050505]" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <Card className="bg-[#0A0A0A] border-[#FCD34D]/10">
                      <CardContent className="p-6">
                        <Badge className="mb-2 bg-[#FCD34D] text-black">
                          {event.year}
                        </Badge>
                        <h3 className="text-lg font-bold text-white mb-2">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
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
                District <span className="gold-gradient-text">Leadership</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Meet the dedicated leaders who guide Forsyth County Schools.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadershipTeam.map((leader, index) => (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-colors text-center">
                    <CardContent className="p-6">
                      <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-[#FCD34D]/20">
                        <AvatarImage src={leader.image} alt={leader.name} />
                        <AvatarFallback className="bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 text-[#FCD34D] text-xl font-bold">
                          {leader.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-bold text-white mb-1">
                        {leader.name}
                      </h3>
                      <p className="text-sm text-[#FCD34D] mb-2">{leader.title}</p>
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-3">
                        {leader.bio}
                      </p>
                      <div className="flex justify-center gap-2">
                        <a
                          href={`mailto:${leader.email}`}
                          className="p-2 rounded-full bg-[#FCD34D]/10 hover:bg-[#FCD34D]/20 text-[#FCD34D] transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                        <a
                          href={`tel:${leader.phone}`}
                          className="p-2 rounded-full bg-[#FCD34D]/10 hover:bg-[#FCD34D]/20 text-[#FCD34D] transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gradient-to-b from-[#050505] via-[#0A1428]/30 to-[#050505]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                FCS by the <span className="gold-gradient-text">Numbers</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl premium-card"
              >
                <div className="text-4xl font-bold text-[#FCD34D] mb-2">
                  {districtStats.totalStudents.toLocaleString()}+
                </div>
                <div className="text-sm text-muted-foreground">Students</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl premium-card"
              >
                <div className="text-4xl font-bold text-[#FCD34D] mb-2">
                  {districtStats.totalSchools}
                </div>
                <div className="text-sm text-muted-foreground">Schools</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl premium-card"
              >
                <div className="text-4xl font-bold text-[#FCD34D] mb-2">
                  {districtStats.totalTeachers.toLocaleString()}+
                </div>
                <div className="text-sm text-muted-foreground">Teachers</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl premium-card"
              >
                <div className="text-4xl font-bold text-[#FCD34D] mb-2">
                  {districtFacts.countries}
                </div>
                <div className="text-sm text-muted-foreground">Countries Represented</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="bg-[#0A0A0A] border-[#FCD34D]/10">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  District Office
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#FCD34D]" />
                    1120 Dahlonega Highway, Cumming, GA 30040
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#FCD34D]" />
                    (770) 887-2461
                  </div>
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
