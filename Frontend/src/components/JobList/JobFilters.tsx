import React, { FC, useState } from 'react';
import { Box, Drawer, FormGroup, FormControlLabel, Checkbox, Typography, Slider, IconButton, Button } from '@mui/material';
import { X } from 'lucide-react';
import { jobTypes, ExpLevel } from '../../data/jobsData';

interface JobFiltersProps {
  onFilterChange: (filters: {
    jobTypes: ('Full-time' | 'Part-time' | 'Contract' | 'Remote')[];
    datePosted: string;
    salaryRange: number[];
    experienceLevel: ('Executive' | 'Director' | 'Senior level' | 'Mid level' | 'Entry level')[];
  }) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const JobFilters: FC<JobFiltersProps> = ({ onFilterChange, mobileOpen = false, onMobileClose }) => {
  const [selectedJobTypes, setSelectedJobTypes] = useState<('Full-time' | 'Part-time' | 'Contract' | 'Remote')[]>([]);
  const [selectedDatePosted, setSelectedDatePosted] = useState('');
  const [salaryRange, setSalaryRange] = useState<number[]>([0, 200000]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = 
    useState<('Executive' | 'Director' | 'Senior level' | 'Mid level' | 'Entry level')[]>([]);

  const handleJobTypeChange = (type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote') => {
    const newJobTypes = selectedJobTypes.includes(type) 
      ? selectedJobTypes.filter(t => t !== type)
      : [...selectedJobTypes, type];
    setSelectedJobTypes(newJobTypes);
    onFilterChange({
      jobTypes: newJobTypes,
      datePosted: selectedDatePosted,
      salaryRange,
      experienceLevel: selectedExperienceLevels,
    });
  };

  const handleExperienceLevelChange = (level: 'Executive' | 'Director' | 'Senior level' | 'Mid level' | 'Entry level') => {
    const newLevels = selectedExperienceLevels.includes(level)
      ? selectedExperienceLevels.filter(l => l !== level)
      : [...selectedExperienceLevels, level];
    setSelectedExperienceLevels(newLevels);
    onFilterChange({
      jobTypes: selectedJobTypes,
      datePosted: selectedDatePosted,
      salaryRange,
      experienceLevel: newLevels,
    });
  };

  const handleSalaryRangeChange = (newRange: number[]) => {
    setSalaryRange(newRange);
    onFilterChange({
      jobTypes: selectedJobTypes,
      datePosted: selectedDatePosted,
      salaryRange: newRange,
      experienceLevel: selectedExperienceLevels,
    });
  };

  const handleResetFilters = () => {
    setSelectedJobTypes([]);
    setSelectedDatePosted('');
    setSalaryRange([0, 200000]);
    setSelectedExperienceLevels([]);
    onFilterChange({
      jobTypes: [],
      datePosted: '',
      salaryRange: [0, 200000],
      experienceLevel: [],
    });
  };

  const filterContent = (
    <Box sx={{ p: 3, width: 280 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>Job Type</Typography>
        <FormGroup>
          {jobTypes.map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox 
                  checked={selectedJobTypes.includes(type as 'Full-time' | 'Part-time' | 'Contract' | 'Remote')}
                  onChange={() => handleJobTypeChange(type as 'Full-time' | 'Part-time' | 'Contract' | 'Remote')}
                />
              }
              label={type}
            />
          ))}
        </FormGroup>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>Experience Level</Typography>
        <FormGroup>
          {ExpLevel.map((level) => (
            <FormControlLabel
              key={level}
              control={
                <Checkbox 
                  checked={selectedExperienceLevels.includes(level as 'Executive' | 'Director' | 'Senior level' | 'Mid level' | 'Entry level')}
                  onChange={() => handleExperienceLevelChange(level as 'Executive' | 'Director' | 'Senior level' | 'Mid level' | 'Entry level')}
                />
              }
              label={level}
            />
          ))}
        </FormGroup>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>Salary Range</Typography>
        <Box sx={{ px: 1 }}>
          <Slider
            value={salaryRange}
            onChange={(_, newValue) => handleSalaryRangeChange(newValue as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={200000}
            step={10000}
            valueLabelFormat={(value) => `$${value.toLocaleString()}`}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              ${salaryRange[0].toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${salaryRange[1].toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Reset Button */}
      <Box sx={{ mt: 4 }}>
        <Button 
          variant="outlined" 
          color="secondary" 
          fullWidth 
          onClick={handleResetFilters}
        >
          Reset Filters
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop view */}
      {!mobileOpen && (
        <Box
          sx={{
            width: 280,
            flexShrink: 0,
            display: { xs: 'none', md: 'block' }
          }}
        >
          {filterContent}
        </Box>
      )}

      {/* Mobile view */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={onMobileClose}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: 280 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={onMobileClose}>
            <X size={24} />
          </IconButton>
        </Box>
        {filterContent}
      </Drawer>
    </>
  );
};

export default JobFilters;