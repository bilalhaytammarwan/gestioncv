import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  InputBase, 
  IconButton, 
  Divider, 
  Select, 
  MenuItem, 
  Button,
  useTheme,
  useMediaQuery,
  SelectChangeEvent,
  FormControl,
  InputLabel
} from '@mui/material';
import { Search, MapPin } from 'lucide-react';
import { locations } from '../../data/jobsData';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const nav=useNavigate();

  const handleLocationChange = (event: SelectChangeEvent<string>) => {
    setLocation(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery, location);
  };
  const handleskills=()=>{
nav("/detailskills")
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        width: '100%',
        borderRadius: '12px',
        backgroundColor: 'white',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flex: 2,
          width: isMobile ? '100%' : 'auto',
          mb: isMobile ? 2 : 0,
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <Search size={20} />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Job title, keywords, or company"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          fullWidth
        />
      </Box>

      {!isMobile && <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />}
      
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          width: isMobile ? '100%' : 'auto',
          mb: isMobile ? 2 : 0,
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="location">
          <MapPin size={20} />
        </IconButton>
        <FormControl fullWidth variant="standard" sx={{ ml: 1 }}>
          <Select
            displayEmpty
            value={location}
            onChange={handleLocationChange}
            input={<InputBase />}
            renderValue={(selected) => {
              if (!selected) {
                return <em>Location</em>;
              }
              return selected;
            }}
          >
            <MenuItem value="">
              <em>All Locations</em>
            </MenuItem>
            {locations.map((loc) => (
              <MenuItem key={loc} value={loc}>
                {loc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Button 
        variant="contained" 
        color="primary"
        onClick={handleSearch}
        sx={{ 
          minWidth: isMobile ? '100%' : '120px',
          py: 1,
          ml: isMobile ? 0 : 2
        }}
      >
        Find Jobs
      </Button>
      <Button 
        variant="contained" 
        color="primary"
        onClick={handleskills}
        sx={{ 
          minWidth: isMobile ? '100%' : '120px',
          py: 1,
          ml: isMobile ? 0 : 2
        }}
      >
        Search By Skills
      </Button>
    </Paper>
  );
};

export default SearchBar;