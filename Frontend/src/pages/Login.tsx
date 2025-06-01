import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// function parseJwt(token: string): { sub: string } | null {
//   try {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split('')
//         .map(function (c) {
//           return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//         })
//         .join('')
//     );
//     return JSON.parse(jsonPayload);
//   } catch {
//     return null;
//   }
// }

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
       await axios.post('http://localhost:8228/api/auth/authenticate', {
        email,
        password,
      });
      
      if (email) {
        const userRes = await axios.get(
          `http://localhost:8228/api/user/email/${email}`
        );
        const userData = userRes.data as { id?: string; role?: string };
        localStorage.setItem('role', userData?.role ?? '');
        if (userData && userData.id) {
          localStorage.setItem('user_id', userData.id);
        }
        // Check role and navigate
        if (userData && userData.role) {
          if (userData.role === 'ADMIN') {
            navigate('/admin');
            return;
          } else if (userData.role === 'COMPANY') {
            navigate('/company/');
            return;
          } else if (userData.role === 'CANDIDATE') {
            navigate('/');
            return;
          }
        }
      }
      navigate('/'); // Default redirect
    } catch {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f5f7fa' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, minWidth: 320 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
