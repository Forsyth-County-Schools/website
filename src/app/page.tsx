'use client';

import * as React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Hero } from '@/components/home/Hero';
import { FeaturedSchools } from '@/components/home/FeaturedSchools';
import { CallToAction } from '@/components/home/CallToAction';

export default function Home() {
  const [searchOpen, setSearchOpen] = React.useState(false);

  return (
    <>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
      
      <main className="min-h-screen">
        <Hero />
        <FeaturedSchools />
        <CallToAction />
      </main>
      
      <Footer />
    </>
  );
}
