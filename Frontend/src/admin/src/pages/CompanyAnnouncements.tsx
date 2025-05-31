import React, { useEffect, useState } from 'react';
import { 
  Box, Typography, Grid, MenuItem, FormControl, Select, 
  InputLabel, SelectChangeEvent, 
  Stack,
  Pagination,
  useTheme,
  Chip,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Dialog
} from '@mui/material';
import AnnouncementCard from '../components/common/AnnouncementCard';
import { mockAnnouncements } from '../utils/mockData';
import axios from 'axios';
import DataTable from '../components/common/DataTable';
import { useNavigate } from 'react-router-dom';
interface Opportunity {
  id: string;
  companyId: string;
  title?: string;
  description: string;
  categoryId: string;
  categoryName:string;
  createdAt: Date;
  updatedAt: Date;
  jobType: string; 
  salary: Salary; 
  jobLocation: Location; 
  status: string; 
  applicationDeadline: Date;
  remote: boolean;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  yearsOfExperience: number;
  tags: string[];
  // searchSuggestions?: string[]; // Uncomment if needed
  url: string;
  name:string;
}
 interface Location {
  city: string;     
  
  region: string;  
  country: string;   
}
export interface Salary {
  currency: string;  
  min: number;     
  max: number;    
  unit: string;      
}

const CompanyAnnouncements: React.FC = () => {
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
     const [triggerFetch, setTriggerFetch] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1); // Start from page 1 (backend uses 0-based)
    const [rowsPerPage] = useState(10); // Fixed rows per page for now
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
      const [annonceToDelete, setannonceToDelete] = useState<string | null>(null);
     const confirmDeleteClient = async () => {
  
  
  try {
    await axios.delete(`http://localhost:8090/api/opportunity/${annonceToDelete}`);
    // Refresh the data after deletion
    fetchData();
    // Show success message (you might want to add a snackbar/toast)
    console.log('Client deleted successfully');
  } catch (error) {
    console.error('Error deleting client:', error);
    // Show error message
  } finally {
    setDeleteDialogOpen(false);
    setannonceToDelete(null);
  }
};
    const fetchData = async (search = '') => {
  setLoading(true);
  try {
    const response = await axios.get(`http://localhost:8090/api/opportunity/pagination/by-companies`, {
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

  console.log(data)
    const handleViewcompany = (id: string) => {
      navigate(`/company/${id}`);
    };
      const handleDeleteClient = (id: string) => {
  setannonceToDelete(id);
  setDeleteDialogOpen(true);
};
      const handleEditClient = (id: string) => {
        console.log(`Edit client with ID: ${id}`);
      };
    
      
     const handleApproveClient = async (id: string) => {
 
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
  
      const columns = [
         {
          id: 'name',
          label: 'Nom',
          minWidth: 150,
          format: (value: any, row: Opportunity) => (
            <Typography variant="body2">
              {value}
            </Typography>
          ),
        },
        {
          id: 'title',
          label: 'Title',
          minWidth: 150,
          format: (value: string, row: Opportunity) => {
          return(
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
              
              >
               
              </Box>
              <Typography variant="body2" fontWeight={500}>
                 {value}
              </Typography>
            </Box>);
          },
        },
        {
          id: 'categoryName',
          label: 'Category',
          minWidth: 150,
          format: (value: any, row: Opportunity) => (
            <Typography variant="body2">
              {value}
            </Typography>
          ),
        },
        
        {
          id: 'createdAt',
          label: 'Created At',
          minWidth: 160,
          format: (value: any, row: Opportunity) => (
            <Typography variant="body2">
              {new Date(value).toLocaleDateString()}
            </Typography>
          ),
        },
         {
          id: 'updatedAt',
          label: 'Updated At',
          minWidth: 160,
          format: (value: any, row: Opportunity) => (
            <Typography variant="body2">
              {new Date(value).toLocaleDateString()}
            </Typography>
          ),
        },
        {
          id: 'jobType',
          label: 'Job Type',
          minWidth: 120,
          format: (value: any, row: Opportunity) => (
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
          ),
        },
        
      ];
      
   
  
    return (
      <Box>
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 700 }}>
          Company Accounts
        </Typography>
        
        <DataTable
          title="Manage Clients"
          data={data}
          columns={columns}
          onView={handleViewcompany}
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
                          Are you sure you want to delete this announcement? This action cannot be undone.
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

export default CompanyAnnouncements;