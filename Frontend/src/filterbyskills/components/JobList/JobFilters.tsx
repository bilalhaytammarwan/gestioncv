import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Chip,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton
} from '@mui/material';
import { ChevronDown, FilterX, X } from 'lucide-react';


interface FiltersProps {
  onFilterChange: (filters: {
    jobTypes: string[];
    datePosted: string;
    salaryRange: string;
    experienceLevel: string[];
  }) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const JobFilters: React.FC<FiltersProps> = ({ 
  onFilterChange, 
  mobileOpen = false,
  onMobileClose = () => {}
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [datePosted, setDatePosted] = useState<string>('');
  const [salaryRange, setSalaryRange] = useState<string>('');
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const handleJobTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.name;
    if (selectedJobTypes.includes(value)) {
      setSelectedJobTypes(selectedJobTypes.filter((type) => type !== value));
    } else {
      setSelectedJobTypes([...selectedJobTypes, value]);
    }
  };

  const handleExperienceLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.name;
    if (experienceLevel.includes(value)) {
      setExperienceLevel(experienceLevel.filter((level) => level !== value));
    } else {
      setExperienceLevel([...experienceLevel, value]);
    }
  };

  const applyFilters = () => {
    const filters = {
      jobTypes: selectedJobTypes,
      datePosted,
      salaryRange,
      experienceLevel,
    };
    
    const count = 
      selectedJobTypes.length + 
      (datePosted ? 1 : 0) + 
      (salaryRange ? 1 : 0) + 
      experienceLevel.length;
    
    setActiveFiltersCount(count);
    onFilterChange(filters);
    
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  const clearFilters = () => {
    setSelectedJobTypes([]);
    setDatePosted('');
    setSalaryRange('');
    setExperienceLevel([]);
    setActiveFiltersCount(0);
    
    onFilterChange({
      jobTypes: [],
      datePosted: '',
      salaryRange: '',
      experienceLevel: [],
    });
  };

  const filtersContent = (
    <Box sx={{ p: isMobile ? 3 : 0 }}>
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={onMobileClose}>
            <X size={20} />
          </IconButton>
        </Box>
      )}
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="600" gutterBottom>
          Job Type
        </Typography>
        
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="600" gutterBottom>
          Date Posted
        </Typography>
        <RadioGroup
          value={datePosted}
          onChange={(e) => setDatePosted(e.target.value)}
        >
          <FormControlLabel value="past24Hours" control={<Radio />} label="Past 24 hours" />
          <FormControlLabel value="past3Days" control={<Radio />} label="Past 3 days" />
          <FormControlLabel value="pastWeek" control={<Radio />} label="Past week" />
          <FormControlLabel value="pastMonth" control={<Radio />} label="Past month" />
          <FormControlLabel value="anytime" control={<Radio />} label="Anytime" />
        </RadioGroup>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="600" gutterBottom>
          Salary Range
        </Typography>
       
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="600" gutterBottom>
          Experience Level
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={experienceLevel.includes('Entry level')}
                name="Entry level"
                onChange={handleExperienceLevelChange}
              />
            }
            label="Entry level"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={experienceLevel.includes('Mid level')}
                name="Mid level"
                onChange={handleExperienceLevelChange}
              />
            }
            label="Mid level"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={experienceLevel.includes('Senior level')}
                name="Senior level"
                onChange={handleExperienceLevelChange}
              />
            }
            label="Senior level"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={experienceLevel.includes('Director')}
                name="Director"
                onChange={handleExperienceLevelChange}
              />
            }
            label="Director"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={experienceLevel.includes('Executive')}
                name="Executive"
                onChange={handleExperienceLevelChange}
              />
            }
            label="Executive"
          />
        </FormGroup>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<FilterX size={18} />}
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={applyFilters}
        >
          Apply Filters
        </Button>
      </Box>
    </Box>
  );

  // For mobile view with drawer
  if (isMobile) {
    return (
      <>
        <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label={`Filters (${activeFiltersCount})`}
            color={activeFiltersCount > 0 ? "primary" : "default"}
            onClick={onMobileClose}
            variant={activeFiltersCount > 0 ? "filled" : "outlined"}
          />
          {selectedJobTypes.map((type) => (
            <Chip key={type} label={type} onDelete={() => {
              setSelectedJobTypes(selectedJobTypes.filter(t => t !== type));
              applyFilters();
            }} />
          ))}
          {datePosted && (
            <Chip 
              label={`Posted: ${datePosted.replace(/past|Past/, '')}`} 
              onDelete={() => {
                setDatePosted('');
                applyFilters();
              }} 
            />
          )}
        </Box>
        
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={onMobileClose}
          PaperProps={{
            sx: {
              width: '85%',
              maxWidth: '360px',
            }
          }}
        >
          {filtersContent}
        </Drawer>
      </>
    );
  }

  // For desktop view
  return (
    <Box sx={{ minWidth: 280, maxWidth: 300 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Filters
      </Typography>
      {filtersContent}
    </Box>
  );
};

export default JobFilters;