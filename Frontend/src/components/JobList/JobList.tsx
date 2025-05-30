import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Pagination, CircularProgress,
  Button, useMediaQuery, useTheme
} from '@mui/material';
import { SlidersHorizontal } from 'lucide-react';
import JobCard from './JobCard';
import JobFilters from './JobFilters';
import { SubJob } from '../../data/jobsData';
import axios from 'axios';

interface JobListProps {
  searchQuery?: string;
  locationFilter?: string;
  page?: number;
}

const JobList: React.FC<JobListProps> = ({ searchQuery = '', locationFilter = ''}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<SubJob[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  // --->
  const [activeFilters, setActiveFilters] = useState({
    jobTypes: [] as string[],
    datePosted: '',
    salaryRange: '',
    experienceLevel: [] as string[],
  });
  // <---
  //
  const handleFilterChange = (filters: typeof activeFilters) => {
    setActiveFilters(filters);
    setPage(1);
  };
  //
  const handleSaveToggle = (id: string) => {
    setJobs(jobs.map(job =>
      job.id === id ? { ...job, isSaved: !job.isSaved } : job
    ));
  };
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [totalJobs, setTotalJobs] = useState(jobs.length); //---> <---
  const totalPages = Math.ceil(totalJobs / itemsPerPage);
  const currentJobs = jobs.slice(0, 5);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:8448/api/opportunity/search', {
          keyword: searchQuery,
          location: locationFilter,
          pageSize: itemsPerPage,
          page:page,
        });
        const capitalizeWords = (str: string): string =>
          str.toLowerCase().toLowerCase().replace(/\b\w/g, char => char.toUpperCase());

        const jobTypeMap: Record<string, SubJob['jobType']> = {
          FULL_TIME: 'Full-Time',
          PART_TIME: 'Part-Time',
          PERMANENT: 'Permanent',
          TEMPORARY: 'Temporary',
          CONTRACT: 'Contract',
          FREELANCE_CONTRACT: 'Freelance-Contract',
          INTERNSHIP: 'Internship',
          APPRENTICESHIP: 'Apprenticeship',
        };

        const formatJobType = (jobType: keyof typeof jobTypeMap): SubJob['jobType'] => {
          return jobTypeMap[jobType] || jobType;
        };

        const getDaysAgo = (createdAt: string | Date): number => {
          return Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24));
        };

        const formatPostedDate = (createdAt: string | Date): string => {
          const daysAgo = getDaysAgo(createdAt);
          if (daysAgo === 0) return 'Today';
          if (daysAgo === 1) return '1 day ago';
          if (daysAgo < 7) return `${daysAgo} days ago`;
          if (daysAgo < 30) {
            const weeks = Math.floor(daysAgo / 7);
            return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
          }
          if (daysAgo < 365) {
            const months = Math.floor(daysAgo / 30);
            return months === 1 ? '1 month ago' : `${months} months ago`;
          }
          const years = Math.floor(daysAgo / 365);
          return years === 1 ? '1 year ago' : `${years} years ago`;
        };

        const transformedJobs = ((response.data as { opportunitySearchResults: SubJob[] }).opportunitySearchResults).map(job => ({
          ...job,
          title: capitalizeWords(job.title),
          companyName: capitalizeWords(job.companyName),
          createdDate: new Date(job.createdAt).toLocaleDateString(),
          updatedAt: new Date(job.updatedAt).toLocaleDateString(),
          jobType: formatJobType(job.jobType as keyof typeof jobTypeMap),
          applicationDeadline: new Date(job.applicationDeadline).toLocaleDateString(),
          posted: formatPostedDate(job.createdAt),
          isNew: getDaysAgo(job.createdAt) < 6,
        }));
        setTotalJobs((response.data as { total: number }).total);
        setJobs(transformedJobs);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchQuery, locationFilter, activeFilters, page]);

  return (
    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 4 }}>
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

      {!isMobile && (
        <JobFilters onFilterChange={handleFilterChange} />
      )}

      {isMobile && (
        <JobFilters
          onFilterChange={handleFilterChange}
          mobileOpen={filtersOpen}
          onMobileClose={() => setFiltersOpen(false)}
        />
      )}

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
                      size={isMobile ? 'small' : 'medium'}
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
