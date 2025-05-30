import React, { useState } from 'react';
import { Search, Filter, PlusCircle } from 'lucide-react';
import JobCard from './JobCard';
import { opportunity, deleteOpportunity } from '../../service/OpportunityService'; // Updated import

interface JobsListProps {
  jobs: opportunity[]; // Changed Job to opportunity
  onCreateJob: () => void;
  onEditJob?: (job: opportunity) => void; // Changed Job to opportunity
}

const JobsList: React.FC<JobsListProps> = ({ jobs, onCreateJob, onEditJob }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [jobList, setJobList] = useState<opportunity[]>(jobs); // Add state for job list

  // Update jobList when jobs prop changes
  React.useEffect(() => {
    setJobList(jobs);
  }, [jobs]);

  // Handle job card actions
  const handleEdit = (id: string) => {
    const jobToEdit = jobs.find(job => job.id === id);
    if (jobToEdit && onEditJob) {
      onEditJob(jobToEdit);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteOpportunity(id);
      setJobList(jobList.filter(job => job.id !== id)); // Update state to remove deleted job
      console.log('Delete job', id);
    } catch (error) {
      console.error('Failed to delete job', error);
      // Optionally, show an error message to the user
    }
  };

  const handleDuplicate = (id: string) => {
    console.log('Duplicate job', id);
    // Implementation would create a copy of the job
  };

  const handleToggleStatus = (id: string) => {
    console.log('Toggle status for job', id);
    // Implementation would update job status
  };

  // Filter jobs based on search term and status filter
  const filteredJobs = jobList.filter(job => { // Use jobList for filtering
    // Updated to search in title and jobLocation
    const jobLocationString = `${job.jobLocation?.city} ${job.jobLocation?.region} ${job.jobLocation?.country}`.toLowerCase();
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          jobLocationString.includes(searchTerm.toLowerCase());
    // Updated status values to uppercase
    const matchesStatus = statusFilter === 'all' || job.status.toUpperCase() === statusFilter.toUpperCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-5 border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-900">Job Listings</h2>
          <button 
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            onClick={onCreateJob}
          >
            <PlusCircle size={18} className="mr-2" />
            Create New Job
          </button>
        </div>
        
        <div className="mt-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs by title or location..." // Updated placeholder
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center">
            <Filter size={18} className="text-gray-500 mr-2" />
            <select
              className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              {/* Updated status values to uppercase */}
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onDuplicate={handleDuplicate}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsList;