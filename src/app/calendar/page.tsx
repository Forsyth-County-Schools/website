'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { calendarEvents } from '@/lib/data';
import { format, isSameDay, isSameMonth, addMonths, subMonths } from 'date-fns';

const eventCategories = [
  { value: 'all', label: 'All Events', color: '#FCD34D' },
  { value: 'district', label: 'District', color: '#3B82F6' },
  { value: 'school', label: 'School Events', color: '#10B981' },
  { value: 'athletics', label: 'Athletics', color: '#EF4444' },
  { value: 'arts', label: 'Fine Arts', color: '#8B5CF6' },
];

export default function CalendarPage() {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [activeCategory, setActiveCategory] = React.useState('all');

  const filteredEvents = React.useMemo(() => {
    let filtered = calendarEvents;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(event => event.category === activeCategory);
    }
    
    return filtered.sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  }, [activeCategory]);

  const selectedDateEvents = React.useMemo(() => {
    if (!selectedDate) return [];
    return filteredEvents.filter(event => 
      isSameDay(new Date(event.startDate), selectedDate)
    );
  }, [selectedDate, filteredEvents]);

  const upcomingEvents = React.useMemo(() => {
    const today = new Date();
    return filteredEvents.filter(event => 
      new Date(event.startDate) >= today
    ).slice(0, 5);
  }, [filteredEvents]);

  const eventDates = React.useMemo(() => {
    return filteredEvents.map(event => new Date(event.startDate));
  }, [filteredEvents]);

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
                Events & Dates
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                District <span className="gold-gradient-text">Calendar</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stay up to date with important dates, events, and activities 
                across Forsyth County Schools.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calendar Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              {eventCategories.map((category) => (
                <Button
                  key={category.value}
                  variant={activeCategory === category.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(category.value)}
                  className={
                    activeCategory === category.value
                      ? 'bg-[#FCD34D] text-black hover:bg-[#C99600]'
                      : 'border-[#FCD34D]/20 text-white hover:bg-[#FCD34D]/10 hover:border-[#FCD34D]'
                  }
                >
                  <span
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.label}
                </Button>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Calendar */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-1"
              >
                <Card className="bg-[#0A0A0A] border-[#FCD34D]/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-white">
                        {format(currentMonth, 'MMMM yyyy')}
                      </h2>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                          className="text-[#FCD34D] hover:bg-[#FCD34D]/10"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                          className="text-[#FCD34D] hover:bg-[#FCD34D]/10"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      month={currentMonth}
                      onMonthChange={setCurrentMonth}
                      modifiers={{
                        hasEvent: eventDates,
                      }}
                      modifiersClassNames={{
                        hasEvent: 'bg-[#FCD34D]/20 text-[#FCD34D] font-bold',
                      }}
                      className="rounded-md"
                    />
                  </CardContent>
                </Card>

                {/* Selected Date Events */}
                {selectedDate && (
                  <Card className="mt-6 bg-[#0A0A0A] border-[#FCD34D]/10">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-white mb-4">
                        {format(selectedDate, 'MMMM d, yyyy')}
                      </h3>
                      
                      {selectedDateEvents.length > 0 ? (
                        <div className="space-y-3">
                          {selectedDateEvents.map((event) => (
                            <div
                              key={event.id}
                              className="p-3 rounded-lg bg-[#050505] border border-[#FCD34D]/10"
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className="w-1 h-full rounded-full self-stretch"
                                  style={{ backgroundColor: event.color }}
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium text-white text-sm">
                                    {event.title}
                                  </h4>
                                  {!event.allDay && (
                                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {format(new Date(event.startDate), 'h:mm a')}
                                    </p>
                                  )}
                                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {event.location}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No events scheduled for this date.
                        </p>
                      )}
                    </CardContent>
                  </Card>
                )}
              </motion.div>

              {/* Events List */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Upcoming Events
                </h2>

                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="bg-[#0A0A0A] border-[#FCD34D]/10 hover:border-[#FCD34D]/30 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            {/* Date Box */}
                            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-[#FCD34D]/20 to-[#C99600]/10 border border-[#FCD34D]/20 flex flex-col items-center justify-center">
                              <span className="text-xs text-[#FCD34D] uppercase font-medium">
                                {format(new Date(event.startDate), 'MMM')}
                              </span>
                              <span className="text-2xl font-bold text-white">
                                {format(new Date(event.startDate), 'd')}
                              </span>
                            </div>

                            {/* Event Details */}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge
                                  style={{ backgroundColor: event.color }}
                                  className="text-white border-none text-xs capitalize"
                                >
                                  {event.category}
                                </Badge>
                                {event.allDay && (
                                  <Badge variant="outline" className="border-[#FCD34D]/30 text-[#FCD34D] text-xs">
                                    All Day
                                  </Badge>
                                )}
                              </div>

                              <h3 className="text-lg font-bold text-white mb-2">
                                {event.title}
                              </h3>

                              <p className="text-sm text-muted-foreground mb-3">
                                {event.description}
                              </p>

                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                {!event.allDay && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4 text-[#FCD34D]" />
                                    {format(new Date(event.startDate), 'h:mm a')} - 
                                    {format(new Date(event.endDate), 'h:mm a')}
                                  </div>
                                )}
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4 text-[#FCD34D]" />
                                  {event.location}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {upcomingEvents.length === 0 && (
                  <Card className="bg-[#0A0A0A] border-[#FCD34D]/10">
                    <CardContent className="p-12 text-center">
                      <CalendarIcon className="w-12 h-12 text-[#FCD34D]/50 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        No upcoming events in this category.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Important Dates */}
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
                Key <span className="gold-gradient-text">Dates</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Important dates for the 2025-2026 school year.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { date: 'August 4, 2025', title: 'First Day of School' },
                { date: 'November 25-29, 2025', title: 'Thanksgiving Break' },
                { date: 'December 22 - Jan 3', title: 'Winter Break' },
                { date: 'March 16-20, 2026', title: 'Spring Break' },
                { date: 'May 22, 2026', title: 'Last Day of School' },
                { date: 'May 23-27, 2026', title: 'Graduation Week' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-[#0A0A0A] border-[#FCD34D]/10 text-center">
                    <CardContent className="p-6">
                      <CalendarIcon className="w-8 h-8 text-[#FCD34D] mx-auto mb-3" />
                      <h3 className="font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-[#FCD34D]">{item.date}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
