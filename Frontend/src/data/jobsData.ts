export interface Job {
  id: string;
  companyName: string;
  title: string;
  description: string,
  categoryName: string,
  createdAt: string;
  updatedAt: string;
  jobType:
    | 'Full-Time'
    | 'Part-Time'
    | 'Permanent'
    | 'Temporary'
    | 'Contract'
    | 'Freelance-Contract'
    | 'Internship'
    | 'Apprenticeship';
  salary: {
    currency: string;
    min: number;
    max: number;
    unit: 'HOURLY' | 'DAILY' | 'MONTLY' | 'ANNUALY';
  };
  jobLocation: {
    city: string;
    region: string;
    country: string;
  };
  applicationDeadline: string;
  remote: boolean;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  yearsOfExperience: number;

  isSaved?: boolean;
  isNew?: boolean;
  logo?: string;
  posted?: string;
}

export interface SubJob {
  id: string;
  companyName: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  jobType:
    | 'Full-Time'
    | 'Part-Time'
    | 'Permanent'
    | 'Temporary'
    | 'Contract'
    | 'Freelance-Contract'
    | 'Internship'
    | 'Apprenticeship';
  salary: {
    currency: string;
    min: number;
    max: number;
    unit: 'HOURLY' | 'DAILY' | 'MONTLY' | 'ANNUALY';
  };
  jobLocation: {
    city: string;
    region: string;
    country: string;
  };
  applicationDeadline: string;
  remote: boolean;
  yearsOfExperience: number;

  isSaved?: boolean;
  isNew?: boolean;
  logo?: string;
  posted?: string;
}

export interface subSubJob {
  id: string;
  companyName: string;
  title: string;
  salary: {
    currency: string;
    min: number;
    max: number;
    unit: 'HOURLY' | 'DAILY' | 'MONTLY' | 'ANNUALY';
  };
  jobLocation: {
    city: string;
    region: string;
    country: string;
  };
  isSaved?: boolean;
}

export const locations = [
  'San Francisco, CA',
  'New York, NY',
  'Remote',
  'Austin, TX',
  'Chicago, IL',
  'Seattle, WA',
  'Denver, CO',
  'Boston, MA',
  'Los Angeles, CA',
  'Portland, OR'
];

export const jobTypes = [
  'Full-time',
  'Part-time',
  'Contract',
  'Remote',
  'Internship'
];

export const salaryRanges = [
  '$0 - $50,000',
  '$50,000 - $80,000',
  '$80,000 - $100,000',
  '$100,000 - $130,000',
  '$130,000+'
];