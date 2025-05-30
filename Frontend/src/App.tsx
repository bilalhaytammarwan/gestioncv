import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Candidates from './pages/Candidates';
import JobDetailsPage from './pages/JobDetailsPage'; // Import the new page component
import EditOpportunityPage from './pages/EditOpportunityPage'; // Import the new edit page

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} /> {/* Add new route for job details */}
        <Route path="/jobs/:id/edit" element={<EditOpportunityPage />} /> {/* Add new route for editing job details */}
        <Route path="/candidates" element={<Candidates />} />
      </Routes>
    </div>
  );
}

export default App;