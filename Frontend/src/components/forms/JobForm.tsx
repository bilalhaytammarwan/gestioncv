import React, { useState, useEffect } from 'react'; // Added useEffect
import { X, Info } from 'lucide-react';
import { opportunity } from '../../service/OpportunityService'; // Updated import

interface JobFormProps {
  initialData?: Partial<opportunity>; // Changed Job to opportunity
  onSubmit: (data: Partial<opportunity>) => void; // Changed Job to opportunity
  onCancel: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  // Updated initial state to match opportunity interface
  const [formData, setFormData] = useState<Partial<opportunity>>(initialData || {
    title: '',
    description: '',
    jobLocation: { city: '', region: '', country: '' },
    salary: { min: 0, max: 0, currency: 'USD', unit: 'ANNUALLY' },
    requirements: [],
    responsibilities: [],
    benefits: [],
    jobType: 'FULL_TIME',
    yearsOfExperience: 0,
    status: 'ACTIVE',
    remote: false,
    applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default to 30 days from now, date part only
    categoryId: '' // Added categoryId
  });
  
  const [newRequirement, setNewRequirement] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const [newResponsibility, setNewResponsibility] = useState(''); // Added for responsibilities

  useEffect(() => {
    if (initialData) {
        // Ensure date strings are in YYYY-MM-DD format for date inputs
        const formattedInitialData = {
            ...initialData,
            applicationDeadline: initialData.applicationDeadline ? initialData.applicationDeadline.split('T')[0] : '',
            createdAt: initialData.createdAt ? initialData.createdAt.split('T')[0] : '',
            updatedAt: initialData.updatedAt ? initialData.updatedAt.split('T')[0] : '',
        };
      setFormData(formattedInitialData);
    }
  }, [initialData]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // Handle nested objects (salary, jobLocation)
    if (name.includes('.')) {
      const [objectName, fieldName] = name.split('.') as [keyof opportunity, string];
      setFormData(prev => ({
        ...prev,
        [objectName]: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          ...prev[objectName],
          [fieldName]: type === 'number' ? parseFloat(value) : value,
        }
      }));
    } else if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
    }
  };
  
  const handleRequirementAdd = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...(prev.requirements || []), newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const handleResponsibilityAdd = () => {
    if (newResponsibility.trim()) {
      setFormData(prev => ({
        ...prev,
        responsibilities: [...(prev.responsibilities || []), newResponsibility.trim()]
      }));
      setNewResponsibility('');
    }
  };
  
  const handleBenefitAdd = () => {
    if (newBenefit.trim()) {
      setFormData(prev => ({
        ...prev,
        benefits: [...(prev.benefits || []), newBenefit.trim()]
      }));
      setNewBenefit('');
    }
  };
  
  const handleRequirementRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements?.filter((_, i) => i !== index)
    }));
  };

  const handleResponsibilityRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities?.filter((_, i) => i !== index)
    }));
  };
  
  const handleBenefitRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits?.filter((_, i) => i !== index)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure applicationDeadline is in ISO string format before submitting
    const submissionData = {
        ...formData,
        applicationDeadline: formData.applicationDeadline ? new Date(formData.applicationDeadline).toISOString() : undefined
    };
    onSubmit(submissionData);
  };

  const nextStep = () => {
    if (currentStep === 1) {
      const { title, jobLocation, jobType, yearsOfExperience, status, applicationDeadline, categoryId } = formData;
      if (
        !title?.trim() ||
        !jobLocation?.city?.trim() ||
        !jobLocation?.region?.trim() ||
        !jobLocation?.country?.trim() ||
        !jobType?.trim() ||
        yearsOfExperience === undefined || yearsOfExperience < 0 ||
        !status?.trim() ||
        !applicationDeadline?.trim() ||
        !categoryId?.trim() // Assuming categoryId is required even if hidden
      ) {
        alert('Please fill all required fields in Basic Information before proceeding.');
        return;
      }
    } else if (currentStep === 2) {
      const { description, requirements, responsibilities } = formData;
      if (
        !description?.trim() ||
        !requirements || requirements.length === 0 ||
        !responsibilities || responsibilities.length === 0
      ) {
        alert('Please provide a job description, at least one requirement, and at least one responsibility.');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };
  const prevStep = () => setCurrentStep(prev => prev - 1);
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        {initialData?.id ? 'Edit Job Listing' : 'Create New Job Listing'} {/* Check for id for edit mode*/}
      </h2>
      <p className="text-sm text-gray-500 mb-2">Step {currentStep} of {totalSteps}</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
      
      <div className="space-y-6">
        {currentStep === 1 && (
          <>
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                
                {/* Updated for jobLocation */}
                <div>
                  <label htmlFor="jobLocation.city" className="block text-sm font-medium text-gray-700 mb-1">
                    City*
                  </label>
                  <input
                    type="text"
                    id="jobLocation.city"
                    name="jobLocation.city"
                    required
                    value={formData.jobLocation?.city || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="jobLocation.region" className="block text-sm font-medium text-gray-700 mb-1">
                    Region/State*
                  </label>
                  <input
                    type="text"
                    id="jobLocation.region"
                    name="jobLocation.region"
                    required
                    value={formData.jobLocation?.region || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="jobLocation.country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country*
                  </label>
                  <input
                    type="text"
                    id="jobLocation.country"
                    name="jobLocation.country"
                    required
                    value={formData.jobLocation?.country || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                
                {/* Updated for jobType */}
                <div>
                  <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type*
                  </label>
                  <select
                    id="jobType"
                    name="jobType"
                    required
                    value={formData.jobType || 'FULL_TIME'}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="FULL_TIME">Full-time</option>
                    <option value="PART_TIME">Part-time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="TEMPORARY">Temporary</option>
                    <option value="INTERNSHIP">Internship</option>
                  </select>
                </div>
                
                {/* Updated for yearsOfExperience */}
                <div>
                  <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience*
                  </label>
                  <input
                    type="number"
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    required
                    value={formData.yearsOfExperience || 0}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                
                {/* Status field */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status*
                  </label>
                  <select
                    id="status"
                    name="status"
                    required
                    value={formData.status || 'ACTIVE'}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>

                {/* Application Deadline */}
                <div>
                  <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700 mb-1">
                    Application Deadline*
                  </label>
                  <input
                    type="date"
                    id="applicationDeadline"
                    name="applicationDeadline"
                    required
                    value={formData.applicationDeadline ? formData.applicationDeadline.split('T')[0] : ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Remote option */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remote"
                    name="remote"
                    checked={formData.remote || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="remote" className="ml-2 block text-sm text-gray-900">
                    Remote
                  </label>
                </div>

                {/* Category ID (Hidden) */}
                <input
                    type="hidden"
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId || ''} 
                    onChange={handleInputChange} 
                />
              </div>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            {/* Description */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Job Details</h3>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Job Description*
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={5}
                value={formData.description || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            
            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Requirements*
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  placeholder="Add a requirement"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleRequirementAdd();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleRequirementAdd}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-r-lg hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
              
              <div className="mt-2 space-y-2">
                {formData.requirements?.map((req, index) => (
                  <div key={index} className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                    <span className="flex-grow">{req}</span>
                    <button
                      type="button"
                      onClick={() => handleRequirementRemove(index)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Responsibilities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Responsibilities*
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={newResponsibility}
                  onChange={(e) => setNewResponsibility(e.target.value)}
                  placeholder="Add a responsibility"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleResponsibilityAdd();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleResponsibilityAdd}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-r-lg hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
              
              <div className="mt-2 space-y-2">
                {formData.responsibilities?.map((resp, index) => (
                  <div key={index} className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                    <span className="flex-grow">{resp}</span>
                    <button
                      type="button"
                      onClick={() => handleResponsibilityRemove(index)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            {/* Salary & Benefits */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Compensation & Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Updated for Salary object */}
                <div>
                  <label htmlFor="salary.min" className="block text-sm font-medium text-gray-700 mb-1">
                    Min Salary
                  </label>
                  <input
                    type="number"
                    id="salary.min"
                    name="salary.min"
                    placeholder="50000"
                    value={formData.salary?.min || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="salary.max" className="block text-sm font-medium text-gray-700 mb-1">
                    Max Salary
                  </label>
                  <input
                    type="number"
                    id="salary.max"
                    name="salary.max"
                    placeholder="100000"
                    value={formData.salary?.max || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="salary.currency" className="block text-sm font-medium text-gray-700 mb-1">
                    Currency
                  </label>
                  <input
                    type="text"
                    id="salary.currency"
                    name="salary.currency"
                    placeholder="USD"
                    value={formData.salary?.currency || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="salary.unit" className="block text-sm font-medium text-gray-700 mb-1">
                    Salary Unit
                  </label>
                  <select
                    id="salary.unit"
                    name="salary.unit"
                    value={formData.salary?.unit || 'ANNUALLY'}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="ANNUALLY">Annually</option>
                    <option value="MONTHLY">Monthly</option>
                    <option value="HOURLY">Hourly</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Benefits
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  placeholder="Add a benefit"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleBenefitAdd();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleBenefitAdd}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-r-lg hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
              
              <div className="mt-2 space-y-2">
                {formData.benefits?.map((benefit, index) => (
                  <div key={index} className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                    <span className="flex-grow">{benefit}</span>
                    <button
                      type="button"
                      onClick={() => handleBenefitRemove(index)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tip box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
              <Info size={20} className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-800">Posting Tips</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Be specific about requirements and include salary information to attract more qualified candidates. 
                  Listings with complete information receive 35% more applications.
                </p>
              </div>
            </div>
          </>
        )}
        
        {/* Form actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
          <div className="flex space-x-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            )}
            {currentStep < 3 && (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            )}
            {currentStep === 3 && (
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                {initialData?.id ? 'Save Changes' : 'Create Job'}
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default JobForm;