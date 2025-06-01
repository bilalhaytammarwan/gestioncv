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

      <Container maxWidth="lg" sx={{ my: 6 }}>

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