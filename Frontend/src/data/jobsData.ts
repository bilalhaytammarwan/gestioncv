export interface Job {
    id: string;
    title: string| "undefined";
    company: string| "undefined";
    location: string| "undefined";
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
    salary: number[];
    description: string | "undefined";
    level: 'Executive' | 'Director' | 'Senior level' | 'Mid level' | 'Entry level';
    postedDate: string| "undefined";
    requiredSkills: string[]| "undefined";
    isSaved?: boolean| "undefined";
}

export const groupingMap = {
    'Technology': ['Software', 'Developer', 'Engineer', 'IT', 'DevOps', 'Cloud', 'Data'],
    'Design': ['UX', 'UI', 'Graphic', 'Product Designer', 'Visual'],
    'Marketing': ['Marketing', 'SEO', 'Content', 'Social Media', 'Brand'],
    'Sales': ['Sales', 'Account Executive', 'Business Development', 'Customer Success'],
    'Finance': ['Finance', 'Accounting', 'Analyst', 'Banking', 'Investment'],
    'Healthcare': ['Medical', 'Nurse', 'Doctor', 'Healthcare', 'Clinical'],
};



// Example job data
export const jobsData: Job[] = [
    {
        id: '1',
        title: 'Senior Software Engineer',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        type: 'Full-time',
        salary: [120000, 160000],
        description: 'Looking for an experienced software engineer...',
        level: 'Senior level',
        postedDate: '2025-04-20',
        requiredSkills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
        isSaved: false
    },
    {
        id: '2',
        title: 'UX Designer',
        company: 'Design Studio',
        location: 'New York, NY',
        type: 'Remote',
        salary: [90000, 120000],
        description: 'Join our creative team as a UX Designer...',
        level: 'Mid level',
        postedDate: '2025-04-22',
        requiredSkills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
        isSaved: false
    }
    // Add more job data as needed
];

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
  [0, 50000],
  [50000, 80000],
  [80000, 100000],
  [100000, 130000],
  [130000, Number.MAX_SAFE_INTEGER]
];

export const ExpLevel=[
  'Executive',
  'Director',
  'Senior level',
  'Mid level',
  'Entry level'
]

export const categories = [
  'technology',
  'finance',
  'healthcare',
  'marketing'
]

