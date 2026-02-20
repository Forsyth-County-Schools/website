'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Users, School } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CallToAction() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1428] via-[#050505] to-[#0A1428]" />
      
      {/* Gold gradient accent */}
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
        animate={{
          background: [
            'radial-gradient(circle, rgba(252, 211, 77, 0.2) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(201, 150, 0, 0.2) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(252, 211, 77, 0.2) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Join the{' '}
              <span className="gold-gradient-text">Forsyth Family</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Whether you&apos;re a new family looking for exceptional schools, a talented educator 
              seeking opportunities, or a community member wanting to get involved, we welcome you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
          >
            {/* New Families */}
            <Link
              href="/schools"
              className="group p-6 rounded-2xl premium-card text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 flex items-center justify-center border border-[#FCD34D]/20 group-hover:border-[#FCD34D]/50 transition-colors"
              >
                <School className="w-8 h-8 text-[#FCD34D]" />
              </motion.div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FCD34D] transition-colors">
                New Families
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Find your zoned school and start the enrollment process
              </p>
              <span className="inline-flex items-center text-sm text-[#FCD34D] font-medium">
                Find Your School
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Careers */}
            <Link
              href="/careers"
              className="group p-6 rounded-2xl premium-card text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 flex items-center justify-center border border-[#FCD34D]/20 group-hover:border-[#FCD34D]/50 transition-colors"
              >
                <GraduationCap className="w-8 h-8 text-[#FCD34D]" />
              </motion.div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FCD34D] transition-colors">
                Join Our Team
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore teaching and staff opportunities across the district
              </p>
              <span className="inline-flex items-center text-sm text-[#FCD34D] font-medium">
                View Careers
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Community */}
            <Link
              href="/about"
              className="group p-6 rounded-2xl premium-card text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 flex items-center justify-center border border-[#FCD34D]/20 group-hover:border-[#FCD34D]/50 transition-colors"
              >
                <Users className="w-8 h-8 text-[#FCD34D]" />
              </motion.div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FCD34D] transition-colors">
                Get Involved
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Partner with us and make a difference in our community
              </p>
              <span className="inline-flex items-center text-sm text-[#FCD34D] font-medium">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button
              asChild
              size="lg"
              className="px-8 py-6 text-lg bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black font-bold hover:opacity-90 gold-glow-strong"
            >
              <a
                href="https://campus.forsyth.k12.ga.us/campus/portal/forsyth.jsp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Access Parent Portal
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
