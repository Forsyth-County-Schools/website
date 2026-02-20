// School Types
export type SchoolLevel = 'elementary' | 'middle' | 'high';

export interface Principal {
  name: string;
  title: string;
  email: string;
  phone: string;
  image: string;
}

export interface School {
  id: string;
  slug: string;
  name: string;
  level: SchoolLevel;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  website: string;
  enrollment: number;
  rating: number;
  principal: Principal;
  heroImage: string;
  mascot: string;
  colors: string[];
  established: number;
  latitude: number;
  longitude: number;
  description: string;
  features: string[];
}

// News Types
export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  image: string;
  featured: boolean;
  tags: string[];
}

// Event Types
export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  category: 'district' | 'school' | 'athletics' | 'arts' | 'community';
  schoolId?: string;
  allDay: boolean;
  color: string;
}

// Board Member Types
export interface BoardMember {
  id: string;
  name: string;
  title: string;
  district: string;
  email: string;
  phone: string;
  image: string;
  bio: string;
  termStart: string;
  termEnd: string;
}

// Leadership Types
export interface LeadershipMember {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  image: string;
  bio: string;
}

// Job Types
export interface Job {
  id: string;
  title: string;
  department: string;
  category: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  salary: string;
  postedAt: string;
  closingDate: string;
  description: string;
  requirements: string[];
  benefits: string[];
  featured?: boolean;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  school?: string;
  quote: string;
  image: string;
  videoUrl?: string;
}

// Sports Types
export interface Sport {
  id: string;
  name: string;
  season: 'fall' | 'winter' | 'spring';
  icon: string;
  teams: string[];
}

export interface Game {
  id: string;
  sport: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  location: string;
  homeScore?: number;
  awayScore?: number;
  status: 'upcoming' | 'live' | 'completed';
}

// Program Types
export interface AcademicProgram {
  id: string;
  name: string;
  category: string;
  description: string;
  schools: string[];
  icon: string;
  link: string;
}

// Statistics Types
export interface DistrictStats {
  totalStudents: number;
  totalSchools: number;
  graduationRate: number;
  collegeReadinessRate: number;
  apPassRate: number;
  teacherStudentRatio: number;
  averageClassSize: number;
  totalTeachers: number;
}

// Navigation Types
export interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
  icon?: string;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  school?: string;
}

export interface NewsletterFormData {
  email: string;
  firstName?: string;
  lastName?: string;
  interests: string[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
}

// Search Types
export interface SearchResult {
  type: 'school' | 'news' | 'event' | 'page';
  title: string;
  description: string;
  url: string;
  image?: string;
}
