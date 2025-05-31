import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { opportunity } from '../service/OpportunityService'; // Assuming Opportunity type is defined here
import { getOpportunityById } from '../service/OpportunityService'; // Assuming a service to fetch opportunity by ID
import { getCandidatesByOpportunityId } from '../service/CandidateService'; // Assuming a service to fetch candidates by opportunity ID
import { Candidate } from '../types'; // Assuming Candidate type is defined here

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [opportunity, setOpportunity] = useState<opportunity | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchJobDetails = async () => {
        try {
          setLoading(true);
          
          const oppDetails = await getOpportunityById(id);
          setOpportunity(oppDetails);

          if (oppDetails) {
            // Ensure 'id' passed to getCandidatesByOpportunityId matches the expected type (string from useParams)
            const cands = await getCandidatesByOpportunityId(id); 
            setCandidates(cands);
          } else {
            // If opportunity details are null, no need to fetch candidates or could set error
            setError('Job offer not found.');
          }
          // setError(null); // This was potentially clearing the "Job offer not found" error
        } catch (err) {
          setError('Failed to fetch job details.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchJobDetails();
    } else {
        setError("No job ID provided.");
        setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <p className="text-lg font-semibold text-gray-700">Loading job details...</p>
          {/* You could add a spinner here */}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-6 bg-white shadow-lg rounded-lg text-red-600">
          <p className="text-lg font-semibold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!opportunity) {
    // This case should ideally be covered by the error state if getOpportunityById returns null and sets an error.
    // If getOpportunityById could return null without error (e.g. 404), this is fine.
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="p-6 bg-white shadow-lg rounded-lg">
                <p className="text-lg font-semibold text-gray-700">Job offer not found.</p>
            </div>
        </div>
    );
  }

  const {
    title,
    jobLocation,
    jobType,
    yearsOfExperience,
    status,
    applicationDeadline,
    description,
    requirements,
    responsibilities,
    salary, // Use the salary object
    benefits,
    companyId, // Using companyId as companyName is not available
    remote
  } = opportunity;

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Job Header */}
        <div className="bg-white shadow-xl rounded-lg p-6 md:p-8 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">{title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 mb-4">
            {/* Assuming companyId is what we have. Ideally, fetch company name. */}
            <p className="text-lg mr-3">Company ID: {companyId}</p>
            <p className="text-lg mr-3">{jobLocation.city}, {jobLocation.region}, {jobLocation.country}</p>
            {remote && <span className="text-sm font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Remote</span>}
          </div>
          <button 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-lg transition duration-150 ease-in-out"
            onClick={() => alert('Apply functionality not implemented yet.')}
          >
            Refresh
          </button>
        </div>

        {/* Main Content Area */}
        <div className="bg-white shadow-xl rounded-lg p-6 md:p-8">
          {/* Key Information Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 pb-6 border-b border-gray-200">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Job Type</h3>
              <p className="text-lg text-gray-800">{jobType}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Experience</h3>
              <p className="text-lg text-gray-800">{yearsOfExperience} years</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Deadline</h3>
              <p className="text-lg text-gray-800">{new Date(applicationDeadline).toLocaleDateString()}</p>
            </div>
            {salary && (salary.min || salary.max) && (
              <div className="sm:col-span-2 lg:col-span-1">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Salary</h3>
                <p className="text-lg text-gray-800">
                  {salary.min ? `${salary.currency || '$'}${salary.min.toLocaleString()}` : 'N/A'} - 
                  {salary.max ? `${salary.currency || '$'}${salary.max.toLocaleString()}` : 'N/A'}
                  {salary.unit && <span className="text-sm"> /{salary.unit.toLowerCase()}</span>}
                </p>
              </div>
            )}
             <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Status</h3>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${ status === 'ACTIVE' ? 'bg-green-100 text-green-800' : status === 'INACTIVE' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800' }`}>
                {status}
              </span>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Job Description</h2>
            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
              {description}
            </div>
          </div>

          {/* Requirements */}
          {requirements && requirements.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Requirements</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700 pl-4">
                {requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Responsibilities */}
          {responsibilities && responsibilities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Responsibilities</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700 pl-4">
                {responsibilities.map((res, index) => (
                  <li key={index}>{res}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {benefits && benefits.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Benefits</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700 pl-4">
                {benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Candidates Section */}
        <div className="mt-8 bg-white shadow-xl rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Candidates ({candidates.length})</h2>
          {candidates.length > 0 ? (
            <div className="space-y-4">
              {candidates.map(candidate => (
                <div key={candidate.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-blue-600">{candidate.name}</h3>
                  <p className="text-sm text-gray-600">{candidate.email}</p>
                  {/* You can add more candidate details here, e.g., status, applied date */}
                  {/* Example: <p className="text-sm text-gray-500">Status: {candidate.status}</p> */}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 italic">No candidates have applied for this job yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
