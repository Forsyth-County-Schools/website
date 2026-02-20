'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { GraduationCap, School, Users, Award, BookOpen, Trophy } from 'lucide-react';
import { districtStats, districtFacts } from '@/lib/data';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ value, suffix = '', duration = 2 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * value));
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  {
    icon: Users,
    value: districtStats.totalStudents,
    label: 'Students Enrolled',
    suffix: '+',
    description: 'Learners thriving in our schools',
  },
  {
    icon: School,
    value: districtStats.totalSchools,
    label: 'World-Class Schools',
    suffix: '',
    description: '23 elementary, 11 middle, 8 high schools',
  },
  {
    icon: GraduationCap,
    value: districtStats.graduationRate,
    label: 'Graduation Rate',
    suffix: '%',
    description: 'Exceeding state and national averages',
  },
  {
    icon: Award,
    value: districtStats.apPassRate,
    label: 'AP Pass Rate',
    suffix: '%',
    description: 'Students scoring 3+ on AP exams',
  },
  {
    icon: BookOpen,
    value: districtFacts.countries,
    label: 'Countries Represented',
    suffix: '',
    description: 'Diverse global community',
  },
  {
    icon: Trophy,
    value: districtFacts.enrollmentGrowth,
    label: 'Growth Rate',
    suffix: '%',
    description: 'Enrollment increase in past decade',
  },
];

export function Stats() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0A1428]/30 to-[#050505]" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Forsyth County <span className="gold-gradient-text">By The Numbers</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our commitment to excellence is reflected in every metric. See why families choose Forsyth County Schools.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-full p-6 rounded-2xl premium-card text-center">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 flex items-center justify-center border border-[#FCD34D]/20 group-hover:border-[#FCD34D]/50 transition-colors"
                >
                  <stat.icon className="w-7 h-7 text-[#FCD34D]" />
                </motion.div>

                {/* Value */}
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <div className="text-sm font-medium text-[#FCD34D] mb-1">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-xs text-muted-foreground hidden sm:block">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
