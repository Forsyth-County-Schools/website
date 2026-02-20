'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  School,
  Calendar,
  Users,
  GraduationCap,
  Trophy,
  Briefcase,
  Search,
  Home,
  FileText,
} from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { schools } from '@/lib/data';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const quickLinks = [
  { title: 'Home', href: '/', icon: Home },
  { title: 'Schools', href: '/schools', icon: School },
  { title: 'Academics', href: '/academics', icon: GraduationCap },
  { title: 'Athletics', href: '/athletics', icon: Trophy },
  { title: 'Calendar', href: '/calendar', icon: Calendar },
  { title: 'About', href: '/about', icon: Users },
  { title: 'Board of Education', href: '/board', icon: Users },
  { title: 'Careers', href: '/careers', icon: Briefcase },
];

const resources = [
  { title: 'Parent Portal', href: 'https://campus.forsyth.k12.ga.us/campus/portal/forsyth.jsp', icon: FileText, external: true },
  { title: 'Student Registration', href: '/resources/registration', icon: FileText },
  { title: 'Transportation', href: '/resources/transportation', icon: FileText },
  { title: 'Food & Nutrition', href: '/resources/nutrition', icon: FileText },
];

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const handleSelect = (href: string, external?: boolean) => {
    onOpenChange(false);
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      router.push(href);
    }
  };

  // Get top schools for quick access
  const featuredSchools = schools.slice(0, 8);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search schools, pages, resources..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Quick Links">
          {quickLinks.map((link) => (
            <CommandItem
              key={link.href}
              value={link.title}
              onSelect={() => handleSelect(link.href)}
              className="cursor-pointer"
            >
              <link.icon className="mr-2 h-4 w-4 text-[#FCD34D]" />
              <span>{link.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Schools">
          {featuredSchools.map((school) => (
            <CommandItem
              key={school.id}
              value={school.name}
              onSelect={() => handleSelect(`/schools/${school.slug}`)}
              className="cursor-pointer"
            >
              <School className="mr-2 h-4 w-4 text-[#FCD34D]" />
              <div className="flex flex-col">
                <span>{school.name}</span>
                <span className="text-xs text-muted-foreground capitalize">
                  {school.level} School • {school.city}
                </span>
              </div>
            </CommandItem>
          ))}
          <CommandItem
            value="View all schools"
            onSelect={() => handleSelect('/schools')}
            className="cursor-pointer"
          >
            <Search className="mr-2 h-4 w-4 text-[#FCD34D]" />
            <span>View all 42 schools →</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Resources">
          {resources.map((resource) => (
            <CommandItem
              key={resource.href}
              value={resource.title}
              onSelect={() => handleSelect(resource.href, resource.external)}
              className="cursor-pointer"
            >
              <resource.icon className="mr-2 h-4 w-4 text-[#FCD34D]" />
              <span>{resource.title}</span>
              {resource.external && (
                <span className="ml-auto text-xs text-muted-foreground">↗</span>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
