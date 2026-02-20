'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { newsArticles } from '@/lib/data';
import { format } from 'date-fns';

export function LatestNews() {
  const featuredNews = newsArticles.slice(0, 3);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0A1428]/20 to-[#050505]" />

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
              Latest <span className="gold-gradient-text">News</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Stay up to date with the latest announcements, achievements, and stories 
              from across Forsyth County Schools.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 hover:border-[#FCD34D]"
          >
            <Link href="/news">
              View All News
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredNews.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/news/${article.slug}`} className="group block h-full">
                <Card className="h-full overflow-hidden bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#FCD34D]/10">
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-[#0A1428] to-[#050505] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url('/api/placeholder/400/250')`,
                        filter: 'brightness(0.7)',
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                    
                    {/* Category Badge */}
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black border-none">
                      {article.category}
                    </Badge>

                    {/* Featured indicator */}
                    {article.featured && (
                      <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#FCD34D] animate-pulse" />
                    )}
                  </div>

                  <CardContent className="p-6">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#FCD34D] transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>

                    {/* Read more */}
                    <div className="flex items-center text-sm text-[#FCD34D] font-medium">
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
