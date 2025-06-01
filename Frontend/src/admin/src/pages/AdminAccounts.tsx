import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip, useTheme, LinearProgress, Stack, Pagination, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Dialog, Avatar } from '@mui/material';
import DataTable from '../components/common/DataTable';


import axios from 'axios';
import { useNavigate } from 'react-router-dom';
interface ClientResponse {
  content: Client[];
  totalpages: number;
}
interface Client {
  id: string;
  nom: string;
  telephone: string;
  email: string;
  password: string;

  
  adminRole:string;
  ville: string;
  
}
const AdminAccounts: React.FC = () => {
  const theme = useTheme();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1); // Start from page 1 (backend uses 0-based)
  const [rowsPerPage] = useState(10); // Fixed rows per page for now
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [triggerFetch, setTriggerFetch] = useState(false);
  
const confirmDeleteClient = async () => {
  if (!clientToDelete) return;
  
  try {
    await axios.delete(`http://localhost:8228/api/user/${clientToDelete}`);
    // Refresh the data after deletion
    fetchData();
    // Show success message (you might want to add a snackbar/toast)
    console.log('Client deleted successfully');
  } catch (error) {
    console.error('Error deleting client:', error);
    // Show error message
  } finally {
    setDeleteDialogOpen(false);
    setClientToDelete(null);
  }
};
  const fetchData = async (search = '') => {
  setLoading(true);
  try {
    const response = await axios.get<ClientResponse>(`http://localhost:8228/api/user/admins/pagination`, {
      params: {
        page: page - 1,
        size: rowsPerPage,
        search: search
      }
    });
    setData(response.data.content || response.data);
    setTotalPages(response.data.totalpages || 1);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchData(searchTerm); 
}, [page, triggerFetch]);
  const navigate = useNavigate();

const handleViewUser = (id: string) => {
  navigate(`/admin/getadmin/${id}`);
};
  
  const handleEditClient = (id: string) => {
    console.log(`Edit client with ID: ${id}`);
  };
  
  const handleDeleteClient = (id: string) => {
  setClientToDelete(id);
  setDeleteDialogOpen(true);
};
  
  const handleApproveClient = (id: string) => {
    console.log(`Approve client with ID: ${id}`);
  };
  
  const handleRejectClient = (id: string) => {
    console.log(`Reject client with ID: ${id}`);
  };
  const handleSearchSubmit = () => {
  setPage(1); // Always reset to first page
  setTriggerFetch(prev => !prev); // Force re-fetch
};
const handleSearchChange = (term: string) => {
  setSearchTerm(term);
  // If search is cleared, fetch immediately
  if (term === '') {
    handleSearchSubmit();
  }
};

const handleSearch = (term: string) => {
  setSearchTerm(term);
  setPage(1); // Reset to first page
  fetchData(term); // Immediately fetch filtered data
};
  
  // Define columns for client data table
  const columns = [
    
    {

      id: 'nom',
      label: 'Name',
      minWidth: 180,
      format: (value: string, row: Client) => {
       
        
        if (!value) {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                No name available
              </Typography>
            </Box>
          );
        }

        return(
            <Box>
              <Typography variant="body2" fontWeight={500}>
                {value}
              </Typography>
              
            </Box>
        )
       
      
    }},
    {
      id: 'email',
      label: 'Email',
      minWidth: 220,
      format: (value: string | undefined) => (
        <Typography 
          variant="body2" 
          sx={{ 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {value || 'No email'}
        </Typography>
      ),
    },
    {
      id: 'ville',
      label: 'City',
      minWidth: 120,
    },
    
    {
      id: 'adminRole',
      label: 'Role',
      minWidth: 100,
      align: 'center',
      format: (value: string) => {
        if (!value) return null;
        
        return (
          <Chip
            label={value}
            size="small"
            sx={{
              backgroundColor: theme.palette.grey[200],
              color: theme.palette.text.primary,
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          />
        );
      },
    }
   
   
   
  ];
  
 

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 700 }}>
        Admin Accounts
      </Typography>
      
      <DataTable
        title="Manage Admins"
        data={data}
        columns={columns}
        onView={handleViewUser}
        onEdit={handleEditClient}
        onDelete={handleDeleteClient}
        onApprove={handleApproveClient}
        onReject={handleRejectClient}
         
        onSearch={handleSearch}
        searchValue={searchTerm}
      />
       <Stack direction="row" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Stack>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this client? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteClient} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminAccounts;