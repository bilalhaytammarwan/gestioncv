import React, { useState } from 'react';
import { 
  Box, Typography, Grid, MenuItem, FormControl, Select, 
  InputLabel, SelectChangeEvent 
} from '@mui/material';
import AnnouncementCard from '../components/common/AnnouncementCard';
import { mockAnnouncements } from '../utils/mockData';

const ClientAnnouncements: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };
  
  const handleApproveAnnouncement = (id: string) => {
    console.log(`Approve announcement with ID: ${id}`);
  };
  
  const handleRejectAnnouncement = (id: string) => {
    console.log(`Reject announcement with ID: ${id}`);
  };
  
  const handleViewAnnouncement = (id: string) => {
    console.log(`View announcement with ID: ${id}`);
  };
  
  // Filter announcements by client source and optional status
  const filteredAnnouncements = mockAnnouncements
    .filter(announcement => announcement.source === 'client')
    .filter(announcement => statusFilter === 'all' ? true : announcement.status === statusFilter);
  
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: { xs: 2, sm: 0 } }}>
          Client Announcements
        </Typography>
        
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="status-filter-label">Filter by Status</InputLabel>
          <Select
            labelId="status-filter-label"
            id="status-filter"
            value={statusFilter}
            onChange={handleStatusFilterChange}
            label="Filter by Status"
          >
            <MenuItem value="all">All Announcements</MenuItem>
            <MenuItem value="published">Published</MenuItem>
            <MenuItem value="pending">Pending Approval</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Grid container spacing={3}>
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement) => (
            <Grid item xs={12} sm={6} md={4} key={announcement.id}>
              <AnnouncementCard
                announcement={announcement}
                onApprove={announcement.status === 'pending' ? handleApproveAnnouncement : undefined}
                onReject={announcement.status === 'pending' ? handleRejectAnnouncement : undefined}
                onView={handleViewAnnouncement}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary" align="center" sx={{ py: 5 }}>
              No client announcements found with the selected filters.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ClientAnnouncements;