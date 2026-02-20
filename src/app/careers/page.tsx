'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  DollarSign,
  GraduationCap,
  Heart,
  Users,
  CheckCircle,
  ExternalLink,
  Building,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { jobs } from '@/lib/data';

const benefits = [
  { icon: Heart, title: 'Health Insurance', description: 'Comprehensive medical, dental, and vision coverage' },
  { icon: DollarSign, title: 'Competitive Salary', description: 'Competitive pay with annual increases' },
  { icon: GraduationCap, title: 'Professional Development', description: 'Ongoing training and growth opportunities' },
  { icon: Clock, title: 'Work-Life Balance', description: 'Generous leave policies and holidays' },
  { icon: Users, title: 'Supportive Community', description: 'Join a team of dedicated professionals' },
  { icon: Building, title: 'State Retirement', description: 'TRS pension and 403(b) options' },
];

export default function CareersPage() {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('all');

  const categories = React.useMemo(() => {
    const cats = new Set(jobs.map(job => job.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const filteredJobs = React.useMemo(() => {
    let filtered = jobs;
    
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(job => job.category === categoryFilter);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        job =>
          job.title.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [searchQuery, categoryFilter]);

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
                Join Our Team
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Careers at <span className="gold-gradient-text">FCS</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Join one of Georgia&apos;s premier school districts. Make a difference in the lives 
                of over 54,000 students across 42 schools.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black font-semibold hover:opacity-90"
              >
                <a
                  href="https://forsythcountyschools.tedk12.com/hire/index.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply Now
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
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
                Why Work With <span className="gold-gradient-text">Us</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We offer competitive benefits and a supportive work environment where you can grow 
                and make a lasting impact.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 flex items-center justify-center border border-[#FCD34D]/20 mb-4">
                        <benefit.icon className="w-6 h-6 text-[#FCD34D]" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Listings */}
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
                Open <span className="gold-gradient-text">Positions</span>
              </h2>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search positions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-[#0A0A0A] border-[#FCD34D]/20 focus:border-[#FCD34D]"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={categoryFilter === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCategoryFilter(category)}
                      className={
                        categoryFilter === category
                          ? 'bg-[#FCD34D] text-black hover:bg-[#C99600]'
                          : 'border-[#FCD34D]/20 text-white hover:bg-[#FCD34D]/10 hover:border-[#FCD34D] capitalize'
                      }
                    >
                      {category === 'all' ? 'All Positions' : category}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Jobs Table */}
            <Card className="bg-[#0A0A0A] border-[#FCD34D]/10 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[#FCD34D]/10 hover:bg-transparent">
                    <TableHead className="text-[#FCD34D]">Position</TableHead>
                    <TableHead className="text-[#FCD34D]">Category</TableHead>
                    <TableHead className="text-[#FCD34D]">Location</TableHead>
                    <TableHead className="text-[#FCD34D]">Type</TableHead>
                    <TableHead className="text-[#FCD34D] text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job, index) => (
                      <TableRow
                        key={job.id}
                        className="border-b border-[#FCD34D]/10 hover:bg-[#FCD34D]/5"
                      >
                        <TableCell className="font-medium text-white">
                          <div>
                            {job.title}
                            {job.featured && (
                              <Badge className="ml-2 bg-[#FCD34D] text-black text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-[#FCD34D]/30 text-[#FCD34D]">
                            {job.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{job.type}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            asChild
                            size="sm"
                            className="bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black hover:opacity-90"
                          >
                            <a
                              href="https://forsythcountyschools.tedk12.com/hire/index.aspx"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Apply
                            </a>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                        No positions found. Try adjusting your search or filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>

            {/* View All Button */}
            <div className="text-center mt-8">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 hover:border-[#FCD34D]"
              >
                <a
                  href="https://forsythcountyschools.tedk12.com/hire/index.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View All Positions on HR Portal
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-b from-[#050505] via-[#0A1428]/30 to-[#050505]">
          <div className="container mx-auto px-4">
            <Card className="bg-[#0A0A0A] border-[#FCD34D]/20">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to Make a Difference?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Join our team of dedicated educators and staff. Help shape the future of 
                  over 54,000 students in Forsyth County.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black font-semibold hover:opacity-90"
                  >
                    <a
                      href="https://forsythcountyschools.tedk12.com/hire/index.aspx"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Start Your Application
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10"
                  >
                    <a href="/contact">
                      Contact HR
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
