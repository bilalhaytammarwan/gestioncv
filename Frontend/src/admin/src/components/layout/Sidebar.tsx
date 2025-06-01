import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Typography, IconButton, Collapse, useMediaQuery, useTheme, Avatar
} from '@mui/material';
import { 
  ChevronDown, ChevronRight, LayoutDashboard, Building2, Users,
  Megaphone, Settings, LogOut, Menu,
  UserPlus
} from 'lucide-react';
import axios from 'axios';

interface Admin {
  id: string;
  name: string;
  email: string;
  
}
interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
  onMobileOpen: () => void;
}

const drawerWidth = 280;

const NavItem = ({ 
  title, 
  icon, 
  path, 
  children = null,
  level = 0
}: { 
  title: string; 
  icon: React.ReactNode; 
  path?: string;
  children?: { title: string; path: string }[] | null;
  level?: number;
}) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const theme = useTheme();
  useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get<Admin>(`http://localhost:8228/api/user/get/681a923dbc5e4b0806cdba7f`);
          setAdmin(response.data);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        } 
      };
  
      fetchUser();
    },[]);
  
  const active = path ? location.pathname === path : false;
  const hasChildren = children && children.length > 0;
  
  const handleClick = () => {
    if (hasChildren) {
      setOpen(!open);
    }
  };
  
  return (
    <>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          component={path && !hasChildren ? Link : 'div'}
          to={path && !hasChildren ? path : undefined}
          onClick={handleClick}
          sx={{
            height: 56,
            borderRadius: '8px',
            mb: 0.5,
            pl: level * 2 + 2,
            ...(active && {
              backgroundColor: 'primary.light',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.light',
              },
              '& .MuiListItemIcon-root': {
                color: 'primary.contrastText',
              }
            }),
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: active ? 'inherit' : 'text.secondary',
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText 
            primary={title} 
            primaryTypographyProps={{ 
              fontWeight: active ? 600 : 500, 
              variant: 'body2' 
            }} 
          />
          {hasChildren && (
            open ? <ChevronDown size={16} /> : <ChevronRight size={16} />
          )}
        </ListItemButton>
      </ListItem>
      
      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((child) => (
              <ListItem key={child.path} disablePadding>
                <ListItemButton
                  component={Link}
                  to={child.path}
                  sx={{
                    height: 48,
                    borderRadius: '8px',
                    mb: 0.5,
                    pl: (level + 1) * 2 + 4,
                    ...(location.pathname === child.path && {
                      backgroundColor: 'primary.lighter',
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.lighter',
                      },
                    }),
                  }}
                >
                  <ListItemText
                    primary={child.title}
                    primaryTypographyProps={{
                      variant: 'body2',
                      fontWeight: location.pathname === child.path ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onMobileClose, onMobileOpen }) => {
 
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();
  
    const handleClose = () => {
      localStorage.clear(); // or remove specific keys if needed
      navigate('/login'); // Redirect to login page
    }
  const content = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 3,
        }}
      >
        <Avatar
          sx={{
            backgroundColor: 'primary.main',
            height: 60,
            width: 60,
            mb: 2,
          }}
        >
          <Typography variant="h4" color="white">AD</Typography>
        </Avatar>
      
<Typography variant="body2" component="div" color="textSecondary">
  Administration 
</Typography>
      </Box>
      <Box component="nav" sx={{ flex: 1, px: 2 }}>
        <List>
          <NavItem 
            title="Dashboard" 
            icon={<LayoutDashboard size={24} />} 
            path="/admin"
          />
          <NavItem 
            title="Companies" 
            icon={<Building2 size={24} />} 
            path="/admin/companies"
          />
          <NavItem 
            title="Clients" 
            icon={<Users size={24} />} 
            path="/admin/clients"
          />
          <NavItem 
            title="Admins" 
            icon={<Users size={24} />} 
            path="/admin/admins"
          />
          <NavItem 
            title="Announcements" 
            icon={<Megaphone size={24} />} 
            children={[
              { title: 'Company Announcements', path: '/admin/announcements/company' },
             
            ]} 
          />
          <NavItem 
            title="Add sub admins" 
            icon={<UserPlus size={24} />} 
            path="/admin/addsubadmin"
          />
         
        </List>
      </Box>
      <Box onClick={handleClose}
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <ListItemButton
          sx={{
            borderRadius: 1,
            p: 1,
          }}
        >
          <ListItemIcon>
            <LogOut size={24} />
          </ListItemIcon  >
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );
  
  return (
    <>
      {/* Mobile drawer toggle */}
      {!isDesktop && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMobileOpen}
          sx={{
            position: 'fixed',
            top: 12,
            left: 16,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            display: { xs: 'block', md: 'none' },
          }}
        >
          <Menu size={24} />
        </IconButton>
      )}

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={isMobileOpen}
        onClose={onMobileClose}
        variant="temporary"
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {content}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        anchor="left"
        open
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        {content}
      </Drawer>
    </>
  );
};

export default Sidebar;