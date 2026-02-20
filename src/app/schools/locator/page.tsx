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
  Locate,
  AlertCircle,
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

// Haversine formula to calculate distance between two coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Find nearest school of a specific level
function findNearestSchool(
  lat: number, 
  lon: number, 
  level: 'elementary' | 'middle' | 'high'
): { school: SchoolType; distance: number } | null {
  const levelSchools = schools.filter(s => s.level === level);
  
  if (levelSchools.length === 0) return null;
  
  let nearest = levelSchools[0];
  let minDistance = calculateDistance(lat, lon, nearest.latitude, nearest.longitude);
  
  for (const school of levelSchools) {
    const distance = calculateDistance(lat, lon, school.latitude, school.longitude);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = school;
    }
  }
  
  return { school: nearest, distance: minDistance };
}

// Known zip code coordinates for Forsyth County area
const zipCodeCoordinates: Record<string, { lat: number; lon: number }> = {
  '30004': { lat: 34.1251, lon: -84.2549 }, // Alpharetta
  '30005': { lat: 34.0854, lon: -84.2166 }, // Alpharetta
  '30009': { lat: 34.0718, lon: -84.2977 }, // Alpharetta
  '30022': { lat: 34.0254, lon: -84.2282 }, // Alpharetta
  '30023': { lat: 34.0668, lon: -84.2899 }, // Alpharetta
  '30040': { lat: 34.2073, lon: -84.1380 }, // Cumming
  '30041': { lat: 34.1401, lon: -84.1282 }, // Cumming
  '30028': { lat: 34.2851, lon: -84.1274 }, // Cumming (North)
  '30097': { lat: 34.0468, lon: -84.0712 }, // Duluth/Johns Creek
  '30024': { lat: 34.0537, lon: -84.0632 }, // Suwanee
  '30518': { lat: 34.1029, lon: -84.0237 }, // Buford
  '30519': { lat: 34.1018, lon: -83.9899 }, // Buford
};

export default function SchoolLocatorPage() {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [address, setAddress] = React.useState('');
  const [isSearching, setIsSearching] = React.useState(false);
  const [isGeolocating, setIsGeolocating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [userLocation, setUserLocation] = React.useState<{ lat: number; lon: number } | null>(null);
  const [results, setResults] = React.useState<{
    elementary: { school: SchoolType; distance: number } | null;
    middle: { school: SchoolType; distance: number } | null;
    high: { school: SchoolType; distance: number } | null;
  } | null>(null);

  // Extract zip code from address
  const extractZipCode = (addr: string): string | null => {
    const zipMatch = addr.match(/\b(\d{5})(?:-\d{4})?\b/);
    return zipMatch ? zipMatch[1] : null;
  };

  // Search by address/zip code
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;

    setIsSearching(true);
    setError(null);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Try to extract zip code
    const zipCode = extractZipCode(address);
    
    if (zipCode && zipCodeCoordinates[zipCode]) {
      const coords = zipCodeCoordinates[zipCode];
      setUserLocation(coords);
      findNearestSchools(coords.lat, coords.lon);
    } else {
      // Try to find a matching city/area
      const addressLower = address.toLowerCase();
      let coords: { lat: number; lon: number } | null = null;
      
      if (addressLower.includes('cumming')) {
        coords = zipCodeCoordinates['30040'];
      } else if (addressLower.includes('alpharetta')) {
        coords = zipCodeCoordinates['30004'];
      } else if (addressLower.includes('suwanee')) {
        coords = zipCodeCoordinates['30024'];
      } else if (addressLower.includes('johns creek')) {
        coords = zipCodeCoordinates['30097'];
      } else if (addressLower.includes('buford')) {
        coords = zipCodeCoordinates['30518'];
      }
      
      if (coords) {
        setUserLocation(coords);
        findNearestSchools(coords.lat, coords.lon);
      } else {
        setError('Could not locate address. Please try using your current location or enter a valid Forsyth County zip code (30040, 30041, 30028, etc.)');
        setResults(null);
      }
    }
    
    setIsSearching(false);
  };

  // Use browser geolocation
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsGeolocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lon: longitude });
        setAddress(`Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
        findNearestSchools(latitude, longitude);
        setIsGeolocating(false);
      },
      (err) => {
        setError('Unable to retrieve your location. Please enter your address manually.');
        setIsGeolocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Find nearest schools for all levels
  const findNearestSchools = (lat: number, lon: number) => {
    const elementary = findNearestSchool(lat, lon, 'elementary');
    const middle = findNearestSchool(lat, lon, 'middle');
    const high = findNearestSchool(lat, lon, 'high');

    setResults({ elementary, middle, high });
  };

  const SchoolResultCard = ({ 
    school, 
    level, 
    distance 
  }: { 
    school: SchoolType; 
    level: string; 
    distance: number;
  }) => (
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
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{distance.toFixed(1)} mi</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-bold text-white mb-2">{school.name}</h3>
          <p className="text-sm text-[#FCD34D] mb-2">{school.mascot}</p>
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
                    Find Your Nearest Schools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Use Current Location Button */}
                  <Button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    disabled={isGeolocating}
                    variant="outline"
                    className="w-full border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 h-12"
                  >
                    {isGeolocating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#FCD34D]/30 border-t-[#FCD34D] rounded-full animate-spin mr-2" />
                        Getting Location...
                      </>
                    ) : (
                      <>
                        <Locate className="w-5 h-5 mr-2" />
                        Use My Current Location
                      </>
                    )}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-[#FCD34D]/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-[#0A0A0A] px-2 text-muted-foreground">or enter address</span>
                    </div>
                  </div>

                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-white">
                        Home Address or Zip Code
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="address"
                          type="text"
                          placeholder="Enter zip code (30040) or address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="pl-10 bg-[#050505] border-[#FCD34D]/20 focus:border-[#FCD34D] h-12"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Supported zip codes: 30040, 30041, 30028, 30004, 30005, 30024, 30097, 30518
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
                          Find Nearest Schools
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/20"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-400">{error}</p>
                    </motion.div>
                  )}
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
                  Your Nearest Schools
                </h2>
                <p className="text-muted-foreground">
                  Based on your location: <span className="text-[#FCD34D]">{address}</span>
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {results.elementary && (
                  <SchoolResultCard 
                    school={results.elementary.school} 
                    level="Elementary" 
                    distance={results.elementary.distance}
                  />
                )}
                {results.middle && (
                  <SchoolResultCard 
                    school={results.middle.school} 
                    level="Middle" 
                    distance={results.middle.distance}
                  />
                )}
                {results.high && (
                  <SchoolResultCard 
                    school={results.high.school} 
                    level="High" 
                    distance={results.high.distance}
                  />
                )}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-center mt-8"
              >
                <p className="text-sm text-muted-foreground mb-4">
                  Note: Distances are approximate. School zones are subject to change. 
                  Please contact the district for official zoning verification.
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
