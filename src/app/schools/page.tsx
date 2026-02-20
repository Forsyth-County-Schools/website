'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Phone,
  Star,
  ArrowRight,
  Users,
  Filter,
  Grid3X3,
  List,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { schools } from '@/lib/data';
import type { School } from '@/types';

const levelColors = {
  elementary: 'from-green-500 to-emerald-600',
  middle: 'from-blue-500 to-indigo-600',
  high: 'from-[#FCD34D] to-[#C99600]',
};

function SchoolCard({ school, index }: { school: School; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/schools/${school.slug}`} className="group block h-full">
        <Card className="h-full overflow-hidden bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#FCD34D]/10 group-hover:-translate-y-1">
          {/* Header with gradient */}
          <div className="relative h-32 bg-gradient-to-br from-[#0A1428] to-[#050505] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
            
            {/* Level Badge */}
            <Badge
              className={`absolute top-3 left-3 bg-gradient-to-r ${levelColors[school.level]} text-white border-none capitalize text-xs`}
            >
              {school.level}
            </Badge>

            {/* Rating */}
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
              <Star className="w-3 h-3 text-[#FCD34D] fill-[#FCD34D]" />
              <span className="text-xs text-white font-medium">{school.rating}</span>
            </div>

            {/* Mascot indicator */}
            <div className="absolute bottom-3 left-3 text-white/60 text-xs">
              {school.mascot}
            </div>
          </div>

          <CardContent className="p-4">
            {/* School Name */}
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#FCD34D] transition-colors line-clamp-1">
              {school.name}
            </h3>

            {/* Principal */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 flex items-center justify-center border border-[#FCD34D]/20">
                <Users className="w-4 h-4 text-[#FCD34D]" />
              </div>
              <div>
                <p className="text-xs text-white font-medium line-clamp-1">{school.principal.name}</p>
                <p className="text-[10px] text-muted-foreground">Principal</p>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-1.5 mb-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3 text-[#FCD34D]" />
                <span className="line-clamp-1">{school.address}, {school.city}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="w-3 h-3 text-[#FCD34D]" />
                <span>{school.phone}</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center justify-between text-xs border-t border-[#FCD34D]/10 pt-3">
              <div>
                <span className="text-white font-medium">{school.enrollment.toLocaleString()}</span>
                <span className="text-muted-foreground ml-1">students</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#FCD34D] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export default function SchoolsPage() {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeLevel, setActiveLevel] = React.useState('all');

  const filteredSchools = React.useMemo(() => {
    let filtered = schools;
    
    if (activeLevel !== 'all') {
      filtered = filtered.filter(school => school.level === activeLevel);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        school =>
          school.name.toLowerCase().includes(query) ||
          school.city.toLowerCase().includes(query) ||
          school.principal.name.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [searchQuery, activeLevel]);

  const schoolCounts = {
    all: schools.length,
    high: schools.filter(s => s.level === 'high').length,
    middle: schools.filter(s => s.level === 'middle').length,
    elementary: schools.filter(s => s.level === 'elementary').length,
  };

  return (
    <>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />

      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1428]/50 to-[#050505]" />
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#FCD34D]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.2,
                }}
                animate={{
                  y: [-10, 10, -10],
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
              className="text-center"
            >
              <Badge className="mb-4 bg-[#FCD34D]/10 text-[#FCD34D] border-[#FCD34D]/20">
                42 Schools
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                Discover Your{' '}
                <span className="gold-gradient-text">Future Home</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our world-class schools across Forsyth County. From elementary 
                through high school, find the perfect fit for your family.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="sticky top-20 z-30 bg-[#050505]/95 backdrop-blur-xl border-b border-[#FCD34D]/10 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Tabs */}
              <Tabs value={activeLevel} onValueChange={setActiveLevel}>
                <TabsList className="bg-[#0A0A0A] border border-[#FCD34D]/10">
                  <TabsTrigger value="all" className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black">
                    All ({schoolCounts.all})
                  </TabsTrigger>
                  <TabsTrigger value="high" className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black">
                    High ({schoolCounts.high})
                  </TabsTrigger>
                  <TabsTrigger value="middle" className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black">
                    Middle ({schoolCounts.middle})
                  </TabsTrigger>
                  <TabsTrigger value="elementary" className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black">
                    Elementary ({schoolCounts.elementary})
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Search */}
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search schools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-[300px] bg-[#0A0A0A] border-[#FCD34D]/20 focus:border-[#FCD34D]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Schools Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredSchools.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredSchools.map((school, index) => (
                  <SchoolCard key={school.id} school={school} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No schools found matching your search.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveLevel('all');
                  }}
                  className="mt-4 border-[#FCD34D]/30 text-[#FCD34D]"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
