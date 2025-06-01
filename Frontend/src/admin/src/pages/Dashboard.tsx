import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
const Dashboardadmin: React.FC = () => {
  const theme = useTheme();
  const [annonce,setannonce]=useState<string|number|undefined>();
   const [approve,setapprove]=useState<string|number|undefined>();
   const [client,setclient]=useState<string|number|undefined>();
   const [company,setcompany]=useState<string|number|undefined>();
  const pendingCompanies = mockCompanies.filter(company => company.status === 'pending');
  const pendingAnnouncements = mockAnnouncements.filter(announcement => announcement.status === 'pending');
  
  useEffect(() => {
      const fetchUser = async () => {
        try {
          const responseannounce = await axios.get<string|number|undefined>(`http://localhost:8338/api/opportunity/get/total/annoucement`);
          const responseapprovecompany = await axios.get<string|number|undefined>(`http://localhost:8228/api/user/get/total/company/approve`);
           const responeclient = await axios.get<string|number|undefined>(`http://localhost:8228/api/user/get/total/client`);
            const responsecompany = await axios.get<string|number|undefined>(`http://localhost:8228/api/user/get/total/company`);
          setannonce(responseannounce.data);
          setapprove(responseapprovecompany.data);
          setcompany(responsecompany.data);
          setclient(responeclient.data);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        } 
      };
  
      fetchUser();
    }, []);
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
            value={company ?? 0}
            icon={<Building2 size={24} />}
            change={{ value: 8, isPositive: true }}
            color="primary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Clients"
            value={client ?? 0}
            icon={<Users size={24} />}
            change={{ value: 12, isPositive: true }}
            color="secondary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Active Companies"
            value={approve ?? 0}
            icon={<UserCheck size={24} />}
            change={{ value: 4, isPositive: true }}
            color="success"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Announcements"
           value={annonce ?? 0}
            icon={<Megaphone size={24} />}
            change={{ value: 2, isPositive: false }}
            color="warning"
          />
        </Grid>
        
        
        
      
        
      </Grid>
    </Box>
  );
};

export default Dashboardadmin;