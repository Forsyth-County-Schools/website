'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const departments = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'enrollment', label: 'Enrollment & Registration' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'nutrition', label: 'Food & Nutrition' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'communications', label: 'Communications' },
  { value: 'technology', label: 'Technology' },
  { value: 'special-ed', label: 'Special Education' },
];

export default function ContactPage() {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Message sent!', {
      description: 'Thank you for contacting us. We will respond within 2 business days.',
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

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
                Get in Touch
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Contact <span className="gold-gradient-text">Us</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Have questions? We&apos;re here to help. Reach out to us and we&apos;ll 
                respond as soon as possible.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  District Office
                </h2>

                <div className="space-y-6 mb-8">
                  <Card className="bg-[#0A0A0A] border-[#FCD34D]/10">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 flex items-center justify-center border border-[#FCD34D]/20 shrink-0">
                        <MapPin className="w-6 h-6 text-[#FCD34D]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white mb-1">Address</h3>
                        <p className="text-muted-foreground">
                          1120 Dahlonega Highway<br />
                          Cumming, GA 30040
                        </p>
                        <a
                          href="https://maps.google.com/?q=1120+Dahlonega+Highway+Cumming+GA+30040"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#FCD34D] hover:underline mt-2 inline-block"
                        >
                          Get Directions →
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#0A0A0A] border-[#FCD34D]/10">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 flex items-center justify-center border border-[#FCD34D]/20 shrink-0">
                        <Phone className="w-6 h-6 text-[#FCD34D]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white mb-1">Phone</h3>
                        <a
                          href="tel:7708872461"
                          className="text-muted-foreground hover:text-[#FCD34D] transition-colors"
                        >
                          (770) 887-2461
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">
                          Fax: (770) 781-6632
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#0A0A0A] border-[#FCD34D]/10">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 flex items-center justify-center border border-[#FCD34D]/20 shrink-0">
                        <Clock className="w-6 h-6 text-[#FCD34D]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white mb-1">Office Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Friday<br />
                          8:00 AM - 5:00 PM
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#0A0A0A] border-[#FCD34D]/10">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 flex items-center justify-center border border-[#FCD34D]/20 shrink-0">
                        <Mail className="w-6 h-6 text-[#FCD34D]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white mb-1">Email</h3>
                        <a
                          href="mailto:info@forsyth.k12.ga.us"
                          className="text-muted-foreground hover:text-[#FCD34D] transition-colors"
                        >
                          info@forsyth.k12.ga.us
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Links */}
                <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className="justify-start border-[#FCD34D]/20 text-white hover:bg-[#FCD34D]/10 hover:border-[#FCD34D]"
                  >
                    <a href="https://direct.lc.chat/6207251/" target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="mr-2 w-4 h-4 text-[#FCD34D]" />
                      Live Chat
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="justify-start border-[#FCD34D]/20 text-white hover:bg-[#FCD34D]/10 hover:border-[#FCD34D]"
                  >
                    <a href="/schools">
                      Find a School
                    </a>
                  </Button>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="bg-[#0A0A0A] border-[#FCD34D]/10">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Send a Message
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            required
                            className="bg-black/50 border-[#FCD34D]/20 focus:border-[#FCD34D]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            required
                            className="bg-black/50 border-[#FCD34D]/20 focus:border-[#FCD34D]"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="bg-black/50 border-[#FCD34D]/20 focus:border-[#FCD34D]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          className="bg-black/50 border-[#FCD34D]/20 focus:border-[#FCD34D]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="department">Department *</Label>
                        <Select name="department" required>
                          <SelectTrigger className="bg-black/50 border-[#FCD34D]/20 focus:border-[#FCD34D]">
                            <SelectValue placeholder="Select a department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept.value} value={dept.value}>
                                {dept.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          required
                          className="bg-black/50 border-[#FCD34D]/20 focus:border-[#FCD34D]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          className="bg-black/50 border-[#FCD34D]/20 focus:border-[#FCD34D] resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black font-semibold hover:opacity-90"
                      >
                        {isSubmitting ? (
                          'Sending...'
                        ) : (
                          <>
                            <Send className="mr-2 w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gradient-to-b from-[#050505] via-[#0A1428]/20 to-[#050505]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-[#0A0A0A] border-[#FCD34D]/10 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-[#0A1428] to-[#050505] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-[#FCD34D]/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">Interactive Map Coming Soon</p>
                    <a
                      href="https://maps.google.com/?q=1120+Dahlonega+Highway+Cumming+GA+30040"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FCD34D] hover:underline mt-2 inline-block"
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
