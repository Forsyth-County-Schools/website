'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Globe,
  Mail,
  Star,
  Users,
  Calendar,
  Trophy,
  BookOpen,
  GraduationCap,
  Building,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { School } from '@/types';

const levelColors = {
  elementary: 'from-green-500 to-emerald-600',
  middle: 'from-blue-500 to-indigo-600',
  high: 'from-[#FCD34D] to-[#C99600]',
};

interface SchoolDetailClientProps {
  school: School;
}

export default function SchoolDetailClient({ school }: SchoolDetailClientProps) {
  const [searchOpen, setSearchOpen] = React.useState(false);

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1428]/80 to-[#050505]" />
          
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #FCD34D 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }} />
          </div>

          <div className="relative container mx-auto px-4">
            {/* Back button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                href="/schools"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-[#FCD34D] transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Schools
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* School Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* School Logo */}
                {school.logo && (
                  <div className="mb-6">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-[#FCD34D]/20">
                      <Image
                        src={school.logo}
                        alt={`${school.name} logo`}
                        fill
                        className="object-contain p-2"
                        unoptimized
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <Badge
                    className={`bg-gradient-to-r ${levelColors[school.level]} text-white border-none capitalize`}
                  >
                    {school.level} School
                  </Badge>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                    <Star className="w-3 h-3 text-[#FCD34D] fill-[#FCD34D]" />
                    <span className="text-sm text-white font-medium">{school.rating}</span>
                  </div>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {school.name}
                </h1>

                <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                  {school.description}
                </p>

                {/* Quick Info */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-10 h-10 rounded-lg bg-[#FCD34D]/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#FCD34D]" />
                    </div>
                    <div>
                      <p className="text-sm text-white">{school.address}</p>
                      <p className="text-xs">{school.city}, {school.state} {school.zip}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-10 h-10 rounded-lg bg-[#FCD34D]/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#FCD34D]" />
                    </div>
                    <div>
                      <p className="text-sm text-white">{school.phone}</p>
                      <p className="text-xs">Main Office</p>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="bg-[#FCD34D] text-black hover:bg-[#C99600] font-semibold"
                  >
                    <a href={school.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10"
                  >
                    <a href={`mailto:${school.principal.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Principal
                    </a>
                  </Button>
                </div>
              </motion.div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-[#0A0A0A]/80 backdrop-blur-xl border-[#FCD34D]/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Building className="w-5 h-5 text-[#FCD34D]" />
                      Quick Facts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#FCD34D]">
                        {school.enrollment.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">Students</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#FCD34D]">
                        {school.established}
                      </div>
                      <p className="text-sm text-muted-foreground">Established</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#FCD34D] flex items-center justify-center gap-1">
                        <Star className="w-5 h-5 fill-[#FCD34D]" />
                        {school.rating}
                      </div>
                      <p className="text-sm text-muted-foreground">Rating</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#FCD34D]">
                        {school.mascot}
                      </div>
                      <p className="text-sm text-muted-foreground">Mascot</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-[#0A0A0A] border border-[#FCD34D]/10 w-full justify-start overflow-x-auto">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="principal"
                  className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black"
                >
                  Principal
                </TabsTrigger>
                <TabsTrigger
                  value="programs"
                  className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black"
                >
                  Programs
                </TabsTrigger>
                <TabsTrigger
                  value="contact"
                  className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black"
                >
                  Contact
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="bg-[#0A0A0A] border-[#FCD34D]/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-[#FCD34D]" />
                        About {school.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6">{school.description}</p>
                      <Separator className="bg-[#FCD34D]/10 my-6" />
                      <div className="space-y-4">
                        <h4 className="text-white font-semibold">School Colors</h4>
                        <div className="flex gap-2">
                          {school.colors.map((color, idx) => (
                            <div
                              key={idx}
                              className="w-8 h-8 rounded-full border-2 border-white/20"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#0A0A0A] border-[#FCD34D]/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-[#FCD34D]" />
                        Features & Programs
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {school.features.map((feature) => (
                          <Badge
                            key={feature}
                            variant="outline"
                            className="border-[#FCD34D]/30 text-[#FCD34D] bg-[#FCD34D]/5"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Principal Tab */}
              <TabsContent value="principal" className="mt-8">
                <Card className="bg-[#0A0A0A] border-[#FCD34D]/10 max-w-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <Avatar className="w-24 h-24 border-2 border-[#FCD34D]/20">
                        <AvatarImage src={school.principal.image} alt={school.principal.name} />
                        <AvatarFallback className="bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 text-[#FCD34D] text-2xl font-bold">
                          {getInitials(school.principal.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {school.principal.name}
                        </h3>
                        <p className="text-[#FCD34D] font-medium mb-4">{school.principal.title}</p>
                        <div className="space-y-2">
                          <a
                            href={`mailto:${school.principal.email}`}
                            className="flex items-center gap-2 text-muted-foreground hover:text-[#FCD34D] transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            {school.principal.email}
                          </a>
                          <a
                            href={`tel:${school.principal.phone}`}
                            className="flex items-center gap-2 text-muted-foreground hover:text-[#FCD34D] transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            {school.principal.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Programs Tab */}
              <TabsContent value="programs" className="mt-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {school.features.map((feature, idx) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Card className="bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-colors">
                        <CardContent className="p-6 text-center">
                          <div className="w-12 h-12 rounded-full bg-[#FCD34D]/10 flex items-center justify-center mx-auto mb-4">
                            <Trophy className="w-6 h-6 text-[#FCD34D]" />
                          </div>
                          <h4 className="text-white font-semibold">{feature}</h4>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent value="contact" className="mt-8">
                <Card className="bg-[#0A0A0A] border-[#FCD34D]/10 max-w-2xl">
                  <CardHeader>
                    <CardTitle className="text-white">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#FCD34D]/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-[#FCD34D]" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Address</h4>
                        <p className="text-muted-foreground">
                          {school.address}<br />
                          {school.city}, {school.state} {school.zip}
                        </p>
                      </div>
                    </div>
                    <Separator className="bg-[#FCD34D]/10" />
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#FCD34D]/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-[#FCD34D]" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Phone</h4>
                        <a
                          href={`tel:${school.phone}`}
                          className="text-muted-foreground hover:text-[#FCD34D] transition-colors"
                        >
                          {school.phone}
                        </a>
                      </div>
                    </div>
                    <Separator className="bg-[#FCD34D]/10" />
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#FCD34D]/10 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-[#FCD34D]" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Website</h4>
                        <a
                          href={school.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-[#FCD34D] transition-colors"
                        >
                          {school.website}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
