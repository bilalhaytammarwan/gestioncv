export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  description: string;
  requirements: string[];
  posted: string;
  logo: string;
  isNew: boolean;
  isSaved: boolean;
}

export const jobsData: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    description: 'We are looking for a Senior Frontend Developer proficient in React to join our team. You will be responsible for developing user interfaces, implementing features, and ensuring optimal performance across all devices.',
    requirements: [
      '5+ years of experience with React',
      'Proficiency in TypeScript',
      'Experience with state management libraries (Redux, Context API)',
      'Experience with CSS-in-JS libraries (Styled Components, Emotion)',
      'Strong understanding of responsive design principles'
    ],
    posted: '2 days ago',
    logo: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=120',
    isNew: true,
    isSaved: false
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'InnovateTech',
    location: 'New York, NY',
    salary: '$110,000 - $140,000',
    type: 'Full-time',
    description: 'InnovateTech is seeking a Product Manager to lead the development of our SaaS platform. You will work closely with engineering, design, and marketing teams to define product strategy and roadmap.',
    requirements: [
      '3+ years of experience in product management',
      'Experience with agile methodologies',
      'Strong analytical and problem-solving skills',
      'Excellent communication and stakeholder management abilities',
      'Background in SaaS products preferred'
    ],
    posted: '1 week ago',
    logo: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=120',
    isNew: false,
    isSaved: true
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'DesignHub',
    location: 'Remote',
    salary: '$90,000 - $120,000',
    type: 'Remote',
    description: 'DesignHub is looking for a UX/UI Designer to create beautiful, intuitive interfaces for our clients. You will collaborate with product managers and developers to deliver exceptional user experiences.',
    requirements: [
      'Portfolio showcasing UX/UI design projects',
      'Proficiency in Figma or Adobe XD',
      'Experience conducting user research and usability testing',
      'Strong understanding of accessibility standards',
      'Ability to translate business requirements into design solutions'
    ],
    posted: '3 days ago',
    logo: 'https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=120',
    isNew: true,
    isSaved: false
  },
  {
    id: '4',
    title: 'Backend Developer',
    company: 'ServerStack',
    location: 'Austin, TX',
    salary: '$100,000 - $130,000',
    type: 'Full-time',
    description: 'ServerStack is seeking a Backend Developer to build high-performance APIs and services. You will be responsible for designing and implementing scalable backend solutions.',
    requirements: [
      'Experience with Node.js or Python',
      'Knowledge of SQL and NoSQL databases',
      'Understanding of API design principles',
      'Experience with cloud services (AWS, Azure, GCP)',
      'Ability to write clean, maintainable code'
    ],
    posted: '5 days ago',
    logo: 'https://images.pexels.com/photos/7172089/pexels-photo-7172089.jpeg?auto=compress&cs=tinysrgb&w=120',
    isNew: false,
    isSaved: false
  },
  {
    id: '5',
    title: 'Marketing Specialist',
    company: 'GrowthLabs',
    location: 'Chicago, IL',
    salary: '$70,000 - $90,000',
    type: 'Full-time',
    description: 'GrowthLabs is looking for a Marketing Specialist to drive our digital marketing initiatives. You will develop and execute marketing campaigns across various channels.',
    requirements: [
      'Experience with digital marketing (SEO, SEM, social media)',
      'Proficiency in marketing analytics tools',
      'Content creation skills',
      'Understanding of customer acquisition strategies',
      'Strong communication and collaboration abilities'
    ],
    posted: '1 week ago',
    logo: 'https://images.pexels.com/photos/3987020/pexels-photo-3987020.jpeg?auto=compress&cs=tinysrgb&w=120',
    isNew: false,
    isSaved: true
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'CloudNet',
    location: 'Seattle, WA',
    salary: '$110,000 - $140,000',
    type: 'Full-time',
    description: 'CloudNet is seeking a DevOps Engineer to help us build and maintain our cloud infrastructure. You will be responsible for CI/CD pipelines, infrastructure as code, and ensuring high availability.',
    requirements: [
      'Experience with cloud platforms (AWS, Azure, GCP)',
      'Knowledge of infrastructure as code tools (Terraform, CloudFormation)',
      'Experience with containerization (Docker, Kubernetes)',
      'Understanding of CI/CD principles',
      'Strong scripting skills (Bash, Python)'
    ],
    posted: '2 weeks ago',
    logo: 'https://images.pexels.com/photos/1181374/pexels-photo-1181374.jpeg?auto=compress&cs=tinysrgb&w=120',
    isNew: false,
    isSaved: false
  },
  {
    id: '7',
    title: 'Data Analyst',
    company: 'DataDrive',
    location: 'Remote',
    salary: '$80,000 - $100,000',
    type: 'Remote',
    description: 'DataDrive is looking for a Data Analyst to help us extract insights from our data. You will work with stakeholders to understand their needs and provide data-driven solutions.',
    requirements: [
      'Experience with SQL and data querying',
      'Proficiency in data visualization tools (Tableau, Power BI)',
      'Knowledge of statistical analysis',
      'Strong problem-solving abilities',
      'Excellent communication skills'
    ],
    posted: '4 days ago',
    logo: 'https://images.pexels.com/photos/936140/pexels-photo-936140.jpeg?auto=compress&cs=tinysrgb&w=120',
    isNew: true,
    isSaved: false
  },
  {
    id: '8',
    title: 'Customer Success Manager',
    company: 'SupportPro',
    location: 'Denver, CO',
    salary: '$75,000 - $95,000',
    type: 'Full-time',
    description: 'SupportPro is seeking a Customer Success Manager to ensure our clients achieve their goals with our product. You will be the primary point of contact for a portfolio of clients.',
    requirements: [
      'Experience in customer success or account management',
      'Strong interpersonal and communication skills',
      'Ability to understand and articulate product value',
      'Problem-solving mindset',
      'Experience with CRM software'
    ],
    posted: '1 week ago',
    logo: 'https://images.pexels.com/photos/8867329/pexels-photo-8867329.jpeg?auto=compress&cs=tinysrgb&w=120',
    isNew: false,
    isSaved: false
  }
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
  '$0 - $50,000',
  '$50,000 - $80,000',
  '$80,000 - $100,000',
  '$100,000 - $130,000',
  '$130,000+'
];