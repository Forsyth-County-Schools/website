'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, ExternalLink, Users } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { boardMembers } from '@/lib/data';

const upcomingMeetings = [
  { date: '2026-03-11', time: '6:00 PM', type: 'Regular Meeting' },
  { date: '2026-04-08', time: '6:00 PM', type: 'Regular Meeting' },
  { date: '2026-05-13', time: '6:00 PM', type: 'Regular Meeting' },
];

export default function BoardPage() {
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
                Governance
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Board of <span className="gold-gradient-text">Education</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                The Forsyth County Board of Education is the governing body responsible 
                for setting policies and overseeing the district&apos;s educational programs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Board Members */}
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
                Meet the <span className="gold-gradient-text">Board</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Five elected members representing districts across Forsyth County.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {boardMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      {/* Photo placeholder */}
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 flex items-center justify-center border-2 border-[#FCD34D]/20 group-hover:border-[#FCD34D]/50 transition-colors">
                        <Users className="w-12 h-12 text-[#FCD34D]" />
                      </div>

                      {/* Title Badge */}
                      {(member.title === 'Chairman' || member.title === 'Vice Chairman') && (
                        <Badge className="mb-3 bg-[#FCD34D] text-black">
                          {member.title}
                        </Badge>
                      )}

                      {/* Name */}
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#FCD34D] transition-colors">
                        {member.name}
                      </h3>

                      {/* District */}
                      <p className="text-sm text-[#FCD34D] mb-3">
                        {member.district}
                      </p>

                      {/* Bio */}
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-3">
                        {member.bio}
                      </p>

                      {/* Contact */}
                      <div className="flex justify-center gap-2">
                        <a
                          href={`mailto:${member.email}`}
                          className="p-2 rounded-full bg-[#FCD34D]/10 hover:bg-[#FCD34D]/20 text-[#FCD34D] transition-colors"
                          title="Email"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                        <a
                          href={`tel:${member.phone}`}
                          className="p-2 rounded-full bg-[#FCD34D]/10 hover:bg-[#FCD34D]/20 text-[#FCD34D] transition-colors"
                          title="Call"
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

        {/* Meeting Schedule */}
        <section className="py-16 bg-gradient-to-b from-[#050505] via-[#0A1428]/20 to-[#050505]">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Upcoming Meetings */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-[#FCD34D]" />
                  Upcoming Meetings
                </h2>

                <div className="space-y-4">
                  {upcomingMeetings.map((meeting, index) => (
                    <Card key={index} className="bg-[#0A0A0A] border-[#FCD34D]/10">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">{meeting.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(meeting.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                            {' at '}
                            {meeting.time}
                          </p>
                        </div>
                        <Badge variant="outline" className="border-[#FCD34D]/30 text-[#FCD34D]">
                          Upcoming
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                  All meetings are held at the Forsyth County Board of Education and Professional 
                  Development Center at 1120 Dahlonega Highway, Cumming, GA 30040.
                </p>
              </motion.div>

              {/* Meeting Resources */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Meeting Resources
                </h2>

                <div className="space-y-4">
                  <Card className="bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-colors">
                    <CardContent className="p-4">
                      <a
                        href="https://www.youtube.com/user/ForsythCountySchools"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between group"
                      >
                        <div>
                          <p className="font-medium text-white group-hover:text-[#FCD34D] transition-colors">
                            Watch Live Stream
                          </p>
                          <p className="text-sm text-muted-foreground">
                            View meetings live on YouTube
                          </p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-[#FCD34D]" />
                      </a>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-colors">
                    <CardContent className="p-4">
                      <a
                        href="https://www.forsyth.k12.ga.us/Page/1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between group"
                      >
                        <div>
                          <p className="font-medium text-white group-hover:text-[#FCD34D] transition-colors">
                            Meeting Agendas
                          </p>
                          <p className="text-sm text-muted-foreground">
                            View agendas and supporting documents
                          </p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-[#FCD34D]" />
                      </a>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-colors">
                    <CardContent className="p-4">
                      <a
                        href="https://www.forsyth.k12.ga.us/Page/1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between group"
                      >
                        <div>
                          <p className="font-medium text-white group-hover:text-[#FCD34D] transition-colors">
                            Meeting Minutes
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Access past meeting minutes and recordings
                          </p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-[#FCD34D]" />
                      </a>
                    </CardContent>
                  </Card>
                </div>

                <Button
                  asChild
                  className="w-full mt-6 bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black font-semibold hover:opacity-90"
                >
                  <a
                    href="https://www.forsyth.k12.ga.us/Page/1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Board Policies
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Board */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="bg-[#0A0A0A] border-[#FCD34D]/10">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Contact the Board
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  The Board welcomes input from community members. You may contact individual 
                  board members directly or address the full board at a public meeting.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 hover:border-[#FCD34D]"
                >
                  <a href="mailto:info@forsyth.k12.ga.us">
                    <Mail className="mr-2 w-4 h-4" />
                    Email the Board
                  </a>
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
