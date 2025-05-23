import React from 'react';
import { 
  Grid, Box, Typography, Paper, Divider, useTheme, 
  List, ListItem, ListItemText, ListItemAvatar, Avatar, 
  Button 
} from '@mui/material';
import { 
  Building2, Users, Megaphone, TrendingUp, 
  UserCheck, AlertTriangle, CheckCheck
} from 'lucide-react';
import StatsCard from '../components/common/StatsCard';
import { mockCompanies, mockClients, mockAnnouncements, mockStats } from '../utils/mockData';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  
  const pendingCompanies = mockCompanies.filter(company => company.status === 'pending');
  const pendingAnnouncements = mockAnnouncements.filter(announcement => announcement.status === 'pending');
  
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 700 }}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Companies"
            value={mockStats.totalCompanies}
            icon={<Building2 size={24} />}
            change={{ value: 8, isPositive: true }}
            color="primary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Clients"
            value={mockStats.totalClients}
            icon={<Users size={24} />}
            change={{ value: 12, isPositive: true }}
            color="secondary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Active Companies"
            value={mockStats.activeCompanies}
            icon={<UserCheck size={24} />}
            change={{ value: 4, isPositive: true }}
            color="success"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Pending Announcements"
            value={mockStats.pendingAnnouncements}
            icon={<Megaphone size={24} />}
            change={{ value: 2, isPositive: false }}
            color="warning"
          />
        </Grid>
        
        {/* Pending Companies */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: '0 0 10px rgba(0,0,0,0.05)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Pending Companies
              </Typography>
              
              <Button
                variant="outlined"
                size="small"
                endIcon={<TrendingUp size={16} />}
                href="/companies"
              >
                View All
              </Button>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <List>
              {pendingCompanies.length > 0 ? (
                pendingCompanies.map((company) => (
                  <ListItem key={company.id} alignItems="flex-start" disablePadding sx={{ mb: 2 }}>
                    <ListItemAvatar>
                      <Avatar 
                        src={company.logo} 
                        sx={{ width: 48, height: 48, mr: 2 }}
                      >
                        {company.companyName.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2" fontWeight={600}>
                          {company.companyName}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary" component="span">
                            {company.industry} • {company.location}
                          </Typography>
                          <Box sx={{ display: 'flex', mt: 1 }}>
                            <Button 
                              variant="contained" 
                              size="small" 
                              color="success"
                              sx={{ mr: 1, minWidth: 'auto' }}
                            >
                              <CheckCheck size={16} />
                            </Button>
                            <Button 
                              variant="contained" 
                              size="small" 
                              color="error"
                              sx={{ minWidth: 'auto' }}
                            >
                              <AlertTriangle size={16} />
                            </Button>
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                  No pending companies
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>
        
        {/* Pending Announcements */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: '0 0 10px rgba(0,0,0,0.05)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Pending Announcements
              </Typography>
              
              <Button
                variant="outlined"
                size="small"
                endIcon={<TrendingUp size={16} />}
                href="/announcements/company"
              >
                View All
              </Button>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <List>
              {pendingAnnouncements.length > 0 ? (
                pendingAnnouncements.map((announcement) => (
                  <ListItem key={announcement.id} alignItems="flex-start" disablePadding sx={{ mb: 2 }}>
                    <ListItemAvatar>
                      <Avatar 
                        sx={{ 
                          width: 48, 
                          height: 48, 
                          mr: 2, 
                          backgroundColor: announcement.source === 'company' ? 'primary.main' : 'secondary.main' 
                        }}
                      >
                        {announcement.sourceName.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2" fontWeight={600}>
                          {announcement.title}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            component="span"
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              mb: 1
                            }}
                          >
                            {announcement.content}
                          </Typography>
                          <Box sx={{ display: 'flex', mt: 1 }}>
                            <Button 
                              variant="contained" 
                              size="small" 
                              color="success"
                              sx={{ mr: 1, minWidth: 'auto' }}
                            >
                              <CheckCheck size={16} />
                            </Button>
                            <Button 
                              variant="contained" 
                              size="small" 
                              color="error"
                              sx={{ minWidth: 'auto' }}
                            >
                              <AlertTriangle size={16} />
                            </Button>
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                  No pending announcements
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;