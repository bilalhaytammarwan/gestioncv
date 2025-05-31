import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Avatar, Paper, CircularProgress, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const UserDetails: React.FC = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:8228/api/user/${id}`);
      navigate('/clients');
    } catch (error) {
      console.error('Failed to delete user:', error);
    } finally {
      setDeleting(false);
      setOpenDeleteDialog(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8228/api/user/get/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <Box sx={{ mt: 10, textAlign: 'center' }}><CircularProgress /></Box>;
  if (!user) return <Typography>User not found</Typography>;

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', py: 6 }}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 700,
          mx: 'auto',
          p: 4,
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#ffffff'
        }}
      >
        <Avatar
          src={`http://localhost:8082/images/${user.photo}`}
          alt={user.nom}
          sx={{
            width: 120,
            height: 120,
            mb: 2,
            border: '4px solid #1976d2'
          }}
        />

        <Typography variant="h4" fontWeight="bold" color="#1976d2" gutterBottom>
          {user.nom}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {user.role}
        </Typography>

        <Box sx={{ mt: 3, width: '100%' }}>
          <Typography variant="subtitle1"><strong>Email:</strong> {user.email}</Typography>
          <Typography variant="subtitle1"><strong>City:</strong> {user.ville}</Typography>
          {user.role === "CANDIDATE" ? (
  <>
    <Typography variant="subtitle1"><strong>Age:</strong> {user.age}</Typography>
    <Typography variant="subtitle1"><strong>Gender:</strong> {user.sexe}</Typography>
  </>
) : (
  <>
    <Typography variant="subtitle1"><strong>Valid:</strong> {String(user.valid)}</Typography>
    <Typography variant="subtitle1"><strong>Location:</strong> {user.localisation}</Typography>
  </>
)}
          <Typography variant="subtitle1"><strong>Phone:</strong> {user.telephone}</Typography>
        </Box>
        <Button 
  variant="contained" 
  color="error" 
  sx={{ mt: 3 }}
  onClick={() => setOpenDeleteDialog(true)}
>
  Delete User
</Button>
      </Paper>
        {user.attachemen&&<Card sx={{ m: 2 }}>
      <CardContent>
        <Typography variant="h6">PDF Preview</Typography>
        <iframe
          src={`http://localhost:8082/cvs/${user.attachement}.pdf`}
          width="100%"
          height="600px"
          style={{ border: 'none' }}
          title="CV Preview"
        />
      </CardContent>
    
    </Card>}
       {/* Delete confirmation dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button 
            onClick={handleDelete} 
            color="error" 
            disabled={deleting}
            startIcon={deleting ? <CircularProgress size={20} /> : null}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDetails;