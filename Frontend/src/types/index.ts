export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  description: string;
  requirements: string[];
  benefits: string[];
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary' | 'Internship';
  experienceLevel: 'Entry level' | 'Mid level' | 'Senior level' | 'Executive';
  postedDate: Date;
  status: 'Active' | 'Paused' | 'Closed';
  applicationsCount: number;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  industry: string;
  size: string;
  website: string;
  location: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Recruiter';
  companyId: string;
}

export interface Candidate {
  id: string;
  name: string;
  jobTitle: string;
  experience: string;
  location: string;
  skills: string[];
  status: 'Under Review' | 'Shortlisted' | 'Rejected' | 'Pending';
  appliedDate: string;
  appliedRole: string;
  resume?: string;
  email?: string;
  opportunityId?: number;
  appliedOpportunityIds?: number[];
}

export interface Opportunity {
  id: number;
  companyId: string;
  title: string;
  description: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  jobType: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  salaryUnit?: string;
  jobLocation: {
    city: string;
    region: string;
    country: string;
  };
  status: string;
  applicationDeadline: string;
  remote: boolean;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  yearsOfExperience: number;
  tags?: string[] | null;
  url?: string | null;
  candidatesIds?: string[] | null;
}