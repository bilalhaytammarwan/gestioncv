import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';



import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import JobView from './pages/JobView';
import SavedJobs from './pages/SavedJobs';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Candidates from './pages/Candidates';
import JobDetailsPage from './pages/JobDetailsPage'; // Import the new page component
import EditOpportunityPage from './pages/EditOpportunityPage'; // Import the new edit page
import Login from './pages/Login';
import theme from './theme/theme';





// Import all your pages

import Dashboardadmin from './admin/src/pages/Dashboard';
import CompanyAccounts from './admin/src/pages/CompanyAccounts';
import ClientAccounts from './admin/src/pages/ClientAccounts';
import UserDetails from './admin/src/pages/UserDetails';
import AdminAccounts from './admin/src/pages/AdminAccounts';
import Admindetails from './admin/src/pages/Admindetails';
import AdminProfile from './admin/src/pages/AdminProfile';
import CompanyAnnouncements from './admin/src/pages/CompanyAnnouncements';

import CreateSubAdmin from './admin/src/pages/CreateSubAdmin';
import Layout from './admin/src/components/layout/Layout';
import AnnouncementDetails from './admin/src/pages/AnnouncementDetails';
// ... other imports

function AppContent() {
  const navigate=useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const itslogin = location.pathname.startsWith('/login');
const iscompany = location.pathname.startsWith('/company');
  const isadmin=location.pathname.startsWith('/admin');
    const role = localStorage.getItem("role");

  useEffect(() => {
    if (role === "COMPANY" && !iscompany) {
      navigate("/company");
    } else if (role === "ADMIN" && !isadmin) {
      navigate("/admin");
    } else if (role === "CANDIDATE" && (isadmin || iscompany)) {
      navigate("/");
    }
  }, [location.pathname, role, navigate]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isAdminRoute && !itslogin && <Navbar />}
      <Box sx={{ flex: 1 }}>
        <Routes>
          {/* Public / Company Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/job/:id" element={<JobView />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/company/" element={<Dashboard />} />
          <Route path="/company/jobs" element={<Jobs />} />
          <Route path="/company/jobs/:id" element={<JobDetailsPage />} />
          <Route path="/company/jobs/:id/edit" element={<EditOpportunityPage />} />
          <Route path="/company/candidates" element={<Candidates />} />
          <Route path="/login" element={<Login />} />
          

          {/* Admin Routes (minimal layout) */}
       <Route path="/admin" element={<Layout />}>
    <Route index element={<Dashboardadmin />} />
    <Route path="companies" element={<CompanyAccounts />} />
    <Route path="clients" element={<ClientAccounts />} />
    <Route path="clients/:id" element={<UserDetails />} />
    <Route path="admins" element={<AdminAccounts />} />
    <Route path="getadmin/:id" element={<Admindetails />} />
    <Route path="profile/:id" element={<AdminProfile />} />
    <Route path="announcements/company" element={<CompanyAnnouncements />} />
   
    <Route path="company/:id" element={<AnnouncementDetails />} />
    <Route path="addsubadmin" element={<CreateSubAdmin />} />
  </Route>

          {/* Catch-all */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Box>
      {!isAdminRoute&& !itslogin  &&  <Footer />}
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;