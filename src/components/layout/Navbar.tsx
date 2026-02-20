'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Search,
  Menu,
  X,
  GraduationCap,
  School,
  Calendar,
  Users,
  Trophy,
  Briefcase,
  ChevronDown,
  Command,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { navigationItems } from '@/lib/data';

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { title: string; icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-[#FCD34D]/10 hover:text-[#FCD34D] focus:bg-[#FCD34D]/10 focus:text-[#FCD34D]',
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {icon}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

interface NavbarProps {
  onSearchOpen: () => void;
}

export function Navbar({ onSearchOpen }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'glass-strong py-3 shadow-2xl shadow-black/20'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-12 h-12 rounded-xl overflow-hidden"
            >
              <Image
                src="/images/fcs-logo.webp"
                alt="Forsyth County Schools"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white leading-tight">
                Forsyth County
              </h1>
              <p className="text-xs text-[#FCD34D] font-medium tracking-wider uppercase">
                Schools
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              {/* Schools */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:text-[#FCD34D] hover:bg-[#FCD34D]/10 data-[state=open]:text-[#FCD34D] data-[state=open]:bg-[#FCD34D]/10">
                  Schools
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] bg-[#0A0A0A] border border-[#FCD34D]/20">
                    <ListItem href="/schools" title="Find a School" icon={<School className="w-4 h-4 text-[#FCD34D]" />}>
                      Browse all 42 schools by level
                    </ListItem>
                    <ListItem href="/schools?level=elementary" title="Elementary Schools" icon={<School className="w-4 h-4 text-[#FCD34D]" />}>
                      23 elementary schools serving K-5
                    </ListItem>
                    <ListItem href="/schools?level=middle" title="Middle Schools" icon={<School className="w-4 h-4 text-[#FCD34D]" />}>
                      11 middle schools serving 6-8
                    </ListItem>
                    <ListItem href="/schools?level=high" title="High Schools" icon={<School className="w-4 h-4 text-[#FCD34D]" />}>
                      8 high schools serving 9-12
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Academics */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:text-[#FCD34D] hover:bg-[#FCD34D]/10 data-[state=open]:text-[#FCD34D] data-[state=open]:bg-[#FCD34D]/10">
                  Academics
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] bg-[#0A0A0A] border border-[#FCD34D]/20">
                    <ListItem href="/academics" title="Programs Overview" icon={<GraduationCap className="w-4 h-4 text-[#FCD34D]" />}>
                      Explore our academic programs
                    </ListItem>
                    <ListItem href="/academics/ap-ib" title="AP & IB Programs" icon={<GraduationCap className="w-4 h-4 text-[#FCD34D]" />}>
                      Advanced placement opportunities
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Athletics */}
              <NavigationMenuItem>
                <Link href="/athletics" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent text-white hover:text-[#FCD34D] hover:bg-[#FCD34D]/10'
                  )}>
                    Athletics
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Calendar */}
              <NavigationMenuItem>
                <Link href="/calendar" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent text-white hover:text-[#FCD34D] hover:bg-[#FCD34D]/10'
                  )}>
                    Calendar
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* About */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:text-[#FCD34D] hover:bg-[#FCD34D]/10 data-[state=open]:text-[#FCD34D] data-[state=open]:bg-[#FCD34D]/10">
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] bg-[#0A0A0A] border border-[#FCD34D]/20">
                    <ListItem href="/about" title="Our District" icon={<Users className="w-4 h-4 text-[#FCD34D]" />}>
                      History, mission & vision
                    </ListItem>
                    <ListItem href="/board" title="Board of Education" icon={<Users className="w-4 h-4 text-[#FCD34D]" />}>
                      Meet the board members
                    </ListItem>
                    <ListItem href="/careers" title="Careers" icon={<Briefcase className="w-4 h-4 text-[#FCD34D]" />}>
                      Join our team
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onSearchOpen}
              className="text-white hover:text-[#FCD34D] hover:bg-[#FCD34D]/10"
            >
              <Search className="w-5 h-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Command Palette Hint */}
            <Button
              variant="outline"
              size="sm"
              onClick={onSearchOpen}
              className="hidden md:flex items-center gap-2 border-[#FCD34D]/30 text-muted-foreground hover:text-[#FCD34D] hover:border-[#FCD34D] hover:bg-[#FCD34D]/10"
            >
              <Command className="w-3 h-3" />
              <span className="text-xs">K</span>
            </Button>

            {/* Parent Portal */}
            <Button
              asChild
              className="hidden sm:flex bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black font-semibold hover:opacity-90 transition-opacity gold-glow"
            >
              <a href="https://campus.forsyth.k12.ga.us/campus/portal/forsyth.jsp" target="_blank" rel="noopener noreferrer">
                Parent Portal
              </a>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-white hover:text-[#FCD34D]">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] bg-[#050505] border-l border-[#FCD34D]/20">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/schools"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-[#FCD34D]/10 hover:text-[#FCD34D] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <School className="w-5 h-5" />
                    Schools
                  </Link>
                  <Link
                    href="/academics"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-[#FCD34D]/10 hover:text-[#FCD34D] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <GraduationCap className="w-5 h-5" />
                    Academics
                  </Link>
                  <Link
                    href="/athletics"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-[#FCD34D]/10 hover:text-[#FCD34D] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Trophy className="w-5 h-5" />
                    Athletics
                  </Link>
                  <Link
                    href="/calendar"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-[#FCD34D]/10 hover:text-[#FCD34D] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Calendar className="w-5 h-5" />
                    Calendar
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-[#FCD34D]/10 hover:text-[#FCD34D] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Users className="w-5 h-5" />
                    About
                  </Link>
                  <Link
                    href="/careers"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-[#FCD34D]/10 hover:text-[#FCD34D] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Briefcase className="w-5 h-5" />
                    Careers
                  </Link>
                  
                  <div className="border-t border-[#FCD34D]/20 mt-4 pt-4">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-[#FCD34D] to-[#C99600] text-black font-semibold"
                    >
                      <a href="https://campus.forsyth.k12.ga.us/campus/portal/forsyth.jsp" target="_blank" rel="noopener noreferrer">
                        Parent Portal
                      </a>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
