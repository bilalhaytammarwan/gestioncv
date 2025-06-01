import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Avatar,
  Button,
  Stack,
  Divider,
  useTheme,
  CircularProgress,
  Grid,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import { AccessTime, LocationOn, MonetizationOn, Public, Work } from '@mui/icons-material';
import { DialogTitle } from '@headlessui/react';

interface Announcement {
  title?: string;
  description: string;
  categoryId: string;
  categoryName:string;
  createdAt: Date;
  updatedAt: Date;
  jobType: string; 
  salary: Salary; 
  jobLocation: Location; 
  status: string; 
  applicationDeadline: Date;
  remote: boolean;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  yearsOfExperience: number;
  tags: string[];
  // searchSuggestions?: string[]; // Uncomment if needed
  url: string;
  name:string;
}
 interface Location {
  city: string;     
  
  region: string;  
  country: string;   
}
export interface Salary {
  currency: string;  
  min: number;     
  max: number;    
  unit: string;      
}


const AnnouncementDetails: React.FC = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    
  const handleDelete = async () => {
   
    try {
      await axios.delete(`http://localhost:8338/api/opportunity/${id}`);
      navigate('/admin/announcements/company');
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await axios.get<Announcement>(`http://localhost:8338/api/opportunity/company/${id}`);
        setAnnouncement(response.data);
      } catch (error) {
        console.error('Error fetching announcement:', error);
        setError('Failed to load announcement details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAnnouncement();
    }
  }, [id]);

  const handleApprove = async () => {
    try {
      await axios.put(`http://localhost:8338/api/announcements/${id}/approve`);
      setAnnouncement(prev => prev ? { ...prev, status: 'published' } : null);
    } catch (error) {
      console.error('Error approving announcement:', error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(`http://localhost:8338/api/announcements/${id}/reject`);
      setAnnouncement(prev => prev ? { ...prev, status: 'rejected' } : null);
    } catch (error) {
      console.error('Error rejecting announcement:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !announcement) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="error">{error || 'Announcement not found'}</Typography>
        <Button
          startIcon={<ArrowLeft />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Box>
    );
  }

//   const getStatusColor = () => {
//     switch (announcement.status) {
//       case 'published':
//         return theme.palette.success;
//       case 'pending':
//         return theme.palette.warning;
//       case 'rejected':
//         return theme.palette.error;
//       default:
//         return theme.palette.info;
//     }
//   };

   return (
    <>
    
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      
      <Typography variant="h4" gutterBottom fontWeight="bold">
        {announcement.title || 'Untitled Position'}
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Chip label={announcement.jobType} color="primary" />
        {announcement.remote && <Chip label="Remote" color="success" />}
        <Chip label={announcement.categoryName}/>
        <Chip
          label={`Experience: ${announcement.yearsOfExperience} yrs`}
          color="secondary"
        />
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Typography variant="h6">Overview</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Work fontSize="small" />
              <Typography variant="body1">{announcement.name}</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOn fontSize="small" />
              <Typography variant="body1">
                {announcement.jobLocation?.city}, {announcement.jobLocation?.region}, {announcement.jobLocation?.country}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <MonetizationOn fontSize="small" />
              <Typography variant="body1">
                {announcement.salary?.currency} {announcement.salary?.min.toLocaleString()} - {announcement.salary?.max.toLocaleString()} / {announcement.salary?.unit}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTime fontSize="small" />
              <Typography variant="body1">
                Posted: {new Date(announcement.createdAt).toLocaleDateString()}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Public fontSize="small" />
              <Typography variant="body1">
                Deadline: {new Date(announcement.applicationDeadline).toLocaleDateString()}
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography variant="h6">Description</Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {announcement.description}
            </Typography>
          </Stack>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>Requirements</Typography>
          <ul>
            {announcement.requirements.map((req, i) => (
              <li key={i}>
                <Typography variant="body2">{req}</Typography>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>Responsibilities</Typography>
          <ul>
            {announcement.responsibilities.map((res, i) => (
              <li key={i}>
                <Typography variant="body2">{res}</Typography>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>Benefits</Typography>
          <ul>
            {announcement.benefits.map((ben, i) => (
              <li key={i}>
                <Typography variant="body2">{ben}</Typography>
              </li>
            ))}
          </ul>
        </Grid>
      </Grid>
      <Button 
        variant="contained" 
        color="error" 
        sx={{ mt: 3 }}
        onClick={() => handleDelete()}
      >
        Delete Announcement
      </Button>
      
    
    </Paper>
    </>
  );
};

export default AnnouncementDetails; 