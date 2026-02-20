'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Trophy,
  Calendar,
  MapPin,
  Users,
  Medal,
  Star,
  ArrowRight,
  Play,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sports } from '@/lib/data';

const athleticStats = [
  { icon: Trophy, value: '150+', label: 'State Championships' },
  { icon: Medal, value: '8', label: 'High School Programs' },
  { icon: Users, value: '10,000+', label: 'Student Athletes' },
  { icon: Star, value: '50+', label: 'Sports Offered' },
];

const upcomingGames = [
  { sport: 'Football', teams: 'South Forsyth vs Lambert', date: '2026-02-21', time: '7:30 PM', location: 'South Forsyth Stadium' },
  { sport: 'Basketball', teams: 'West Forsyth vs Denmark', date: '2026-02-22', time: '6:00 PM', location: 'West Forsyth Gym' },
  { sport: 'Soccer', teams: 'Lambert vs Forsyth Central', date: '2026-02-23', time: '5:30 PM', location: 'Lambert Athletic Complex' },
  { sport: 'Baseball', teams: 'North Forsyth vs East Forsyth', date: '2026-02-24', time: '4:00 PM', location: 'North Forsyth Field' },
];

const recentChampions = [
  { year: '2025', sport: 'Football', school: 'South Forsyth High School', level: 'Class 7A State Champions' },
  { year: '2025', sport: 'Girls Soccer', school: 'Lambert High School', level: 'Class 7A State Champions' },
  { year: '2025', sport: 'Swimming', school: 'West Forsyth High School', level: 'Class 7A State Champions' },
  { year: '2024', sport: 'Basketball', school: 'Denmark High School', level: 'Class 6A State Champions' },
];

export default function AthleticsPage() {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [activeSeason, setActiveSeason] = React.useState('all');

  const filteredSports = React.useMemo(() => {
    if (activeSeason === 'all') return sports;
    return sports.filter(sport => sport.season.toLowerCase() === activeSeason);
  }, [activeSeason]);

  return (
    <>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />

      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1428]/50 to-[#050505]" />
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[#FCD34D]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.2,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
          
          <div className="relative container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge className="mb-4 bg-[#FCD34D]/10 text-[#FCD34D] border-[#FCD34D]/20">
                Go Forsyth!
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                FCS <span className="gold-gradient-text">Athletics</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Home of champions. Our student-athletes excel on the field, court, and beyond, 
                with a tradition of excellence in GHSA competition.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black font-semibold hover:opacity-90"
              >
                <Play className="mr-2 w-4 h-4" />
                Watch Highlights
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-gradient-to-b from-[#050505] via-[#0A1428]/20 to-[#050505]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {athleticStats.map((stat, index) => (
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

        {/* Sports Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Our <span className="gold-gradient-text">Sports</span>
              </h2>
              
              {/* Season Tabs */}
              <Tabs value={activeSeason} onValueChange={setActiveSeason}>
                <TabsList className="bg-[#0A0A0A] border border-[#FCD34D]/10">
                  <TabsTrigger value="all" className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black">
                    All Sports
                  </TabsTrigger>
                  <TabsTrigger value="fall" className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black">
                    Fall
                  </TabsTrigger>
                  <TabsTrigger value="winter" className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black">
                    Winter
                  </TabsTrigger>
                  <TabsTrigger value="spring" className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black">
                    Spring
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredSports.map((sport, index) => (
                <motion.div
                  key={sport.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="h-full bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 flex items-center justify-center border border-[#FCD34D]/20 group-hover:border-[#FCD34D]/50 transition-colors">
                        <Trophy className="w-6 h-6 text-[#FCD34D]" />
                      </div>
                      <h3 className="font-bold text-white text-sm mb-1 group-hover:text-[#FCD34D] transition-colors">
                        {sport.name}
                      </h3>
                      <Badge variant="outline" className="text-xs border-[#FCD34D]/30 text-[#FCD34D] capitalize">
                        {sport.season}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Games */}
        <section className="py-16 bg-gradient-to-b from-[#050505] via-[#0A1428]/20 to-[#050505]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Upcoming <span className="gold-gradient-text">Games</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {upcomingGames.map((game, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <Badge className="bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black">
                          {game.sport}
                        </Badge>
                        <div className="text-right">
                          <p className="text-sm text-[#FCD34D] font-medium">{game.date}</p>
                          <p className="text-xs text-muted-foreground">{game.time}</p>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{game.teams}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-[#FCD34D]" />
                        {game.location}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button
                asChild
                variant="outline"
                className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10"
              >
                <Link href="/calendar">
                  View Full Schedule
                  <Calendar className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Hall of Champions */}
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
                Hall of <span className="gold-gradient-text">Champions</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Celebrating our recent state championship teams and their remarkable achievements.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {recentChampions.map((champion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-gradient-to-br from-[#0A1428] to-[#050505] border-[#FCD34D]/20 text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FCD34D] to-[#C99600] flex items-center justify-center">
                        <Trophy className="w-8 h-8 text-black" />
                      </div>
                      <Badge className="mb-3 bg-[#FCD34D]/10 text-[#FCD34D] border-[#FCD34D]/20">
                        {champion.year}
                      </Badge>
                      <h3 className="text-lg font-bold text-white mb-1">{champion.sport}</h3>
                      <p className="text-sm text-[#FCD34D] mb-2">{champion.school}</p>
                      <p className="text-xs text-muted-foreground">{champion.level}</p>
                    </CardContent>
                  </Card>
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
                  Become a Forsyth Athlete
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Learn about eligibility requirements, tryout schedules, and how to get 
                  involved in FCS athletics.
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
                    <a
                      href="https://www.ghsa.net"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GHSA Rules
                    </a>
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
