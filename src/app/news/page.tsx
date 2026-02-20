'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Calendar, ArrowRight, Tag } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { newsArticles } from '@/lib/data';
import { format } from 'date-fns';

const categories = ['All', 'District News', 'Academics', 'Athletics', 'Arts', 'Student Services'];

export default function NewsPage() {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredArticles = React.useMemo(() => {
    let filtered = newsArticles;
    
    if (activeCategory !== 'All') {
      filtered = filtered.filter(article => article.category === activeCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        article =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [searchQuery, activeCategory]);

  const featuredArticle = newsArticles.find(article => article.featured);

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
              className="text-center"
            >
              <Badge className="mb-4 bg-[#FCD34D]/10 text-[#FCD34D] border-[#FCD34D]/20">
                Latest Updates
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                News & <span className="gold-gradient-text">Announcements</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stay informed with the latest news, achievements, and stories from 
                across Forsyth County Schools.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Article */}
        {featuredArticle && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link href={`/news/${featuredArticle.slug}`} className="group block">
                  <Card className="overflow-hidden bg-gradient-to-r from-[#0A1428] to-[#050505] border-[#FCD34D]/20 hover:border-[#FCD34D]/40 transition-all">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-2 gap-0">
                        {/* Image */}
                        <div className="relative h-64 md:h-auto bg-gradient-to-br from-[#0A1428] to-[#050505]">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Badge className="bg-[#FCD34D] text-black animate-pulse">
                              Featured Story
                            </Badge>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                          <div className="flex items-center gap-3 mb-4">
                            <Badge className="bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black border-none">
                              {featuredArticle.category}
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {format(new Date(featuredArticle.publishedAt), 'MMMM d, yyyy')}
                            </span>
                          </div>

                          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#FCD34D] transition-colors">
                            {featuredArticle.title}
                          </h2>

                          <p className="text-muted-foreground mb-6 line-clamp-3">
                            {featuredArticle.excerpt}
                          </p>

                          <div className="flex items-center text-[#FCD34D] font-medium">
                            Read Full Story
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* Filters and Search */}
        <section className="sticky top-20 z-30 bg-[#050505]/95 backdrop-blur-xl border-b border-[#FCD34D]/10 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className={
                      activeCategory === category
                        ? 'bg-[#FCD34D] text-black hover:bg-[#C99600]'
                        : 'border-[#FCD34D]/20 text-white hover:bg-[#FCD34D]/10 hover:border-[#FCD34D]'
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-[300px] bg-[#0A0A0A] border-[#FCD34D]/20 focus:border-[#FCD34D]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/news/${article.slug}`} className="group block h-full">
                      <Card className="h-full overflow-hidden bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#FCD34D]/10 group-hover:-translate-y-1">
                        {/* Image */}
                        <div className="relative h-48 bg-gradient-to-br from-[#0A1428] to-[#050505] overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                          
                          {/* Category Badge */}
                          <Badge className="absolute top-4 left-4 bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black border-none">
                            {article.category}
                          </Badge>
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

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {article.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1 text-xs text-[#FCD34D]/70 bg-[#FCD34D]/10 px-2 py-1 rounded-full"
                              >
                                <Tag className="w-2 h-2" />
                                {tag}
                              </span>
                            ))}
                          </div>

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
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No articles found matching your search.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="mt-4 border-[#FCD34D]/30 text-[#FCD34D]"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
