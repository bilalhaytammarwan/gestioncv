import React, { useState, useEffect } from 'react';
import { Box, Typography, Pagination, CircularProgress, Button, useMediaQuery, useTheme } from '@mui/material';
import { SlidersHorizontal } from 'lucide-react';
import JobCard from './JobCard';
import JobFilters from './JobFilters';
import { jobsData, Job, groupingMap } from '../../data/jobsData';
import { filterByJobType, filterBySalaryRange, filterByCategory } from '../../filters/Filter';
import axios from 'axios';

interface JobListProps {
  searchQuery?: string;
  locationFilter?: string;
  categoryFilter?: keyof typeof groupingMap | '';
  showAll?: boolean;
}

const JobList: React.FC<JobListProps> = ({ 
  searchQuery = '', 
  locationFilter = '', 
  categoryFilter = '',
  showAll = false 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({
    jobTypes: [] as ('Full-time' | 'Part-time' | 'Contract' | 'Remote')[],
    datePosted: '',
    salaryRange: [] as number[],
    experienceLevel: [] as ('Executive' | 'Director' | 'Senior level' | 'Mid level' | 'Entry level')[]
  });

  const itemsPerPage = showAll ? Number.MAX_SAFE_INTEGER : 5;

  useEffect(() => {
    async function getAllJobs(){
      const jobs:Job[] = (await axios.get("http://localhost:8090/api/annonce/all")).data
      return jobs;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      const fetchedJobs = await getAllJobs().then(
        (data)=>{
          console.log(data)
          return data
        }
      );
      let filteredJobs = [...fetchedJobs];
      
      // Apply category filter if selected
      if (categoryFilter) {
        filteredJobs = filterByCategory({
          jobList: filteredJobs,
          filterValue: categoryFilter
        });
      }
      
      // Only apply search if there is a query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filteredJobs = filteredJobs.filter(job => 
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query)
        );
      }
      
      // Only apply location filter if a location is selected
      if (locationFilter.trim()) {
        filteredJobs = filteredJobs.filter(job => job.location === locationFilter);
      }

      // Only apply job type filter if types are selected
      if (activeFilters.jobTypes.length > 0) {
        filteredJobs = filterByJobType({
          jobList: filteredJobs,
          filterValue: activeFilters.jobTypes
        });
      }
      
      // Only apply salary range filter if both min and max are set
      if (activeFilters.salaryRange?.length === 2) {
        filteredJobs = filterBySalaryRange(
          filteredJobs, 
          activeFilters.salaryRange[0], 
          activeFilters.salaryRange[1]
        );
      }

      // Only apply experience filter if levels are selected
      if (activeFilters.experienceLevel.length > 0) {
        filteredJobs = filteredJobs.filter(job => 
          activeFilters.experienceLevel.includes(job.level)
        );
      }
      
      setJobs(filteredJobs);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [searchQuery, locationFilter, activeFilters, categoryFilter]);

  const handleFilterChange = (filters: typeof activeFilters) => {
    setActiveFilters(filters);
    setPage(1); // Reset to first page when filters change
  };

  const handleSaveToggle = (id: string) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, isSaved: !job.isSaved } : job
    ));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
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
                  <JobCard key={job.id} job={job} onSaveToggle={handleSaveToggle} />
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