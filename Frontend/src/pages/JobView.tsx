import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  useMediaQuery 
} from '@mui/material';
import { ChevronRight, ArrowLeft, Building } from 'lucide-react';
import JobDetail from '../components/JobDetail/JobDetail';
import { jobsData, Job } from '../data/jobsData';

const JobView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const foundJob = jobsData.find(j => j.id === id);
      setJob(foundJob || null);
      
      // Find similar jobs (in a real app, this would be based on keywords, skills, etc.)
      if (foundJob) {
        const similar = jobsData
          .filter(j => j.id !== id && j.type === foundJob.type)
          .slice(0, 3);
        setSimilarJobs(similar);
      }
      
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
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
              About {job.company}
            </Typography>
            <Typography variant="body2" paragraph>
              {job.company} is a leading company in its industry, committed to innovation and excellence. 
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
                    {similarJob.company} • {similarJob.location}
                  </Typography>
                  <Typography variant="body2">
                    {similarJob.salary}
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