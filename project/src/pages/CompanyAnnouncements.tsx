import React, { useEffect, useState } from 'react';
import { 
  Box, Typography, Grid, MenuItem, FormControl, Select, 
  InputLabel, SelectChangeEvent, 
  Stack,
  Pagination,
  useTheme,
  Chip
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
   
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1); // Start from page 1 (backend uses 0-based)
    const [rowsPerPage] = useState(10); // Fixed rows per page for now
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8090/api/opportunity/pagination/by-companies?page=${page - 1}&size=${rowsPerPage}`
        );
        setData(response.data.content || response.data); // handle content-only or raw array
        setTotalPages(response.data.totalpages || 5); // If backend provides totalPages, use it; otherwise fallback
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchData();
    }, [page]);

  console.log(data)
    const handleViewcompany = (id: string) => {
      navigate(`/company/${id}`);
    };
      
      const handleEditClient = (id: string) => {
        console.log(`Edit client with ID: ${id}`);
      };
      
      const handleDeleteClient = (id: string) => {
        console.log(`Delete client with ID: ${id}`);
      };
      
      const handleApproveClient = (id: string) => {
        console.log(`Approve client with ID: ${id}`);
      };
      
      const handleRejectClient = (id: string) => {
        console.log(`Reject client with ID: ${id}`);
      };
  
      const columns = [
        {
          id: 'title',
          label: 'Title',
          minWidth: 150,
          format: (value: string, row: Opportunity) => {
          return(
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
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
        {
          id: 'salaryMin',
          label: 'Min Salary',
          minWidth: 130,
          format: (value: any, row: Opportunity) => (
            <Typography variant="body2">
              {value ? `$${value.toLocaleString()}` : 'N/A'}
            </Typography>
          ),
        },
        {
          id: 'salaryMax',
          label: 'Max Salary',
          minWidth: 130,
          format: (value: any, row: Opportunity) => (
            <Typography variant="body2">
              {value? `$${value.toLocaleString()}` : 'N/A'}
            </Typography>
          ),
        },
        {
          id: 'country',
          label: 'Country',
          minWidth: 140,
          format: (value: any, row: Opportunity) => (
            <Typography variant="body2">
              {value|| 'N/A'}
            </Typography>
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
        />
         <Stack direction="row" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      </Box>
    );
  };

export default CompanyAnnouncements;