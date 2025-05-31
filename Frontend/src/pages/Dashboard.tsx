import React, { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import Header from '../components/layout/Header';
import DashboardStats from '../components/dashboard/DashboardStats';
import JobsList from '../components/dashboard/JobsList';
import CompanyProfile from '../components/company/CompanyProfile';
import { mockOpportunities, mockCompany } from '../data/mockData';
import { Company } from '../types'; // Removed Job import
import JobDialog from '../components/dialogs/JobDialog';
import { GetAllOpportunities, opportunity, CreateOpportunity, OpportunityCreationRequest } from '../service/OpportunityService'; // Added CreateOpportunity and OpportunityCreationRequest


const Dashboard: React.FC = () => {
  const [jobs, setJobs] = useState<opportunity[]>(mockOpportunities);
  const [company, setCompany] = useState<Company>(mockCompany);
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);

  
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
    setShowCreateJob(true);
    setIsJobDialogOpen(true);
  };
  
  useEffect(()=>{
    async function fetchJobs() {
    
      const fetchedJobs = await GetAllOpportunities();
      console.log('fetchedJobs',fetchedJobs);
      if (fetchedJobs) {
        setJobs(fetchedJobs as unknown as opportunity[]);
      }
    }
    fetchJobs();

  },[])

  const handleJobSubmit = async (data: Partial<opportunity>) => { // Changed Job to opportunity, make async
    // Construct the payload for OpportunityCreationRequest
    const now = new Date().toISOString();
    const opportunityData: OpportunityCreationRequest = {
      companyId: company.id, // Use company id from state
      title: data.title || '',
      description: data.description || '',
      categoryId: data.categoryId || 'default-category', // Provide a sensible default or get from form
      createdAt: now,
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
    };
    
    const newOpportunity = await CreateOpportunity(opportunityData);
    if (newOpportunity) {
      setJobs([newOpportunity, ...jobs]);
    }
    setShowCreateJob(false);
    setIsJobDialogOpen(false);
    
  };
  
  const handleUpdateCompany = (data: Partial<Company>) => {
    setCompany({ ...company, ...data });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Company Dashboard</h1>
          
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <DashboardStats />
          
          
            <JobDialog 
              isOpen={showCreateJob}
              onClose={() => {setShowCreateJob(false); setIsJobDialogOpen(false)}}
              onSubmit={handleJobSubmit}
            />
          
            <>
              <JobsList 
                jobs={jobs}
                onCreateJob={handleCreateJob}
              />
              
              <CompanyProfile 
                company={company}
                onUpdate={handleUpdateCompany}
              />
            </>
          
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 JobBoard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;