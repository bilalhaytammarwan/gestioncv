import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactElement;
  change?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  color = 'primary',
}) => {
  const theme = useTheme();
  
  const colorMap = {
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
    success: theme.palette.success,
    warning: theme.palette.warning,
    error: theme.palette.error,
    info: theme.palette.info,
  };
  
  const selectedColor = colorMap[color];
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: '0 0 10px rgba(0,0,0,0.05)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="subtitle2" color="textSecondary">
          {title}
        </Typography>
        <Box
          sx={{
            backgroundColor: selectedColor.light,
            color: selectedColor.main,
            p: 1,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
      
      <Typography
        variant="h4"
        component="div"
        sx={{ 
          fontWeight: 600,
          mt: 2,
          mb: 1
        }}
      >
        {value}
      </Typography>
      
      {change && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="body2"
            color={change.isPositive ? 'success.main' : 'error.main'}
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              fontWeight: 500
            }}
          >
            {change.isPositive ? '+' : '-'}{Math.abs(change.value)}%
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ ml: 1 }}
          >
            vs last month
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default StatsCard;