import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { opportunity, getOpportunityById, updateOpportunity } from '../service/OpportunityService'; // Assuming updateOpportunity exists
import JobForm from '../components/forms/JobForm'; // To edit the opportunity

const EditOpportunityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState<opportunity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const fetchOpportunityDetails = async () => {
        try {
          setLoading(true);
          const oppDetails = await getOpportunityById(id);
          if (oppDetails) {
            setOpportunity(oppDetails);
          } else {
            setError('Opportunity not found.');
          }
        } catch (err) {
          setError('Failed to fetch opportunity details.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchOpportunityDetails();
    } else {
      setError("No opportunity ID provided.");
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (data: Partial<opportunity>) => {
    if (!id) {
      setError("Cannot update without an opportunity ID.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      // Assuming updateOpportunity takes the id and the data
      await updateOpportunity(id, data as opportunity); 
      // Navigate back to the details page or a list page after successful update
      navigate(`/jobs/${id}`); // Or to a success page or list
    } catch (err) {
      setError('Failed to update opportunity.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <p className="text-lg font-semibold text-gray-700">Loading opportunity details...</p>
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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <p className="text-lg font-semibold text-gray-700">Opportunity not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-6 md:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
            Edit Opportunity: {opportunity.title}
          </h1>
          <JobForm
            initialData={opportunity}
            onSubmit={handleSubmit}
            onCancel={() => navigate(id ? `/jobs/${id}` : '/jobs')} // Navigate back on cancel
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default EditOpportunityPage;
