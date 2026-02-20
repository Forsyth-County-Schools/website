'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { districtStats } from '@/lib/data';

// Floating particles component
function FloatingParticles() {
  const particles = React.useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#FCD34D]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: 0.3,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#050505]">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1428]/80 via-[#050505]/90 to-[#050505]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(252, 211, 77, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(252, 211, 77, 0.5) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Radial glow effect */}
      <motion.div
        style={{ y }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
        animate={{
          background: [
            'radial-gradient(circle, rgba(252, 211, 77, 0.1) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(252, 211, 77, 0.15) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(252, 211, 77, 0.1) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-4 pt-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FCD34D]/30 bg-[#FCD34D]/5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#FCD34D] animate-pulse" />
            <span className="text-sm text-[#FCD34D] font-medium">
              Ranked Among Georgia&apos;s Top School Districts
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
          >
            Where{' '}
            <span className="gold-gradient-text gold-text-glow">Tomorrow</span>
            <br />
            Begins
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            <span className="text-white font-semibold">{districtStats.totalStudents.toLocaleString()}+</span> Scholars •{' '}
            <span className="text-white font-semibold">{districtStats.totalSchools}</span> World-Class Schools •{' '}
            <span className="text-[#FCD34D]">Forsyth County, GA</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              asChild
              size="lg"
              className="group relative px-8 py-6 text-lg bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black font-bold hover:opacity-90 gold-glow-strong transition-all"
            >
              <Link href="/schools">
                Explore Schools
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group px-8 py-6 text-lg border-[#FCD34D]/30 text-white hover:bg-[#FCD34D]/10 hover:border-[#FCD34D] transition-all"
            >
              <a href="https://www.youtube.com/watch?v=yySJhjy_Q-0" target="_blank" rel="noopener noreferrer">
                <Play className="mr-2 w-5 h-5" />
                Watch Our Story
              </a>
            </Button>
          </motion.div>

          {/* Explore Schools Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative inline-flex items-center justify-center"
          >
            <Link
              href="/schools/locator"
              className="group relative flex items-center gap-2 px-6 py-3 rounded-full border border-[#FCD34D]/30 bg-[#FCD34D]/5 hover:bg-[#FCD34D]/10 hover:border-[#FCD34D] transition-all"
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(252, 211, 77, 0.2)',
                    '0 0 0 20px rgba(252, 211, 77, 0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <MapPin className="w-5 h-5 text-[#FCD34D]" />
              <span className="text-white font-medium">Find Your Zoned School</span>
              <ArrowRight className="w-4 h-4 text-[#FCD34D] group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
