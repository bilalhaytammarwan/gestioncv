import { Company, User, Candidate } from '../types'; // Removed Job import
import { opportunity } from '../service/OpportunityService'; // Added opportunity import

// Updated mockJobs to fit the opportunity interface
export const mockOpportunities: opportunity[] = [
  {
    id: '1',
    companyId: 'company-techcorp-123', // Example companyId
    title: 'Frontend Developer',
    description: 'We are looking for a skilled Frontend Developer to join our team and help build amazing user experiences.',
    categoryId: 'cat-softwaredev-001', // Example categoryId
    createdAt: new Date('2023-04-15T10:00:00Z').toISOString(),
    updatedAt: new Date('2023-04-15T10:00:00Z').toISOString(),
    jobType: 'FULL_TIME',
    salary: {
      min: 120000,
      max: 150000,
      currency: 'USD',
      unit: 'ANNUALLY',
    },
    jobLocation: {
      city: 'San Francisco',
      region: 'CA',
      country: 'USA',
    },
    status: 'ACTIVE',
    applicationDeadline: new Date('2023-06-15T23:59:59Z').toISOString(),
    remote: true,
    requirements: [
      'Proficient in React, TypeScript, and modern JavaScript',
      '3+ years of frontend development experience',
      'Experience with responsive design and CSS frameworks',
      'Good understanding of web performance optimization',
    ],
    responsibilities: [
        'Develop new user-facing features',
        'Build reusable code and libraries for future use',
        'Ensure the technical feasibility of UI/UX designs',
        'Optimize application for maximum speed and scalability'
    ],
    benefits: [
      'Competitive salary and equity',
      'Health, dental, and vision insurance',
      'Flexible work hours and remote work policy',
      'Professional development budget',
    ],
    yearsOfExperience: 3,
    tags: ['React', 'TypeScript', 'Frontend'],
    url: 'https://example.com/job/frontend-developer-1',
    candidatesIds: Array.from({ length: 45 }, (_, i) => `candidate-${i + 1}`), // Simulating 45 candidate IDs
  },
  {
    id: '2',
    companyId: 'company-designhub-456', // Example companyId
    title: 'Product Designer',
    description: 'Join our design team to create beautiful, functional user interfaces for our products.',
    categoryId: 'cat-design-002', // Example categoryId
    createdAt: new Date('2023-04-10T09:00:00Z').toISOString(),
    updatedAt: new Date('2023-04-11T14:30:00Z').toISOString(),
    jobType: 'FULL_TIME',
    salary: {
      min: 90000,
      max: 120000,
      currency: 'USD',
      unit: 'ANNUALLY',
    },
    jobLocation: {
      city: 'New York',
      region: 'NY',
      country: 'USA',
    },
    status: 'ACTIVE',
    applicationDeadline: new Date('2023-05-30T23:59:59Z').toISOString(),
    remote: false,
    requirements: [
      'Strong portfolio showcasing UI/UX design skills',
      'Experience with Figma and design systems',
      'Understanding of user-centered design principles',
      'Ability to work collaboratively with developers',
    ],
    responsibilities: [
        'Conduct user research and evaluate user feedback',
        'Create wireframes, storyboards, user flows, process flows and site maps',
        'Establish and promote design guidelines, best practices and standards'
    ],
    benefits: [
      'Competitive salary',
      'Health and wellness benefits',
      'Flexible schedule',
      'Creative work environment',
    ],
    yearsOfExperience: 3, // Assuming Mid level maps to around 3 years
    tags: ['UI/UX', 'Figma', 'Product Design'],
    url: 'https://example.com/job/product-designer-2',
    candidatesIds: Array.from({ length: 28 }, (_, i) => `candidate-${100 + i + 1}`), // Simulating 28 candidate IDs
  },
  {
    id: '3',
    companyId: 'company-dataco-789', // Example companyId
    title: 'Data Scientist',
    description: 'Help us turn data into actionable insights and drive business decisions.',
    categoryId: 'cat-datascience-003', // Example categoryId
    createdAt: new Date('2023-04-05T16:00:00Z').toISOString(),
    updatedAt: new Date('2023-04-05T16:00:00Z').toISOString(),
    jobType: 'FULL_TIME',
    salary: {
      min: 130000,
      max: 160000,
      currency: 'USD',
      unit: 'ANNUALLY',
    },
    jobLocation: {
      city: 'Remote',
      region: 'N/A',
      country: 'N/A',
    },
    status: 'INACTIVE', // Changed from Paused to INACTIVE to match potential enum values
    applicationDeadline: new Date('2023-05-20T23:59:59Z').toISOString(),
    remote: true,
    requirements: [
      'Advanced degree in Statistics, Mathematics, or Computer Science',
      'Experience with Python, R, and data visualization tools',
      'Knowledge of machine learning algorithms',
      'Strong analytical and problem-solving skills',
    ],
    responsibilities: [
        'Develop custom data models and algorithms to apply to data sets',
        'Use predictive modeling to increase and optimize customer experiences',
        'Coordinate with different functional teams to implement models and monitor outcomes'
    ],
    benefits: [
      'Competitive compensation package',
      'Remote-first culture',
      'Continuous learning opportunities',
      'Modern tech stack',
    ],
    yearsOfExperience: 5, // Assuming Senior level maps to around 5 years
    tags: ['Python', 'Machine Learning', 'Data Analysis'],
    url: null, // Example of a null URL
    candidatesIds: Array.from({ length: 15 }, (_, i) => `candidate-${200 + i + 1}`), // Simulating 15 candidate IDs
  },
];

export const mockCompany: Company = {
  id: '1',
  name: 'TechCorp',
  logo: 'https://images.pexels.com/photos/15013506/pexels-photo-15013506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  description: 'TechCorp is a leading technology company focused on creating innovative solutions for businesses of all sizes.',
  industry: 'Information Technology',
  size: '50-200 employees',
  website: 'https://techcorp.example.com',
  location: 'San Francisco, CA',
};

export const mockUser: User = {
  id: '1',
  name: 'Jane Smith',
  email: 'jane.smith@techcorp.example.com',
  role: 'Admin',
  companyId: '1',
};

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    jobTitle: 'Senior Frontend Developer',
    experience: '5+ years of frontend development',
    location: 'San Francisco, CA',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    status: 'Under Review',
    appliedDate: '2024-03-15',
    appliedRole: 'Frontend Developer',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    jobTitle: 'UX Designer',
    experience: '3 years in product design',
    location: 'New York, NY',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    status: 'Shortlisted',
    appliedDate: '2024-03-14',
    appliedRole: 'Product Designer',
  },
  {
    id: '3',
    name: 'Michael Brown',
    jobTitle: 'Data Scientist',
    experience: '4 years in data science and analytics',
    location: 'Remote',
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
    status: 'Pending',
    appliedDate: '2024-03-13',
    appliedRole: 'Data Scientist',
  },
  {
    id: '4',
    name: 'Emily Wilson',
    jobTitle: 'Full Stack Developer',
    experience: '6 years of full stack development',
    location: 'Austin, TX',
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    status: 'Rejected',
    appliedDate: '2024-03-12',
    appliedRole: 'Frontend Developer',
  },
];