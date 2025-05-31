import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Breadcrumbs, 
  Grid, 
  Paper, 
  CircularProgress,
  useTheme,
  // useMediaQuery 
} from '@mui/material';
import { ChevronRight, ArrowLeft, Building } from 'lucide-react';
import JobDetail from '../components/JobDetail/JobDetail';
import { Job } from '../data/jobsData';
import { subSubJob } from '../data/jobsData';



const JobView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [similarJobs, setSimilarJobs] = useState<subSubJob[]>([]);
  const theme = useTheme();
  const capitalizeWords = (str: string): string =>
    str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());

  useEffect(() => {
    setLoading(true);

    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:8338/api/opportunity/${id}`);
        
        
        const jobTypeMap: Record<string, Job['jobType']> = {
          FULL_TIME: 'Full-Time',
          PART_TIME: 'Part-Time',
          PERMANENT: 'Permanent',
          TEMPORARY: 'Temporary',
          CONTRACT: 'Contract',
          FREELANCE_CONTRACT: 'Freelance-Contract',
          INTERNSHIP: 'Internship',
          APPRENTICESHIP: 'Apprenticeship',
        };
        
        const formatJobType = (jobType: keyof typeof jobTypeMap): Job['jobType'] => {
          return jobTypeMap[jobType] || jobType;
        };

        const getDaysAgo = (createdAt: string | Date): number => {
          return Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24));
        };
        const getDaysLeft = (updatedAt: string | Date): number => {
          return Math.floor((new Date(updatedAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        };

        const formatPostedDate = (createdAt: string | Date): string => {
          const daysAgo = getDaysAgo(createdAt);
          if (daysAgo === 0) return 'Today';
          if (daysAgo === 1) return '1 day ago';
          if (daysAgo < 7) return `${daysAgo} days ago`;
          if (daysAgo < 30) {
            const weeks = Math.floor(daysAgo / 7);
            return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
          }
          if (daysAgo < 365) {
            const months = Math.floor(daysAgo / 30);
            return months === 1 ? '1 month ago' : `${months} months ago`;
          }
          const years = Math.floor(daysAgo / 365);
          return years === 1 ? '1 year ago' : `${years} years ago`;
        };
        const formatLeftDate = (updatedAt: string | Date): string => {
          const daysLeft = getDaysLeft(updatedAt);
          if (daysLeft === 0) return 'Today';
          if (daysLeft === 1) return '1 day left';
          if (daysLeft < 7) return `${daysLeft} days left`;
          if (daysLeft < 30) {
            const weeks = Math.floor(daysLeft / 7);
            return weeks === 1 ? '1 week left' : `${weeks} weeks left`;
          }
          if (daysLeft < 365) {
            const months = Math.floor(daysLeft / 30);
            return months === 1 ? '1 month left' : `${months} months left`;
          }
          const years = Math.floor(daysLeft / 365);
          return years === 1 ? '1 year left' : `${years} years left`;
        };
        const foundJob = response.data as Job;
        const transformedJob = {
          ...foundJob,
          title: capitalizeWords(foundJob.title),
          categoryName: capitalizeWords(foundJob.categoryName),
          companyName: capitalizeWords(foundJob.companyName),
          createdDate: new Date(foundJob.createdAt).toLocaleDateString(),
          updatedAt: formatPostedDate(new Date(foundJob.updatedAt).toLocaleDateString()),
          jobType: formatJobType(foundJob.jobType as keyof typeof jobTypeMap),
          applicationDeadline: formatLeftDate(new Date(foundJob.applicationDeadline).toLocaleDateString()),
          posted: formatPostedDate(foundJob.createdAt),
          isNew: getDaysAgo(foundJob.createdAt) < 6,
        };
        setJob(transformedJob);
        
        const response1 = await axios.post(`http://localhost:8448/api/opportunity/search/${id}`, {
          limit: 3,
        });
        const similar = (response1.data as subSubJob[]).map(subJob => ({
                  ...subJob,
                  title: capitalizeWords(subJob.title),
                  companyName: capitalizeWords(subJob.companyName),
                })).slice(0,3);
        setSimilarJobs(similar);
      } catch (error) {
        console.error('Error fetching job:', error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchJob();
  }, [id]);

  const handleSaveToggle = (jobId: string) => {
    if (job && job.id === jobId) {
      setJob({ ...job, isSaved: !job.isSaved });
    }
    
    setSimilarJobs(similarJobs.map(j => 
      j.id === jobId ? { ...j, isSaved: !j.isSaved } : j
    ));
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!job) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" gutterBottom>
            Job Not Found
          </Typography>
          <Typography variant="body1" paragraph>
            The job you're looking for doesn't exist or has been removed.
          </Typography>
          <Button 
            component={Link} 
            to="/" 
            variant="contained"
            startIcon={<ArrowLeft />}
          >
            Back to Jobs
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs separator={<ChevronRight size={16} />} sx={{ mb: 3 }}>
        <Link to="/" style={{ color: theme.palette.text.secondary, textDecoration: 'none' }}>
          Jobs
        </Link>
        <Typography color="text.primary">{job.title}</Typography>
      </Breadcrumbs>
      
      <Button 
        component={Link} 
        to="/" 
        startIcon={<ArrowLeft />}
        sx={{ mb: 3 }}
      >
        Back to Jobs
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <JobDetail job={job} onSaveToggle={handleSaveToggle} />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Building size={20} style={{ verticalAlign: 'middle', marginRight: 8 }} />
              About {job.companyName}
            </Typography>
            <Typography variant="body2" paragraph>
              {job.companyName} is a leading company in its industry, committed to innovation and excellence. 
              Join our team and be part of our mission to transform the future.
            </Typography>
            <Button variant="outlined" fullWidth>
              View Company Profile
            </Button>
          </Paper>
          
          {similarJobs.length > 0 && (
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Similar Jobs
              </Typography>
              {similarJobs.map((similarJob) => (
                <Box 
                  key={similarJob.id}
                  sx={{ 
                    mb: 2, 
                    pb: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': {
                      borderBottom: 'none',
                      pb: 0,
                      mb: 0
                    }
                  }}
                >
                  <Link 
                    to={`/job/${similarJob.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Typography variant="subtitle1" color="primary">
                      {similarJob.title}
                    </Typography>
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    {similarJob.companyName} • {`${similarJob.jobLocation.city}, ${similarJob.jobLocation.country}`}
                  </Typography>
                  <Typography variant="body2">
                    {`${similarJob.salary.min} - ${similarJob.salary.max} ${similarJob.salary.currency} / ${capitalizeWords(similarJob.salary.unit.toLowerCase())}`}
                  </Typography>
                </Box>
              ))}
              <Button variant="text" fullWidth sx={{ mt: 1 }}>
                View More Similar Jobs
              </Button>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default JobView;