import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  BookmarkPlus,
  BookmarkCheck,
  Share2,
  Flag,
  Building,
  DollarSign,
  MapPin,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Job } from '../../data/jobsData';
import ApplicationForm from './ApplicationForm';

interface JobDetailProps {
  job: Job;
  onSaveToggle: (id: string) => void;
}

const JobDetail: React.FC<JobDetailProps> = ({ job, onSaveToggle }) => {
  const theme = useTheme();
  const [openApplicationForm, setOpenApplicationForm] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const capitalizeWords = (str: string): string =>
    str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: `${job.title} at ${job.companyName}`,
        text: `Check out this job: ${job.title} at ${job.companyName}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      setSnackbarMessage('Link copied to clipboard!');
      setSnackbarOpen(true);
    }
  };

  const handleApplyClick = () => {
    setOpenApplicationForm(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const formatRequirements = (requirements: string[]) => {
    return requirements.map((requirement, index) => (
      <ListItem key={index} disableGutters>
        <ListItemIcon sx={{ minWidth: 36 }}>
          <CheckCircle2 size={20} color={theme.palette.success.main} />
        </ListItemIcon>
        <ListItemText primary={requirement} />
      </ListItem>
    ));
  };

  return (
    <>
      <Paper 
        elevation={1}
        sx={{ 
          p: { xs: 2, sm: 4 },
          mb: 3,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', mb: 3 }}>
          <Avatar
            src={job.logo}
            alt={job.companyName}
            variant="rounded"
            sx={{ 
              width: 70, 
              height: 70, 
              mr: 3,
              bgcolor: theme.palette.grey[200],
              mb: { xs: 2, sm: 0 }
            }}
          />
          <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 0 } }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {job.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {job.categoryName}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              <Chip 
                label={job.jobType} 
                color="primary"
                variant="outlined"
                size="small"
              />
              {job.remote && (
                <Chip 
                  label="Remote" 
                  size="small"
                  color="info"
                  variant="outlined"
                />
              )}
              {job.isNew && (
                <Chip 
                  label="New" 
                  size="small" 
                  sx={{ 
                    bgcolor: theme.palette.success.light,
                    color: theme.palette.success.contrastText
                  }}
                />
              )}
            </Box>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            gap: 1,
            ml: { xs: 0, sm: 2 },
            mt: { xs: 2, sm: 0 },
            width: { xs: '100%', sm: 'auto' }
          }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleApplyClick}
            >
              Apply Now
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={job.isSaved ? <BookmarkCheck /> : <BookmarkPlus />}
              onClick={() => onSaveToggle(job.id)}
            >
              {job.isSaved ? 'Saved' : 'Save'}
            </Button>
          </Box>
        </Box>
  
        <Divider sx={{ my: 3 }} />
  
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '200px' }}>
            <Building size={20} color={theme.palette.text.secondary} />
            <Typography variant="body1" sx={{ ml: 1 }}>
              {job.companyName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '200px' }}>
            <MapPin size={20} color={theme.palette.text.secondary} />
            <Typography variant="body1" sx={{ ml: 1 }}>
              {`${job.jobLocation.city}, ${job.jobLocation.region}, ${job.jobLocation.country}`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '200px' }}>
            <DollarSign size={20} color={theme.palette.text.secondary} />
            <Typography variant="body1" sx={{ ml: 1 }}>
              {`${job.salary.min} - ${job.salary.max} ${job.salary.currency} / ${capitalizeWords(job.salary.unit.toLowerCase())}`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '200px' }}>
            <Clock size={20} color={theme.palette.text.secondary} />
            <Typography variant="body1" sx={{ ml: 1 }}>
              Posted {job.posted}
            </Typography>
          </Box>
          { job.updatedAt && (<Box sx={{ display: 'flex', alignItems: 'center', minWidth: '200px' }}>
            <Clock size={20} color={theme.palette.text.secondary} />
            <Typography variant="body1" sx={{ ml: 1 }}>
              Updated {job.updatedAt}
            </Typography>
          </Box>)
          }
          { job.applicationDeadline && (<Box sx={{ display: 'flex', alignItems: 'center', minWidth: '200px' }}>
            <Clock size={20} color={theme.palette.text.secondary} />
            <Typography variant="body1" sx={{ ml: 1 }}>
              {job.applicationDeadline}
            </Typography>
          </Box>)
          }

        </Box>
  
        <Divider sx={{ my: 3 }} />
  
        <Typography variant="h5" gutterBottom>
          Job Description
        </Typography>
        <Typography variant="body2" paragraph sx={{ opacity: 0.9 }}>
          {job.description}
        </Typography>
  
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Requirements
        </Typography>
        <List dense>
          {formatRequirements(job.requirements)}
        </List>
  
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Benefits
        </Typography>
        <List dense>
          {formatRequirements(job.benefits)}
        </List>
  
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Responsibilities
        </Typography>
        <List dense>
          {formatRequirements(job.responsibilities)}
        </List>
  
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleApplyClick}
            sx={{ 
              minWidth: '200px',
              width: { xs: '100%', sm: 'auto' }  
            }}
          >
            Apply Now
          </Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<Share2 />}
              onClick={handleShareClick}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Share
            </Button>
            <Button
              variant="outlined"
              color="warning"
              startIcon={<Flag />}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Report Job
            </Button>
          </Box>
        </Box>
      </Paper>
  
      <ApplicationForm 
        open={openApplicationForm} 
        jobTitle={job.title}
        company={job.companyName}
        onClose={() => setOpenApplicationForm(false)} 
      />
  
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
  
};

export default JobDetail;