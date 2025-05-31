// Common types for the application

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'company' | 'client';
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
  lastLogin?: string;
}

export interface Company extends User {
  companyName: string;
  industry: string;
  size: string;
  logo?: string;
  location: string;
  jobsPosted: number;
  verified: boolean;
}

export interface Client extends User {
  firstName: string;
  lastName: string;
  skills: string[];
  jobsApplied: number;
  profileCompleteness: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  source: 'company' | 'client';
  sourceId: string;
  sourceName: string;
  status: 'published' | 'pending' | 'rejected';
  createdAt: string;
  expiresAt?: string;
}

export interface Stats {
  totalCompanies: number;
  newCompanies: number;
  activeCompanies: number;
  totalClients: number;
  newClients: number;
  activeClients: number;
  pendingAnnouncements: number;
}