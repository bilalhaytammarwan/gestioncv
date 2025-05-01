import React, { useState, useEffect } from 'react';
import { Box, Typography, Pagination, CircularProgress, Button, useMediaQuery, useTheme } from '@mui/material';
import { SlidersHorizontal } from 'lucide-react';
import JobCard from './JobCard';
import JobFilters from './JobFilters';
import { jobsData, Job } from '../../data/jobsData';
import { useParams } from 'react-router-dom';

interface JobListProps {
  searchQuery?: string;
  locationFilter?: string;
}

const JobList: React.FC<JobListProps> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({
    jobTypes: [] as string[],
    datePosted: '',
    salaryRange: '',
    experienceLevel: [] as string[],
  });

  const itemsPerPage = 5;
  
  const { id } = useParams();
 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobsData(id!);
        setJobs(data);
        setLoading(false); // Add this line
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, [id]);
  const handleFilterChange = (filters: typeof activeFilters) => {
    setActiveFilters(filters);
    setPage(1); // Reset to first page when filters change
  };

 

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pagination
  const totalJobs = jobs.length;
  const totalPages = Math.ceil(totalJobs / itemsPerPage);
  const currentJobs = jobs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 4 }}>
      {/* Filters button for mobile */}
      {isMobile && (
        <Button
          variant="outlined"
          startIcon={<SlidersHorizontal size={18} />}
          onClick={() => setFiltersOpen(true)}
          sx={{ mb: 2 }}
        >
          Filters
        </Button>
      )}
      
      {/* Filters - for desktop they're always visible */}
      {!isMobile && (
        <JobFilters onFilterChange={handleFilterChange} />
      )}

      {/* Mobile filters */}
      {isMobile && (
        <JobFilters 
          onFilterChange={handleFilterChange} 
          mobileOpen={filtersOpen} 
          onMobileClose={() => setFiltersOpen(false)} 
        />
      )}
      
      {/* Job list */}
      <Box sx={{ flex: 1 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                {totalJobs} {totalJobs === 1 ? 'job' : 'jobs'} found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Page {page} of {totalPages || 1}
              </Typography>
            </Box>
            
            {currentJobs.length > 0 ? (
             <>
             {currentJobs.map((job) => (
               <JobCard 
                 key={job.id} 
                 job={job} 
                 
               />
             ))}
             
                
                {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination 
                      count={totalPages} 
                      page={page} 
                      onChange={handlePageChange} 
                      color="primary" 
                      size={isMobile ? "small" : "medium"}
                    />
                  </Box>
                )}
              </>
            ) : (
              <Box sx={{ py: 6, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  No jobs found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search filters or try a different search term.
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default JobList;