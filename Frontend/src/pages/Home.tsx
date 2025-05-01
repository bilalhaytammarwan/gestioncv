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
import { groupingMap } from '../data/jobsData';

const Home: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof groupingMap | ''>('');
  const [showAllJobs, setShowAllJobs] = useState(false);

  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setLocationFilter(location);
    setSelectedCategory(''); // Clear category when searching
    setShowAllJobs(false); // Reset show all when searching
  };

  const handleCategoryClick = (category: keyof typeof groupingMap) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
    setSearchQuery(''); // Clear search when selecting category
    setLocationFilter(''); // Clear location when selecting category
    setShowAllJobs(false); // Reset show all when selecting category
  };

  const handleViewAllJobs = () => {
    setShowAllJobs(true);
    setSelectedCategory('');
    setSearchQuery('');
    setLocationFilter('');
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
          {Object.entries(groupingMap).map(([category, keywords]) => (
            <Grid item xs={6} sm={4} md={3} key={category}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  textAlign: 'center',
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: selectedCategory === category 
                    ? theme.palette.primary.main 
                    : 'transparent',
                  color: selectedCategory === category 
                    ? 'white' 
                    : 'inherit',
                  '&:hover': {
                    boxShadow: 3,
                    backgroundColor: theme.palette.primary.light,
                    color: 'white',
                  },
                }}
                onClick={() => handleCategoryClick(category as keyof typeof groupingMap)}
              >
                <Typography variant="h6">{category}</Typography>
                <Typography 
                  variant="body2" 
                  color={selectedCategory === category ? 'white' : 'text.secondary'}
                >
                  {keywords.length} keywords
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Job Listings Section */}
        <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          {selectedCategory ? `${selectedCategory} Jobs` : 'Featured Jobs'}
        </Typography>
        <JobList 
          searchQuery={searchQuery} 
          locationFilter={locationFilter}
          categoryFilter={selectedCategory}
          showAll={showAllJobs}
        />
        
        {!showAllJobs && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large"
              onClick={handleViewAllJobs}
            >
              View All Jobs
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Home;