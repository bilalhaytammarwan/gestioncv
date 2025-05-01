import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { Briefcase } from 'lucide-react';
import JobApplicationForm from './components/JobApplicationForm';
import { FormProvider } from './context/FormContext';
import theme from './theme/theme';

function Detailskills() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          pt: 4,
          pb: 8
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Briefcase size={32} color={theme.palette.primary.main} />
          <Box component="span" sx={{ 
            ml: 1.5, 
            fontSize: '1.8rem', 
            fontWeight: 700, 
            color: theme.palette.primary.main 
          }}>Skills Form</Box>
        </Box>
        
        <FormProvider>
          <JobApplicationForm />
        </FormProvider>
      </Box>
    </ThemeProvider>
  );
}

export default Detailskills;