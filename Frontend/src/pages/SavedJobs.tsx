import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Divider,
  CircularProgress,
  Alert,
  useTheme
} from '@mui/material';
import { Bookmark, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobList/JobCard';
import { jobsData, Job } from '../data/jobsData';

const SavedJobs: React.FC = () => {
  const theme = useTheme();
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const saved = jobsData.filter(job => job.isSaved);
      setSavedJobs(saved);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSaveToggle = (id: string) => {
    setSavedJobs(prevJobs => prevJobs.filter(job => job.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Bookmark size={28} color={theme.palette.primary.main} />
        <Typography variant="h4" component="h1" sx={{ ml: 1, fontWeight: 600 }}>
          Saved Jobs
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 4 }} />
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : savedJobs.length > 0 ? (
        <>
          <Typography variant="body1" paragraph>
            You have {savedJobs.length} saved job{savedJobs.length !== 1 ? 's' : ''}. 
            Save more jobs to compare and apply later.
          </Typography>
          
          <Box sx={{ my: 4 }}>
            {savedJobs.map(job => (
              <JobCard key={job.id} job={job} onSaveToggle={handleSaveToggle} />
            ))}
          </Box>
        </>
      ) : (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <AlertCircle size={48} color={theme.palette.text.secondary} style={{ margin: '0 auto 16px' }} />
          <Typography variant="h5" gutterBottom>
            No Saved Jobs
          </Typography>
          <Typography variant="body1" paragraph>
            You haven't saved any jobs yet. Save jobs to compare and apply later.
          </Typography>
          <Button 
            component={Link} 
            to="/" 
            variant="contained" 
            color="primary"
            sx={{ mt: 2 }}
          >
            Browse Jobs
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default SavedJobs;