'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Navigation,
  School,
  ArrowRight,
  Home,
  CheckCircle,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { schools } from '@/lib/data';
import type { School as SchoolType } from '@/types';

export default function SchoolLocatorPage() {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [address, setAddress] = React.useState('');
  const [isSearching, setIsSearching] = React.useState(false);
  const [results, setResults] = React.useState<{
    elementary: SchoolType | null;
    middle: SchoolType | null;
    high: SchoolType | null;
  } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;

    setIsSearching(true);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, return sample schools based on address
    // In production, this would connect to a real zoning API
    const elementarySchools = schools.filter(s => s.level === 'elementary');
    const middleSchools = schools.filter(s => s.level === 'middle');
    const highSchools = schools.filter(s => s.level === 'high');

    // Simple demo: return random schools or based on keywords
    const addressLower = address.toLowerCase();
    
    let elementary = elementarySchools[0];
    let middle = middleSchools[0];
    let high = highSchools[0];

    // Try to match based on city/area in address
    if (addressLower.includes('suwanee') || addressLower.includes('johns creek')) {
      elementary = elementarySchools.find(s => s.city.toLowerCase().includes('suwanee')) || elementarySchools[0];
      high = highSchools.find(s => s.slug.includes('lambert')) || highSchools[0];
    } else if (addressLower.includes('alpharetta')) {
      high = highSchools.find(s => s.slug.includes('south-forsyth')) || highSchools[0];
    }

    setResults({
      elementary,
      middle,
      high,
    });
    
    setIsSearching(false);
  };

  const SchoolResultCard = ({ school, level }: { school: SchoolType; level: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="bg-[#0A0A0A] border-[#FCD34D]/20 hover:border-[#FCD34D]/40 transition-all">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge className="bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black capitalize">
              {level} School
            </Badge>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-bold text-white mb-2">{school.name}</h3>
          <div className="flex items-start gap-2 text-muted-foreground text-sm mb-4">
            <MapPin className="w-4 h-4 mt-0.5 text-[#FCD34D] shrink-0" />
            <span>{school.address}, {school.city}, {school.state} {school.zip}</span>
          </div>
          <Button
            asChild
            className="w-full bg-[#FCD34D] text-black hover:bg-[#C99600]"
          >
            <Link href={`/schools/${school.slug}`}>
              View School Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />

      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1428]/50 to-[#050505]" />
          
          <div className="relative container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge className="mb-4 bg-[#FCD34D]/10 text-[#FCD34D] border-[#FCD34D]/20">
                <Navigation className="w-3 h-3 mr-1" />
                School Locator
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                Find Your <span className="gold-gradient-text">Zoned Schools</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Enter your home address to discover which Forsyth County Schools 
                serve your neighborhood.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="max-w-2xl mx-auto bg-[#0A0A0A] border-[#FCD34D]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Home className="w-5 h-5 text-[#FCD34D]" />
                    Enter Your Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-white">
                        Home Address
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="address"
                          type="text"
                          placeholder="123 Main Street, Cumming, GA 30040"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="pl-10 bg-[#050505] border-[#FCD34D]/20 focus:border-[#FCD34D] h-12"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Enter your full street address including city and zip code
                      </p>
                    </div>
                    <Button
                      type="submit"
                      disabled={isSearching || !address.trim()}
                      className="w-full bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black font-semibold h-12"
                    >
                      {isSearching ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search className="w-5 h-5 mr-2" />
                          Find My Schools
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Results Section */}
        {results && (
          <section className="py-12 bg-gradient-to-b from-[#050505] via-[#0A1428]/20 to-[#050505]">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center mb-8"
              >
                <h2 className="text-2xl font-bold text-white mb-2">
                  Your Zoned Schools
                </h2>
                <p className="text-muted-foreground">
                  Based on the address: <span className="text-[#FCD34D]">{address}</span>
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {results.elementary && (
                  <SchoolResultCard school={results.elementary} level="Elementary" />
                )}
                {results.middle && (
                  <SchoolResultCard school={results.middle} level="Middle" />
                )}
                {results.high && (
                  <SchoolResultCard school={results.high} level="High" />
                )}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-center mt-8"
              >
                <p className="text-sm text-muted-foreground mb-4">
                  Note: School zones are subject to change. Please contact the district 
                  for official zoning verification.
                </p>
                <Button
                  variant="outline"
                  asChild
                  className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10"
                >
                  <a 
                    href="https://www.forsyth.k12.ga.us/Page/33389" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    View Official Zone Maps
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </section>
        )}

        {/* Info Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="bg-[#0A0A0A] border-[#FCD34D]/10 text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-[#FCD34D]/10 flex items-center justify-center mx-auto mb-4">
                    <School className="w-6 h-6 text-[#FCD34D]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">42 Schools</h3>
                  <p className="text-sm text-muted-foreground">
                    Elementary, middle, and high schools across the county
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#0A0A0A] border-[#FCD34D]/10 text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-[#FCD34D]/10 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-[#FCD34D]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Zone-Based</h3>
                  <p className="text-sm text-muted-foreground">
                    Schools assigned based on your home address
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#0A0A0A] border-[#FCD34D]/10 text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-[#FCD34D]/10 flex items-center justify-center mx-auto mb-4">
                    <Navigation className="w-6 h-6 text-[#FCD34D]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Easy Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Find directions and contact info instantly
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
