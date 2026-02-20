'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SchoolNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#050505]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-4"
      >
        <div className="text-[120px] font-bold text-[#FCD34D]/10 leading-none mb-4">404</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          School Not Found
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The school you&apos;re looking for doesn&apos;t exist or may have been moved.
          Please check the URL or browse our schools directory.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            className="bg-[#FCD34D] text-black hover:bg-[#C99600]"
          >
            <Link href="/schools">
              <Search className="w-4 h-4 mr-2" />
              Browse Schools
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
