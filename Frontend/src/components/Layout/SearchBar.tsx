import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  IconButton,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
  FormControl,
  TextField,
  Autocomplete,
  Popper,
  Typography,
} from '@mui/material';
import { Search, MapPin } from 'lucide-react';
import axios from 'axios';

const useDebouncedValue = (value: string, delay = 300): string => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
};

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
}

const CustomPopper = (props: React.ComponentProps<typeof Popper>) => {
  return <Popper {...props} placement="bottom-start" />;
};


const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [keywordOptions, setKeywordOptions] = useState<string[]>([]);
  const [locationOptions, setLocationOptions] = useState<string[]>([]);

  const debouncedSearchQuery = useDebouncedValue(searchQuery);
  const debouncedLocation = useDebouncedValue(location);

  const boldMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <strong key={index}>{part}</strong>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  useEffect(() => {
    const fetchKeywordSuggestions = async () => {
      if (!debouncedSearchQuery.trim()) {
        setKeywordOptions([]);
        return;
      }
      try {
        const response = await axios.post<string[]>(
          `http://localhost:8448/api/opportunity/keywordAutocomplete/${encodeURIComponent(debouncedSearchQuery)}`
        );
        setKeywordOptions(response.data.slice(0, 10));
      } catch (error) {
        console.error('Failed to fetch keyword suggestions', error);
      }
    };

    fetchKeywordSuggestions();
  }, [debouncedSearchQuery]);

  useEffect(() => {
    const fetchLocationSuggestions = async () => {
      if (!debouncedLocation.trim()) {
        setLocationOptions([]);
        return;
      }
      try {
        const response = await axios.post(
          `http://localhost:8448/api/opportunity/locationAutocomplete/${encodeURIComponent(debouncedLocation)}`
        );
        setLocationOptions((response.data as string[]).slice(0, 10));
      } catch (error) {
        console.error('Failed to fetch location suggestions', error);
      }
    };

    fetchLocationSuggestions();
  }, [debouncedLocation]);

  const handleSearch = () => {
    onSearch(searchQuery, location);
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
        overflow: 'visible',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flex: 2,
          width: isMobile ? '100%' : 'auto',
          mb: isMobile ? 2 : 0,
          position: 'relative',
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <Search size={20} />
        </IconButton>

        <Autocomplete
          freeSolo
          id="job-search-autocomplete"
          disableClearable
          options={keywordOptions}
          PopperComponent={CustomPopper}
          fullWidth
          value={searchQuery}
          onChange={(event, newValue) => setSearchQuery(newValue)}
          onInputChange={(event, newInputValue) => setSearchQuery(newInputValue)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              const autocomplete = document.getElementById('job-search-autocomplete');
              if (autocomplete?.getAttribute('aria-expanded') === 'false') {
                handleSearch();
              }
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              placeholder="Job title, keywords, or company"
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
              }}
              sx={{
                '& .MuiInputBase-root': {
                  padding: '0px',
                },
                '& .MuiInputBase-input': {
                  padding: '8px 0',
                },
              }}
            />
          )}
          renderOption={(props, option) => {
            const { key, ...rest } = props;
            return (
              <li key={key} {...rest}>
                <Typography variant="body1">{boldMatch(option, searchQuery)}</Typography>
              </li>
            );
          }}
          sx={{
            width: '100%',
            '& .MuiAutocomplete-inputRoot': {
              paddingLeft: '0 !important',
            },
            '& .MuiAutocomplete-endAdornment': {
              right: '8px',
            },
          }}
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
          position: 'relative',
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="location">
          <MapPin size={20} />
        </IconButton>

        <FormControl fullWidth variant="standard" sx={{ ml: 1 }}>
          <Autocomplete
            freeSolo
            id="location-autocomplete"
            disableClearable
            options={locationOptions}
            PopperComponent={CustomPopper}
            fullWidth
            value={location}
            onChange={(event, newValue) => setLocation(newValue)}
            onInputChange={(event, newInputValue) => setLocation(newInputValue)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                const autocomplete = document.getElementById('location-autocomplete');
                if (autocomplete?.getAttribute('aria-expanded') === 'false') {
                  handleSearch();
                }
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Location"
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    padding: '0px',
                  },
                  '& .MuiInputBase-input': {
                    padding: '8px 0',
                  },
                }}
              />
            )}
            renderOption={(props, option) => {
              const { key, ...rest } = props;
              return (
                <li key={key} {...rest}>
                <Typography variant="body1">{boldMatch(option, location)}</Typography>
              </li>
              )
            }
            }
            sx={{
              width: '100%',
              '& .MuiAutocomplete-inputRoot': {
                paddingLeft: '0 !important',
              },
              '& .MuiAutocomplete-endAdornment': {
                right: '8px',
              },
            }}
          />
        </FormControl>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{
          minWidth: isMobile ? '100%' : '120px',
          py: 1,
          ml: isMobile ? 0 : 2,
          textTransform: 'none',
          fontSize: '0.95rem',
          fontWeight: 500,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        Find Jobs
      </Button>
    </Paper>
  );
};

export default SearchBar;
