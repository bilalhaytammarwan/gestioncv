import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  IconButton,
  CardActionArea,
  Avatar,
  useTheme
} from '@mui/material';
import { BookmarkPlus, BookmarkCheck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Job } from '../../data/jobsData';

interface JobCardProps {
  job: Job;
  onSaveToggle: (id: string) => void;
}

const formatSalary = (salary: number[]): string => {
  const [min, max] = (salary!)? salary: [0,0] ;
  return `$${(min/1000).toFixed(0)}k - $${(max === Number.MAX_SAFE_INTEGER ? '200+' : (max/1000).toFixed(0)+'k')}`;
};

const JobCard: React.FC<JobCardProps> = ({ job, onSaveToggle }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      variant="outlined"
      sx={{ 
        mb: 2,
        position: 'relative',
        transition: 'all 0.2s ease-in-out',
        border: isHovered 
          ? `1px solid ${theme.palette.primary.main}` 
          : '1px solid rgba(0, 0, 0, 0.12)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardActionArea 
        component={Link} 
        to={`/job/${job.id}`}
        sx={{ display: 'block', textDecoration: 'none' }}
      >
        <CardContent sx={{ pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                src={job.logo}
                alt={job.company}
                variant="rounded"
                sx={{ 
                  width: 50, 
                  height: 50, 
                  mr: 2,
                  bgcolor: theme.palette.grey[200]
                }}
              />
              <Box>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {job.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {job.company}
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Box sx={{ mb: 1.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Box component="span" sx={{ minWidth: 90 }}>Location:</Box> {job.location}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Box component="span" sx={{ minWidth: 90 }}>Salary:</Box> {formatSalary(job.salary)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ minWidth: 90 }}>Posted:</Box> {job.posted}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            <Chip 
              label={job.type} 
              size="small"
              color="primary"
              variant="outlined"
            />
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
            <Box sx={{ ml: 'auto', opacity: isHovered ? 1 : 0.7, transition: 'opacity 0.2s' }}>
              <ExternalLink size={16} />
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
      
      <IconButton
        aria-label={job.isSaved ? "Remove from saved jobs" : "Save job"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onSaveToggle(job.id);
        }}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 2,
          color: job.isSaved ? theme.palette.primary.main : 'rgba(0, 0, 0, 0.54)',
        }}
      >
        {job.isSaved ? <BookmarkCheck size={20} /> : <BookmarkPlus size={20} />}
      </IconButton>
    </Card>
  );
};

export default JobCard;