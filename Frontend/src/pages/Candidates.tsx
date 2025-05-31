import React, { useState } from 'react';
import { Search, Filter, Download, Mail, CheckCircle, XCircle, Clock } from 'lucide-react';
import Header from '../components/layout/Header';
import { mockCandidates } from '../data/mockData';
import { Candidate } from '../types';

const CandidateCard: React.FC<{ candidate: Candidate }> = ({ candidate }) => {
  const statusStyles = {
    'Under Review': 'bg-blue-100 text-blue-800',
    'Shortlisted': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
    'Pending': 'bg-amber-100 text-amber-800'
  };

  const statusIcons = {
    'Under Review': <Clock size={16} className="mr-1" />,
    'Shortlisted': <CheckCircle size={16} className="mr-1" />,
    'Rejected': <XCircle size={16} className="mr-1" />,
    'Pending': <Clock size={16} className="mr-1" />
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-lg">
            {candidate.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
            <p className="text-gray-600">{candidate.jobTitle}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full flex items-center ${statusStyles[candidate.status]}`}>
          {statusIcons[candidate.status]}
          {candidate.status}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-600">{candidate.experience}</p>
        <p className="text-gray-600 mt-1">{candidate.location}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {candidate.skills.map((skill, index) => (
          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Applied {new Date(candidate.appliedDate).toLocaleDateString()} for {candidate.appliedRole}
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
            <Download size={18} />
          </button>
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
            <Mail size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Candidates: React.FC = () => {
  const [candidates] = useState<Candidate[]>(mockCandidates);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
          <p className="text-gray-600 mt-1">Review and manage job applications</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates by name, role, or skills..."
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
                <option value="Under Review">Under Review</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCandidates.map(candidate => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Candidates;