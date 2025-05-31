import React from 'react';
import { Box, Card, CardContent, CardActions, Typography, Button, Chip, Avatar, useTheme, Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { MoreVertical, ArrowUpRight, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Announcement } from '../../types';

interface AnnouncementCardProps {
  announcement: Announcement;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onView?: (id: string) => void;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  announcement,
  onApprove,
  onReject,
  onView,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const getStatusColor = () => {
    switch (announcement.status) {
      case 'published':
        return theme.palette.success;
      case 'pending':
        return theme.palette.warning;
      case 'rejected':
        return theme.palette.error;
      default:
        return theme.palette.info;
    }
  };
  
  const getStatusIcon = () => {
    switch (announcement.status) {
      case 'published':
        return <CheckCircle size={16} />;
      case 'pending':
        return <AlertTriangle size={16} />;
      case 'rejected':
        return <XCircle size={16} />;
      default:
        return null;
    }
  };
  
  return (
    <Card 
      elevation={0}
      sx={{
        borderRadius: 2,
        boxShadow: '0 0 10px rgba(0,0,0,0.05)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 1,
        }}
      >
        <IconButton 
          size="small"
          onClick={handleMenuClick}
        >
          <MoreVertical size={16} />
        </IconButton>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {onView && (
            <MenuItem onClick={() => { onView(announcement.id); handleClose(); }}>
              <ListItemIcon>
                <ArrowUpRight size={16} />
              </ListItemIcon>
              <ListItemText>View Details</ListItemText>
            </MenuItem>
          )}
          
          {announcement.status === 'pending' && onApprove && (
            <MenuItem onClick={() => { onApprove(announcement.id); handleClose(); }}>
              <ListItemIcon>
                <CheckCircle size={16} color={theme.palette.success.main} />
              </ListItemIcon>
              <ListItemText>Approve</ListItemText>
            </MenuItem>
          )}
          
          {announcement.status === 'pending' && onReject && (
            <MenuItem onClick={() => { onReject(announcement.id); handleClose(); }}>
              <ListItemIcon>
                <XCircle size={16} color={theme.palette.error.main} />
              </ListItemIcon>
              <ListItemText>Reject</ListItemText>
            </MenuItem>
          )}
        </Menu>
      </Box>
      
      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Chip
            label={announcement.status}
            size="small"
            icon={getStatusIcon()}
            sx={{
              backgroundColor: getStatusColor().light,
              color: getStatusColor().dark,
              fontWeight: 500,
              mb: 1,
            }}
          />
        </Box>
        
        <Typography variant="h6" component="h2" gutterBottom>
          {announcement.title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {announcement.content}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Avatar 
            sx={{ 
              width: 32, 
              height: 32,
              backgroundColor: announcement.source === 'company' ? 'primary.main' : 'secondary.main',
              mr: 1,
            }}
          >
            {announcement.sourceName.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {announcement.sourceName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {announcement.source === 'company' ? 'Company' : 'Client'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      
      <CardActions 
        sx={{ 
          justifyContent: 'space-between',
          borderTop: `1px solid ${theme.palette.divider}`,
          px: 2,
          py: 1.5,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Posted: {new Date(announcement.createdAt).toLocaleDateString()}
        </Typography>
        
        {announcement.expiresAt && (
          <Typography variant="caption" color="text.secondary">
            Expires: {new Date(announcement.expiresAt).toLocaleDateString()}
          </Typography>
        )}
      </CardActions>
    </Card>
  );
};

export default AnnouncementCard;