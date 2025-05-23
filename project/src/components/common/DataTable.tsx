import React, { useState } from 'react';
import {
  Box, Paper, Typography, Button, IconButton, Tooltip,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TablePagination, TableSortLabel, useTheme,
  Chip, TextField, InputAdornment, Menu, MenuItem, ListItemIcon,
  ListItemText, Divider
} from '@mui/material';
import { 
  Search, ChevronDown, MoreVertical, Eye, Edit, 
  Trash2, Check, X, Download 
} from 'lucide-react';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'right' | 'center';
  format?: (value: any) => React.ReactNode;
}

interface DataTableProps {
  title: string;
  data: any[];
  columns: Column[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onSearch?: (searchTerm: string) => void;
  searchValue?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  data,
  columns,
  onView,
  onEdit,
  onDelete,
  onApprove,
  onReject,
  onSearch,
  searchValue=''

}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
 
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (onSearch) {
      onSearch(value); 
    }
  };
 const handleSearchKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === 'Enter' && onSearch) {
    onSearch(event.currentTarget.value); // Instead of searchValue
  }
};
  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setActionMenuAnchorEl(event.currentTarget);
    setSelectedRow(id);
  };
  
  const handleActionMenuClose = () => {
    setActionMenuAnchorEl(null);
    setSelectedRow(null);
  };
  
  const handleAction = (action: 'view' | 'edit' | 'delete' | 'approve' | 'reject') => {
    if (selectedRow) {
      switch (action) {
        case 'view':
          onView && onView(selectedRow);
          break;
        case 'edit':
          onEdit && onEdit(selectedRow);
          break;
        case 'delete':
          onDelete && onDelete(selectedRow);
          break;
        case 'approve':
          onApprove && onApprove(selectedRow);
          break;
        case 'reject':
          onReject && onReject(selectedRow);
          break;
      }
    }
    handleActionMenuClose();
  };
  
 
  // Sort the data
  const sortedData = orderBy
  ? [...data].sort((a, b) => {
      const valueA = a[orderBy];
      const valueB = b[orderBy];
      
      if (valueA === valueB) return 0;
      
      const comparison = valueA < valueB ? -1 : 1;
      return order === 'desc' ? -comparison : comparison;
    })
  : data;
  
  // Paginate the data
  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
  // Get row identification
  const getRowId = (row: any) => {
    return row.id || '';
  };
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: '0 0 10px rgba(0,0,0,0.05)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600, flexGrow: 1 }}>
          {title}
        </Typography>
        
       <TextField
  size="small"
  variant="outlined"
  placeholder="Search..."
  value={searchValue}
  onChange={(e) => onSearch?.(e.target.value)} // Controlled by parent
  onKeyPress={(e) => {
    if (e.key === 'Enter') {
      onSearch?.(searchValue); // Use the prop, not local state
    }
  }}
  sx={{ mr: 2, minWidth: 200 }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Search size={18} />
      </InputAdornment>
    ),
  }}
/>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<Download size={18} />}
          size="small"
        >
          Export
        </Button>
      </Box>
      
      <TableContainer
        sx={{
          maxHeight: 440,
          borderRadius: 1,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Table stickyHeader aria-label={`${title} table`}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ minWidth: column.minWidth || 100 }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    <Typography variant="subtitle2" fontWeight={600}>
                      {column.label}
                    </Typography>
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="right" style={{ minWidth: 80 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <TableRow hover tabIndex={-1} key={getRowId(row)}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align || 'left'}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => handleActionMenuOpen(e, getRowId(row))}
                    >
                      <MoreVertical size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  <Typography variant="body2" sx={{ py: 2 }}>
                    No data found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
     
      
      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchorEl}
        open={Boolean(actionMenuAnchorEl)}
        onClose={handleActionMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {onView && (
          <MenuItem onClick={() => handleAction('view')}>
            <ListItemIcon>
              <Eye size={18} />
            </ListItemIcon>
            <ListItemText>View Details</ListItemText>
          </MenuItem>
        )}
        
        {onEdit && (
          <MenuItem onClick={() => handleAction('edit')}>
            <ListItemIcon>
              <Edit size={18} />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
        )}
        
        {(onApprove || onReject) && <Divider />}
        
        {onApprove && (
          <MenuItem onClick={() => handleAction('approve')}>
            <ListItemIcon>
              <Check size={18} color={theme.palette.success.main} />
            </ListItemIcon>
            <ListItemText>Approve</ListItemText>
          </MenuItem>
        )}
        
        {onReject && (
          <MenuItem onClick={() => handleAction('reject')}>
            <ListItemIcon>
              <X size={18} color={theme.palette.error.main} />
            </ListItemIcon>
            <ListItemText>Reject</ListItemText>
          </MenuItem>
        )}
        
        {onDelete && <Divider />}
        
        {onDelete && (
          <MenuItem onClick={() => handleAction('delete')}>
            <ListItemIcon>
              <Trash2 size={18} color={theme.palette.error.main} />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </Paper>
  );
};

export default DataTable;


