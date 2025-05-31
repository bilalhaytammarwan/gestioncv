import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import JobsList from '../components/dashboard/JobsList';
import JobDialog from '../components/dialogs/JobDialog';
// import { mockJobs } from '../data/mockData'; // Comment out or remove mockJobs import
import { opportunity, GetAllOpportunities, CreateOpportunity } from '../service/OpportunityService'; // Updated import
import { OpportunityCreationRequest } from '../service/OpportunityService'; // Import OpportunityCreationRequest

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<opportunity[]>([]); // Changed Job to opportunity and initialize with empty array
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Partial<opportunity> | undefined>(undefined); // Changed Job to opportunity

  useEffect(() => {
    // Fetch opportunities when component mounts
    GetAllOpportunities().then(data => {
      if (data) {
        setJobs(data as unknown as opportunity[]); // Ensure data is cast correctly, or handle array of opportunities if API returns that
      }
    });
  }, []);

  useEffect(() => {
    if (isJobDialogOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isJobDialogOpen]);
  
  const handleCreateJob = () => {
    setEditingJob(undefined);
    setIsJobDialogOpen(true);
  };
  
  const handleEditJob = (job: opportunity) => { // Changed Job to opportunity
    setEditingJob(job);
    setIsJobDialogOpen(true);
  };
  
  const handleJobSubmit = async (data: Partial<opportunity>) => { // Changed Job to opportunity, make async for API call
    // Construct the payload for OpportunityCreationRequest or opportunity based on API needs
    // This is an example, adjust according to your actual `CreateOpportunity` and update logic
    const now = new Date().toISOString();
    const opportunityData: OpportunityCreationRequest = {
      companyId: data.companyId || 'defaultCompanyId', // Provide a sensible default or get from context
      title: data.title || '',
      description: data.description || '',
      categoryId: data.categoryId || 'defaultCategoryId', // Provide a sensible default
      createdAt: editingJob?.createdAt || now,
      updatedAt: now,
      jobType: data.jobType || 'FULL_TIME',
      salary: data.salary || { min: 0, max: 0, currency: 'USD', unit: 'ANNUALLY' },
      jobLocation: data.jobLocation || { city: '', region: '', country: '' },
      status: data.status || 'ACTIVE',
      applicationDeadline: data.applicationDeadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Default to 30 days from now
      remote: data.remote || false,
      requirements: data.requirements || [],
      responsibilities: data.responsibilities || [],
      benefits: data.benefits || [],
      yearsOfExperience: data.yearsOfExperience || 0,
      // tags, url, candidatesIds are not in OpportunityCreationRequest, handle accordingly if needed for update
    };

    if (editingJob?.id) {
      // Update existing job - Assuming you have an UpdateOpportunity function
      // For now, let's simulate an update by filtering and adding the new one
      // const updatedOpportunity = { ...editingJob, ...data, updatedAt: now } as opportunity;
      // setJobs(jobs.map(job => job.id === editingJob.id ? updatedOpportunity : job));
      console.log("Update functionality not yet implemented with API for opportunity");
      // Replace with actual API call for update, e.g., UpdateOpportunity(editingJob.id, opportunityData)
      // Then refresh list or update state based on response
      const updatedOpportunity = { ...editingJob, ...opportunityData, id: editingJob.id } as opportunity;
      setJobs(jobs.map(job => job.id === editingJob.id ? updatedOpportunity : job));

    } else {
      // Add new job
      const newOpportunity = await CreateOpportunity(opportunityData);
      if (newOpportunity) {
        setJobs([newOpportunity, ...jobs]);
      }
    }
    
    setIsJobDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Job Listings</h1>
          <p className="text-gray-600 mt-1">Manage all your job postings in one place</p>
        </div>
        
        <JobsList 
          jobs={jobs}
          onCreateJob={handleCreateJob}
          onEditJob={handleEditJob}
        />
        
        
        <JobDialog 
          isOpen={isJobDialogOpen}
          initialData={editingJob} // Pass opportunity data
          onClose={() => setIsJobDialogOpen(false)}
          onSubmit={handleJobSubmit} // Submit opportunity data
        />
      </main>
    </div>
  );
};

export default Jobs;