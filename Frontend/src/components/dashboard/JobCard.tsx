import React from 'react';
import { Edit, MoreVertical, Pause, Copy, Trash2, ExternalLink, BarChart2 } from 'lucide-react';
import { opportunity } from '../../service/OpportunityService'; // Updated import
import { Link } from 'react-router-dom'; // Import Link
import ConfirmationModal from '../dialogs/ConfirmationModal'; // Import ConfirmationModal

interface JobCardProps {
  job: opportunity; // Changed Job to opportunity
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  onEdit, 
  onDelete, 
  onDuplicate, 
  onToggleStatus 
}) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  
  // Format date
  const formatDate = (dateString: string) => { // Changed date type to string
    const date = new Date(dateString); // Parse string to Date
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString();
  };
  
  // Status badge styles
  const statusStyles: { [key: string]: string } = { // Added index signature
    ACTIVE: 'bg-green-100 text-green-800', // Changed to uppercase to match opportunity interface
    INACTIVE: 'bg-amber-100 text-amber-800', // Changed to uppercase
    CLOSED: 'bg-gray-100 text-gray-800' // Changed to uppercase
  };
  
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            {/* Make title a Link to the job details page */}
            <Link to={`/jobs/${job.id}`} className="hover:underline">
              <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
            </Link>
            {/* Updated to use jobLocation object */}
            <p className="text-gray-600 mt-1">{`${job.jobLocation?.city}, ${job.jobLocation?.region}, ${job.jobLocation?.country}`}</p>
          </div>
          <div className="relative">
            <button 
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical size={18} className="text-gray-500" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-8 z-10 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                <div className="py-1">
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      onEdit(job.id);
                      setShowMenu(false);
                    }}
                  >
                    <Edit size={16} className="mr-2" />
                    Edit
                  </button>
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      onToggleStatus(job.id);
                      setShowMenu(false);
                    }}
                  >
                    <Pause size={16} className="mr-2" />
                    {/* Updated status check */}
                    {job.status === 'ACTIVE' ? 'Pause' : 'Activate'}
                  </button>
                  
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 flex items-center"
                    onClick={() => {
                      setIsDeleteModalOpen(true); // Open delete confirmation modal
                      setShowMenu(false);
                    }}
                  >
                    <Trash2 size={16} className="mr-2 text-red-500" />
                    <span className="text-red-500">Delete</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Updated to display salary range and currency */}
        {job.salary && (
          <p className="text-gray-700 mt-2 font-medium">{`${job.salary.min} - ${job.salary.max} ${job.salary.currency} ${job.salary.unit}`}</p>
        )}
        
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-xs font-medium py-1 px-2 rounded-full bg-blue-50 text-blue-700">
            {/* Updated to jobType */}
            {job.jobType}
          </span>
          <span className="text-xs font-medium py-1 px-2 rounded-full bg-purple-50 text-purple-700">
            {/* Updated to yearsOfExperience, consider mapping to a level string if needed */}
            {`${job.yearsOfExperience} YoE`}
          </span>
          <span className={`text-xs font-medium py-1 px-2 rounded-full ${statusStyles[job.status]}`}>
            {job.status}
          </span>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm text-gray-500">Posted</p>
                {/* Updated to createdAt and using formatDate */}
                <p className="text-sm font-medium">{formatDate(job.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Applications</p>
                {/* Assuming candidatesIds length can represent applications count */}
                <p className="text-sm font-medium">{job.candidatesIds ? job.candidatesIds.length : 0}</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              
              {/* Link to the job details page from ExternalLink icon as well, or use it for actual external links if job.url is present */}
              <Link to={`/jobs/${job.id}`} className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View job details">
                  <ExternalLink size={18} />
              </Link>
              {/* Or, if job.url is meant to be an external public page, keep it as is and rely on title link:
              {job.url && (
                <a href={job.url} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View public page">
                  <ExternalLink size={18} />
                </a>
              )} */}
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          onDelete(job.id);
          setIsDeleteModalOpen(false);
        }}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the opportunity "${job.title}"? This action cannot be undone.`}
        confirmButtonText="Delete"
      />
    </>
  );
};

export default JobCard;