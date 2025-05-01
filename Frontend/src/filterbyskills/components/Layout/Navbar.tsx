import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Menu, 
  MenuItem, 
  Avatar,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Briefcase as BriefcaseBusiness, Menu as MenuIcon, Bell, User, BookmarkPlus, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'white' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo and Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isMobile && (
            <IconButton
              edge="start"
              color="primary"
              aria-label="menu"
              onClick={() => toggleDrawer(true)}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <BriefcaseBusiness size={32} color={theme.palette.primary.main} />
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                ml: 1, 
                fontWeight: 700, 
                color: theme.palette.primary.main,
                display: { xs: 'none', sm: 'block' }
              }}
            >
              JobFinder
            </Typography>
          </Link>
        </Box>

        {/* Navigation Links - Desktop */}
        {!isMobile && (
          <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <Button 
              component={Link} 
              to="/" 
              color="inherit" 
              sx={{ mx: 1, color: theme.palette.text.primary }}
            >
              Find Jobs
            </Button>
            <Button 
              component={Link} 
              to="/companies" 
              color="inherit" 
              sx={{ mx: 1, color: theme.palette.text.primary }}
            >
              Companies
            </Button>
            <Button 
              component={Link} 
              to="/salary" 
              color="inherit" 
              sx={{ mx: 1, color: theme.palette.text.primary }}
            >
              Salary Guide
            </Button>
            <Button 
              component={Link} 
              to="/resources" 
              color="inherit" 
              sx={{ mx: 1, color: theme.palette.text.primary }}
            >
              Resources
            </Button>
          </Box>
        )}

        {/* User Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!isMobile && (
            <IconButton color="primary" aria-label="notifications" sx={{ mr: 1 }}>
              <Bell size={20} />
            </IconButton>
          )}
          <IconButton
            onClick={handleProfileMenuOpen}
            color="inherit"
            aria-label="account"
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
              <User size={18} />
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleProfileMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem component={Link} to="/profile" onClick={handleProfileMenuClose}>
              <ListItemIcon>
                <User size={18} />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem component={Link} to="/saved-jobs" onClick={handleProfileMenuClose}>
              <ListItemIcon>
                <BookmarkPlus size={18} />
              </ListItemIcon>
              Saved Jobs
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon>
                <LogOut size={18} />
              </ListItemIcon>
              Sign Out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => toggleDrawer(false)}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <BriefcaseBusiness size={24} color={theme.palette.primary.main} />
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 700, color: theme.palette.primary.main }}>
              JobFinder
            </Typography>
          </Box>
          <List>
            <ListItem button component={Link} to="/">
              <ListItemText primary="Find Jobs" />
            </ListItem>
            <ListItem button component={Link} to="/companies">
              <ListItemText primary="Companies" />
            </ListItem>
            <ListItem button component={Link} to="/salary">
              <ListItemText primary="Salary Guide" />
            </ListItem>
            <ListItem button component={Link} to="/resources">
              <ListItemText primary="Resources" />
            </ListItem>
            <ListItem button component={Link} to="/profile">
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button component={Link} to="/saved-jobs">
              <ListItemText primary="Saved Jobs" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;