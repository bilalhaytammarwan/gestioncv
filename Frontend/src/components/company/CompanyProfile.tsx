import React, { useState } from 'react';
import { Edit, Building, MapPin, Globe, Users, Briefcase, Save } from 'lucide-react';
import { Company } from '../../types';

interface CompanyProfileProps {
  company: Company;
  onUpdate: (data: Partial<Company>) => void;
}

const CompanyProfile: React.FC<CompanyProfileProps> = ({ company, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Company>(company);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400"></div>
      
      <div className="px-6 pt-0 pb-6 relative">
        {/* Logo */}
        <div className="w-24 h-24 bg-white rounded-lg shadow-md border border-gray-200 absolute -top-12 overflow-hidden">
          {company.logo ? (
            <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-blue-100 flex items-center justify-center">
              <Building size={32} className="text-blue-600" />
            </div>
          )}
        </div>
        
        {/* Edit button */}
        <div className="flex justify-end mb-4">
          {!isEditing ? (
            <button 
              className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setIsEditing(true)}
            >
              <Edit size={16} className="mr-1" />
              Edit Profile
            </button>
          ) : (
            <button 
              className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleSubmit}
            >
              <Save size={16} className="mr-1" />
              Save Changes
            </button>
          )}
        </div>
        
        {!isEditing ? (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mt-6">{company.name}</h1>
            
            <div className="flex flex-wrap gap-y-2 mt-3">
              <div className="w-full md:w-1/2 flex items-center">
                <MapPin size={18} className="text-gray-500 mr-2" />
                <span className="text-gray-700">{company.location}</span>
              </div>
              <div className="w-full md:w-1/2 flex items-center">
                <Globe size={18} className="text-gray-500 mr-2" />
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {company.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
              <div className="w-full md:w-1/2 flex items-center">
                <Briefcase size={18} className="text-gray-500 mr-2" />
                <span className="text-gray-700">{company.industry}</span>
              </div>
              <div className="w-full md:w-1/2 flex items-center">
                <Users size={18} className="text-gray-500 mr-2" />
                <span className="text-gray-700">{company.size}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
              <p className="text-gray-700">
                {company.description}
              </p>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location*
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website*
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  required
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                  Industry*
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  required
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Size*
                </label>
                <select
                  id="size"
                  name="size"
                  required
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="1-10 employees">1-10 employees</option>
                  <option value="11-50 employees">11-50 employees</option>
                  <option value="50-200 employees">50-200 employees</option>
                  <option value="201-500 employees">201-500 employees</option>
                  <option value="501-1000 employees">501-1000 employees</option>
                  <option value="1000+ employees">1000+ employees</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  About the Company*
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
                  Logo URL
                </label>
                <input
                  type="url"
                  id="logo"
                  name="logo"
                  value={formData.logo || ''}
                  onChange={handleInputChange}
                  placeholder="https://example.com/logo.png"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Enter a URL to your company logo (optional).
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;