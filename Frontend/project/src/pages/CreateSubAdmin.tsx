import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import axios from 'axios';


const roles = ['moderator', 'manager', 'editor'];
const statuses = ['active', 'suspended', 'disabled'];

export default function CreateSubAdmin() {
  const [form, setForm] = useState({
    nom: '',
    telephone: '',
    email: '',
    password: '',
    ville: '',
  role:"ADMIN"
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e:any) => {
    e.preventDefault();
   axios.post("http://localhost:8228/api/user/addadmin",form);
  };

  return (
    <Box p={3} maxWidth="800px" mx="auto">
   
        <Card elevation={3} sx={{ borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Create Sub-Admin
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Name" name="nom" value={form.nom} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Phone" name="telephone" value={form.telephone} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Password" type="password" name="password" value={form.password} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="City" name="ville" value={form.ville} onChange={handleChange} required />
                </Grid>
                
                
                
             
              </Grid>
              <Box mt={3}>
                <Button type="submit" variant="contained" size="large">
                  Create
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
     
    </Box>
  );
}