'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, Phone, Star, ArrowRight, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { schools } from '@/lib/data';
import type { School } from '@/types';

interface SchoolCardProps {
  school: School;
  index: number;
}

function SchoolCard({ school, index }: SchoolCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const levelColors = {
    elementary: 'from-green-500 to-emerald-600',
    middle: 'from-blue-500 to-indigo-600',
    high: 'from-[#FCD34D] to-[#C99600]',
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group perspective-1000"
    >
      <Card className="relative h-full overflow-hidden bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#FCD34D]/10">
        {/* School Image */}
        <div className="relative h-48 bg-gradient-to-br from-[#0A1428] to-[#050505] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url('/api/placeholder/400/300')`,
              filter: 'brightness(0.7)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
          
          {/* Level Badge */}
          <Badge
            className={`absolute top-4 left-4 bg-gradient-to-r ${levelColors[school.level]} text-white border-none capitalize`}
          >
            {school.level}
          </Badge>

          {/* Rating */}
          <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
            <Star className="w-3 h-3 text-[#FCD34D] fill-[#FCD34D]" />
            <span className="text-xs text-white font-medium">{school.rating}</span>
          </div>
        </div>

        <CardContent className="p-6">
          {/* School Name */}
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FCD34D] transition-colors line-clamp-1">
            {school.name}
          </h3>

          {/* Mascot */}
          <p className="text-sm text-[#FCD34D] mb-3">
            Home of the {school.mascot}
          </p>

          {/* Principal */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 flex items-center justify-center border border-[#FCD34D]/20">
              <Users className="w-5 h-5 text-[#FCD34D]" />
            </div>
            <div>
              <p className="text-sm text-white font-medium">{school.principal.name}</p>
              <p className="text-xs text-muted-foreground">Principal</p>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-[#FCD34D]" />
              <span className="line-clamp-1">{school.city}, {school.state}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 text-[#FCD34D]" />
              <span>{school.phone}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="text-center">
              <div className="text-white font-semibold">{school.enrollment.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Students</div>
            </div>
            <div className="w-px h-8 bg-[#FCD34D]/20" />
            <div className="text-center">
              <div className="text-white font-semibold">{school.established}</div>
              <div className="text-xs text-muted-foreground">Est.</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              className="flex-1 bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black font-semibold hover:opacity-90"
            >
              <Link href={`/schools/${school.slug}`}>
                View School
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function FeaturedSchools() {
  // Get 8 featured schools (mix of levels)
  const featuredSchools = React.useMemo(() => {
    const high = schools.filter(s => s.level === 'high').slice(0, 3);
    const middle = schools.filter(s => s.level === 'middle').slice(0, 2);
    const elementary = schools.filter(s => s.level === 'elementary').slice(0, 3);
    return [...high, ...middle, ...elementary];
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#050505]" />
      
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Featured <span className="gold-gradient-text">Schools</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Explore some of our exceptional schools. From elementary through high school, 
              we offer world-class education for every student.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 hover:border-[#FCD34D]"
          >
            <Link href="/schools">
              View All 42 Schools
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredSchools.map((school, index) => (
            <SchoolCard key={school.id} school={school} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
