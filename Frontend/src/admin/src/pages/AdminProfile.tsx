import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Button,
  TextField,
  IconButton,
  Divider,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Client {
  id: string;
  nom: string;
  telephone: string;
  email: string;
  password: string;
  description: string;
  dureeUtilisation: string;
  role: string;
  ville: string;
  notification: any;
  age: string;
  sexe: string;
  photo?:string;
  attachement?:string;
}

const AdminProfile: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<Client>();
  const {id}=useParams();
  console.log(id);

 
 useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8228/api/user/get/${id}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } 
    };

    fetchUser();
  }, [id]);
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
   let object:any={
    "email":profileData?.email,
    "telephone":profileData?.telephone,
    "ville":profileData?.ville
   }

   axios.put("http://localhost:8228/api/user/"+id,object);
   setIsEditing(false); 
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Grid container spacing={4}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md="auto">
                  <Avatar
                    src={profileData?.photo}
                    sx={{
                      width: { xs: 100, md: 150 },
                      height: { xs: 100, md: 150 },
                      border: `4px solid ${theme.palette.primary.main}`,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="h4" component="h1">
                      {profileData?.nom}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {profileData?.role}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
                      <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={handleEdit}
                        disabled={isEditing}
                      >
                        Edit Profile
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Details */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
              <Typography variant="h5" gutterBottom>
                Profile Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <EmailIcon color="primary" />
                    {isEditing ? (
                      <TextField
                        fullWidth
                        label="Email"
                        value={profileData?.email}
                        onChange={(e) => {
  if (profileData) {
    setProfileData({
      ...profileData,
      email: e.target.value,
    });
  }
}}
                      />
                    ) : (
                      <Typography>{profileData?.email}</Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <PhoneIcon color="primary" />
                    {isEditing ? (
                      <TextField
                        fullWidth
                        label="Phone"
                        value={profileData?.telephone}
                       onChange={(e) => {
  if (profileData) {
    setProfileData({
      ...profileData,
      telephone: e.target.value,
    });
  }
}}
                      />
                    ) : (
                      <Typography>{profileData?.telephone}</Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <LocationIcon color="primary" />
                    {isEditing ? (
                      <TextField
                        fullWidth
                        label="Location"
                        value={profileData?.ville}
                        onChange={(e) => {
  if (profileData) {
    setProfileData({
      ...profileData,
      ville: e.target.value,
    });
  }
}}
                      />
                    ) : (
                      <Typography>{profileData?.ville}</Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <WorkIcon color="primary" />
                  
                      <Typography>{profileData?.role}</Typography>
                    
                  </Box>
                </Grid>
              </Grid>
              {isEditing && (
                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<CancelIcon />}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
              <Typography variant="h5" gutterBottom>
                Quick Stats
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      bgcolor: theme.palette.primary.light,
                      color: theme.palette.primary.contrastText,
                    }}
                  >
                    <Typography variant="h4">150</Typography>
                    <Typography variant="body2">Total Users</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      bgcolor: theme.palette.secondary.light,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    <Typography variant="h4">45</Typography>
                    <Typography variant="body2">Active Projects</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminProfile; 