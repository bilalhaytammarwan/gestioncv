import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import theme from '../../theme/theme';

const Layout: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const handleMobileOpen = () => {
    setIsMobileOpen(true);
  };
  
  const handleMobileClose = () => {
    setIsMobileOpen(false);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        
        <TopBar 
          onToggleDarkMode={handleToggleDarkMode} 
          isDarkMode={isDarkMode} 
        />
        
        <Sidebar 
          isMobileOpen={isMobileOpen}
          onMobileClose={handleMobileClose}
          onMobileOpen={handleMobileOpen}
        />
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - 280px)` },
            ml: { md: '280px' },
            backgroundColor: 'background.default',
            minHeight: '100vh',
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;