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
  
}

const JobCard: React.FC<JobCardProps> = ({ job}) => {
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
                  {job.description}
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Box sx={{ mb: 1.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Box component="span" sx={{ minWidth: 90 }}>Location:</Box> {job.typeannonce}
            </Typography>
           
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 2 }}>
          
            
            <Box sx={{ ml: 'auto', opacity: isHovered ? 1 : 0.7, transition: 'opacity 0.2s' }}>
              <ExternalLink size={16} />
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
      
     
    </Card>
  );
};

export default JobCard;