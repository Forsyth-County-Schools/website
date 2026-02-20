'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Music,
  Palette,
  Theater,
  Camera,
  Film,
  Mic,
  Users,
  Award,
  ArrowRight,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const artStats = [
  { icon: Users, value: '15,000+', label: 'Students in Arts Programs' },
  { icon: Award, value: '200+', label: 'Awards Annually' },
  { icon: Music, value: '100+', label: 'Performances Per Year' },
  { icon: Palette, value: '8', label: 'High School Programs' },
];

const artPrograms = [
  {
    title: 'Band & Orchestra',
    icon: Music,
    description: 'Award-winning instrumental music programs from elementary through high school.',
    highlights: ['Marching bands', 'Concert bands', 'Jazz ensembles', 'Full orchestras'],
    color: '#FCD34D',
  },
  {
    title: 'Chorus & Vocal',
    icon: Mic,
    description: 'Vocal music programs developing talented singers and performers.',
    highlights: ['Concert choirs', 'Show choirs', 'A cappella groups', 'All-State selections'],
    color: '#3B82F6',
  },
  {
    title: 'Visual Arts',
    icon: Palette,
    description: 'Comprehensive visual arts instruction from drawing to digital design.',
    highlights: ['Drawing & painting', 'Ceramics', 'Photography', 'Digital arts'],
    color: '#10B981',
  },
  {
    title: 'Theater & Drama',
    icon: Theater,
    description: 'Dramatic arts programs with full musical and play productions.',
    highlights: ['Musicals', 'One-act plays', 'Theater competitions', 'Technical theater'],
    color: '#EF4444',
  },
  {
    title: 'Dance',
    icon: Users,
    description: 'Dance programs offering various styles and performance opportunities.',
    highlights: ['Ballet', 'Contemporary', 'Jazz', 'Competition teams'],
    color: '#8B5CF6',
  },
  {
    title: 'Film & Media',
    icon: Film,
    description: 'Modern media production courses preparing students for digital careers.',
    highlights: ['Video production', 'Broadcasting', 'Podcasting', 'Animation'],
    color: '#F59E0B',
  },
];

const upcomingEvents = [
  { title: 'Spring Concert Series', date: 'April 15-17, 2026', location: 'Various Schools' },
  { title: 'District Art Show', date: 'April 25, 2026', location: 'Forsyth Conference Center' },
  { title: 'Spring Musical Season', date: 'March - May 2026', location: 'All High Schools' },
  { title: 'All-County Band Festival', date: 'May 3, 2026', location: 'South Forsyth HS' },
];

const clubs = [
  'Art Club', 'Band', 'Chorus', 'Dance Team', 'Drama Club', 'Film Club',
  'Photography Club', 'Creative Writing', 'Orchestra', 'Jazz Band',
  'A Cappella', 'Technical Theater', 'Literary Magazine', 'Yearbook',
];

export default function ArtsPage() {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState('all');

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
                Creative Excellence
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Fine Arts & <span className="gold-gradient-text">Student Life</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Forsyth County Schools offers award-winning fine arts programs that nurture 
                creativity, build character, and prepare students for success in any field.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-gradient-to-b from-[#050505] via-[#0A1428]/20 to-[#050505]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {artStats.map((stat, index) => (
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
                From band to visual arts to theater, we offer comprehensive programs 
                at every level.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artPrograms.map((program, index) => (
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
                        style={{ backgroundColor: `${program.color}20` }}
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

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {program.highlights.map((highlight) => (
                          <Badge
                            key={highlight}
                            variant="outline"
                            className="border-[#FCD34D]/20 text-[#FCD34D] text-xs"
                          >
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 bg-gradient-to-b from-[#050505] via-[#0A1428]/20 to-[#050505]">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Events */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-[#FCD34D]" />
                  Upcoming Events
                </h2>

                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <Card key={index} className="bg-[#0A0A0A] border-[#FCD34D]/10">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-white">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {event.date} • {event.location}
                          </p>
                        </div>
                        <Badge variant="outline" className="border-[#FCD34D]/30 text-[#FCD34D]">
                          Upcoming
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="mt-6 border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10"
                >
                  <Link href="/calendar">
                    View Full Calendar
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>

              {/* Clubs & Organizations */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6 text-[#FCD34D]" />
                  Clubs & Organizations
                </h2>

                <Card className="bg-[#0A0A0A] border-[#FCD34D]/10">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">
                      Beyond classroom instruction, students can join various clubs and 
                      organizations to further explore their interests.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {clubs.map((club) => (
                        <Badge
                          key={club}
                          className="bg-[#FCD34D]/10 text-[#FCD34D] border border-[#FCD34D]/20 hover:bg-[#FCD34D]/20 cursor-pointer transition-colors"
                        >
                          {club}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
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
                Student <span className="gold-gradient-text">Gallery</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Showcasing the incredible work of our talented student artists.
              </p>
            </motion.div>

            {/* Gallery Grid Placeholder */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="aspect-square rounded-xl bg-gradient-to-br from-[#0A1428] to-[#050505] border border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-colors flex items-center justify-center cursor-pointer group"
                >
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-[#FCD34D]/50 mx-auto mb-2 group-hover:text-[#FCD34D] transition-colors" />
                    <span className="text-xs text-muted-foreground group-hover:text-white transition-colors">
                      Coming Soon
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-b from-[#050505] via-[#0A1428]/30 to-[#050505]">
          <div className="container mx-auto px-4">
            <Card className="bg-[#0A0A0A] border-[#FCD34D]/20">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Get Involved in the Arts
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Connect with your school&apos;s fine arts department to learn about 
                  auditions, classes, and performance opportunities.
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
