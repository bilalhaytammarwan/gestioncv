import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './interface/theme/theme';
import Navbar from './interface/components/Layout/Navbar';
import Footer from './interface/components/Layout/Footer';
import Home from './interface/pages/Home';
import JobView from './interface/pages/JobView';
import SavedJobs from './interface/pages/SavedJobs';
import Detailskills from './detailskills/Detailskills';
import Filterskills from './filterbyskills/pages/Filterskills';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh' 
        }}>
          <Navbar />
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/job/:id" element={<JobView />} />
              <Route path="/saved-jobs" element={<SavedJobs />} />
               <Route path="/detailskills" element={<Detailskills/>}/>
               <Route path="/job/skills/:id" element={<Filterskills/>} />
              {/* Add more routes as needed */}
              <Route path="*" element={<Home />} />
             
             
            </Routes>
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;