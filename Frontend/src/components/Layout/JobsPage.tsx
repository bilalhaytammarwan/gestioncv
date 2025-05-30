import React, { useState } from 'react';
import { Container } from '@mui/material';
import SearchBar from './SearchBar';
import JobList from '../JobList/JobList';

const JobsPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (newQuery: string, newLocation: string) => {
    setQuery(newQuery);
    setLocation(newLocation);
  };

  return (
    <Container sx={{ py: 4 }}>
      <SearchBar onSearch={handleSearch} />
      <JobList searchQuery={query} locationFilter={location} />
    </Container>
  );
};

export default JobsPage;
