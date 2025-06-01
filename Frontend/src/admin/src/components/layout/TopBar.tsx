import React from 'react';
import { 
  AppBar, Toolbar, IconButton, Typography, Box, Badge,
  useTheme, useMediaQuery, Avatar, Menu, MenuItem, Tooltip
} from '@mui/material';
import { Bell, Moon, Sun, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TopBarProps {
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ onToggleDarkMode, isDarkMode }) => {
 const route=useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    route("/admin/profile/681a923dbc5e4b0806cdba7f");
    setAnchorEl(null);
  };
    const navigate = useNavigate();

  const handleClose = () => {
    localStorage.clear(); // or remove specific keys if needed
    navigate('/login'); // Redirect to login page
  }
  
  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  
  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };
  
  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 'none',
        backgroundColor: 'background.paper',
        color: 'text.primary',
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: { md: `calc(100% - 280px)` },
        ml: { md: '280px' },
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          {isDesktop && (
            <Typography variant="h5" color="textPrimary" fontWeight={600}>
              Admin Dashboard
            </Typography>
          )}
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          
         
          <Tooltip title="Account">
            <IconButton
              color="inherit"
              onClick={handleUserMenuOpen}
              sx={{ ml: 1 }}
            >
              <Avatar 
                sx={{ 
                  width: 34, 
                  height: 34, 
                  backgroundColor: 'primary.main',
                  color: 'white'
                }}
              >
                <User size={18} />
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        
        {/* Notifications Menu */}
        <Menu
          id="notifications-menu"
          anchorEl={notificationAnchorEl}
          open={Boolean(notificationAnchorEl)}
          onClose={handleNotificationMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: { 
              width: 320, 
              maxHeight: 500,
              p: 1
            }
          }}
        >
          <Typography variant="subtitle1" sx={{ p: 1, fontWeight: 600 }}>
            Notifications
          </Typography>
          
          <MenuItem onClick={handleNotificationMenuClose} sx={{ borderRadius: 1 }}>
            <Box>
              <Typography variant="body2" fontWeight={600}>
                New company registration
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Medical Plus has registered and awaits approval
              </Typography>
            </Box>
          </MenuItem>
          
          <MenuItem onClick={handleNotificationMenuClose} sx={{ borderRadius: 1 }}>
            <Box>
              <Typography variant="body2" fontWeight={600}>
                New announcement pending
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Lux Design Studio posted an announcement for review
              </Typography>
            </Box>
          </MenuItem>
          
          <MenuItem onClick={handleNotificationMenuClose} sx={{ borderRadius: 1 }}>
            <Box>
              <Typography variant="body2" fontWeight={600}>
                System update completed
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Job management system updated to version 2.4.0
              </Typography>
            </Box>
          </MenuItem>
        </Menu>
        
        {/* User Menu */}
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleUserMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
          
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;