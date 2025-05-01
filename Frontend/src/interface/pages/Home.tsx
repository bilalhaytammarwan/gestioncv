import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Chip,
  Grid,
  Button,
  useTheme
} from '@mui/material';
import { TrendingUp } from 'lucide-react';
import SearchBar from '../components/Layout/SearchBar';
import JobList from '../components/JobList/JobList';

const Home: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setLocationFilter(location);
    
    // In a real app, you might want to update the URL or fetch data from an API
    console.log('Searching for:', query, 'in', location);
  };

  const popularSearches = [
    'Software Engineer',
    'Data Scientist',
    'Product Manager',
    'UX Designer',
    'Marketing Specialist',
  ];

  return (
    <Box>
      {/* Header Section with Search */}
      <Box 
        sx={{ 
          backgroundColor: theme.palette.primary.main,
          py: { xs: 4, md: 6 },
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              mb: 1,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Find Your Dream Job
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Discover thousands of job opportunities with all the information you need.
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <SearchBar onSearch={handleSearch} />
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="body2" sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
              Popular searches:
            </Typography>
            {popularSearches.map((term) => (
              <Chip 
                key={term} 
                label={term}
                onClick={() => handleSearch(term, '')}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  }
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* Trending Job Categories */}
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <TrendingUp size={24} color={theme.palette.primary.main} />
          <Typography variant="h5" component="h2" sx={{ ml: 1, fontWeight: 600 }}>
            Trending Job Categories
          </Typography>
        </Box>
        
        <Grid container spacing={2} sx={{ mb: 6 }}>
          <Grid item xs={6} sm={4} md={3}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                textAlign: 'center',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: 3,
                  backgroundColor: theme.palette.primary.light,
                  color: 'white',
                },
              }}
            >
              <Typography variant="h6">Technology</Typography>
              <Typography variant="body2" color="text.secondary">
                1,240 jobs
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                textAlign: 'center',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: 3,
                  backgroundColor: theme.palette.primary.light,
                  color: 'white',
                },
              }}
            >
              <Typography variant="h6">Finance</Typography>
              <Typography variant="body2" color="text.secondary">
                840 jobs
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                textAlign: 'center',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: 3,
                  backgroundColor: theme.palette.primary.light,
                  color: 'white',
                },
              }}
            >
              <Typography variant="h6">Healthcare</Typography>
              <Typography variant="body2" color="text.secondary">
                954 jobs
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                textAlign: 'center',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: 3,
                  backgroundColor: theme.palette.primary.light,
                  color: 'white',
                },
              }}
            >
              <Typography variant="h6">Marketing</Typography>
              <Typography variant="body2" color="text.secondary">
                532 jobs
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Job Listings Section */}
        <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Featured Jobs
        </Typography>
        <JobList searchQuery={searchQuery} locationFilter={locationFilter} />
        
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="outlined" color="primary" size="large">
            View All Jobs
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;