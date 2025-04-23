import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider, useTheme } from '@mui/material';
import { Briefcase as BriefcaseBusiness } from 'lucide-react';

const Footer: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BriefcaseBusiness size={24} color={theme.palette.primary.main} />
              <Typography
                variant="h6"
                component="div"
                sx={{ ml: 1, fontWeight: 700, color: theme.palette.primary.main }}
              >
                JobFinder
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Find your dream job and advance your career with JobFinder's powerful job search tools.
            </Typography>
          </Grid>
          
          <Grid item xs={6} sm={2} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              For Job Seekers
            </Typography>
            <Link href="#" variant="body2" display="block" color="text.secondary" sx={{ mb: 1 }}>
              Browse Jobs
            </Link>
            <Link href="#" variant="body2" display="block" color="text.secondary" sx={{ mb: 1 }}>
              Company Reviews
            </Link>
            <Link href="#" variant="body2" display="block" color="text.secondary" sx={{ mb: 1 }}>
              Salary Calculator
            </Link>
            <Link href="#" variant="body2" display="block" color="text.secondary" sx={{ mb: 1 }}>
              Career Advice
            </Link>
          </Grid>
          
          <Grid item xs={6} sm={2} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              For Employers
            </Typography>
            <Link href="#" variant="body2" display="block" color="text.secondary" sx={{ mb: 1 }}>
              Post a Job
            </Link>
            <Link href="#" variant="body2" display="block" color="text.secondary" sx={{ mb: 1 }}>
              Hiring Solutions
            </Link>
            <Link href="#" variant="body2" display="block" color="text.secondary" sx={{ mb: 1 }}>
              Recruiting
            </Link>
            <Link href="#" variant="body2" display="block" color="text.secondary" sx={{ mb: 1 }}>
              Pricing
            </Link>
          </Grid>
          
          <Grid item xs={6} sm={2} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Resources
            </Typography>
            <Link href="#" variant="body2" display="block" color="text.secondary" sx={{ mb: 1 }}>
              Help Center
            </Link>
            <Link href="#" variant="body2" display="block" color="text.secondary" sx={{ mb: 1 }}>
              Guides
            </Link>
            <Link href="#" variant="body2" display="block" color="text.secondary" sx={{ mb: 1 }}>
              Blog
            </Link>
            <Link href="#" variant="body2" display="block" color="text.secondary" sx={{ mb: 1 }}>
              Success Stories
            </Link>
          </Grid>
          
          <Grid item xs={6} sm={2} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Company
            </Typography>
            <Link href="#" variant="body2" display="block" color="text.secondary" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link href="#" variant="body2" display="block" color="text.secondary" sx={{ mb: 1 }}>
              Careers
            </Link>
            <Link href="#" variant="body2" display="block" color="text.secondary" sx={{ mb: 1 }}>
              Press
            </Link>
            <Link href="#" variant="body2" display="block" color="text.secondary" sx={{ mb: 1 }}>
              Contact Us
            </Link>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} JobFinder. All rights reserved.
            </Typography>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="#" variant="body2" color="text.secondary">
                Privacy Policy
              </Link>
              <Link href="#" variant="body2" color="text.secondary">
                Terms of Service
              </Link>
              <Link href="#" variant="body2" color="text.secondary">
                Accessibility
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;