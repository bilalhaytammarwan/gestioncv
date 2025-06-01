import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip, useTheme, Stack, Pagination, Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions, Avatar } from '@mui/material';
import DataTable from '../components/common/DataTable';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  description: string;

  role: string;
  ville: string;
  notification: any;
  valid: boolean;
  localisation: string;
  photo:string;
}
const CompanyAccounts: React.FC = () => {
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
    const response = await axios.get<ClientResponse>(`http://localhost:8228/api/user/pagination/company`, {
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
  navigate(`/admin/clients/${id}`);
};
  
  const handleEditClient = (id: string) => {
    console.log(`Edit client with ID: ${id}`);
  };
  
  const handleDeleteClient = (id: string) => {
  setClientToDelete(id);
  setDeleteDialogOpen(true);
};
  
   const handleApproveClient = async (id: string) => {
  try {
    // Make API call to update validation status
    await axios.put(`http://localhost:8228/api/user/update/validation/${id}`,true,{
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Refresh the data after approval
    fetchData(searchTerm);
    
    // Optional: Show success message
    console.log('Client approved successfully');
  } catch (error) {
    console.error('Error approving client:', error);
    // Optional: Show error message
  }
};
  
  const handleRejectClient =async (id: string) => {
     try {
    // Make API call to update validation status
    await axios.put(`http://localhost:8228/api/user/update/validation/${id}`, 
     false ,{
        headers: {
          'Content-Type': 'application/json'
        }
      }
     
    );
    
    // Refresh the data after approval
    fetchData(searchTerm);
    
    // Optional: Show success message
    console.log('Client approved successfully');
  } catch (error) {
    console.error('Error approving client:', error);
    // Optional: Show error message
  }
  };
  const handleSearchSubmit = () => {
  setPage(1); // Always reset to first page
  setTriggerFetch(prev => !prev); // Force re-fetch
};
  const handleSearch = (term: string) => {
  setSearchTerm(term);
  setPage(1); // Reset to first page
  fetchData(term); // Immediately fetch filtered data
};
  
  // Define columns for client data table
  const columns = [
    {
          id:'photo',
          format:(value:string,row:Client)=>{
            console.log(value);
    return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  component="div"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    mr: 2,
                  }}
                >
                 <Avatar
                         src={`http://localhost:8082/images/${value}`} // the image URL
                         
                         sx={{ width: 40, height: 40, mr: 0 }}
                       />
                </Box>
                </Box>);
          }
        },
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

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
           
            <Box>
              <Typography variant="body2" fontWeight={500}>
                {value}
              </Typography>
              
            </Box>
          </Box>
        );
      },
      
    },
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
      id: 'valid',
      label: 'Valid',
      minWidth: 120,
      format: (value: boolean | undefined) => {
        let bgColor = theme.palette.grey[400];
        let text = String(value); // "true", "false", or "undefined"
      
        if (value === true) {
          bgColor = theme.palette.success.light;
        } else if (value === false) {
          bgColor = theme.palette.error.light;
        }
      
        return (
          <Chip
            label={text}
            size="small"
            sx={{
              backgroundColor: bgColor,
              color: theme.palette.getContrastText(bgColor),
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          />
        );
      }},
    {
      id: 'localisation',
      label: 'Localisation',
      minWidth: 120,
      format: (value: string | undefined) => (
        <Typography 
          variant="body2" 
          sx={{ 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {value}
        </Typography>
      ),
    },
    {
      id: 'role',
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
    },
    
    
  ];
  
 

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 700 }}>
        Company Accounts
      </Typography>
      
      <DataTable
        title="Manage Company"
        data={data}
        columns={columns}
        onView={handleViewUser}
        onEdit={handleEditClient}
        onDelete={handleDeleteClient}
        onApprove={handleApproveClient}
        onReject={handleRejectClient}
        onSearch={handleSearch}
        showApprovalActions={true}
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
export default CompanyAccounts;