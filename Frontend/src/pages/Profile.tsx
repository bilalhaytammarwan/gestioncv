import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, Mail, Phone, Calendar, MapPin, UserRound } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Dialog } from '@headlessui/react'; // Make sure you install this via `npm i @headlessui/react`


interface MissingField {
  label: string;
  value: any;
}

const calculateCompletion = (candidate: Candidate): { percentage: number; missingFields: MissingField[] } => {
  const totalFields = 6;
  const fields: MissingField[] = [
    { label: 'Name', value: candidate.nom },
    { label: 'Email', value: candidate.email },
    { label: 'Phone', value: candidate.telephone },
    { label: 'Description', value: candidate.description },
    { label: 'Age', value: candidate.age },
    { label: 'Gender', value: candidate.sexe },
  ];

  const filledFields = fields.filter(f => f.value && f.value !== '' && f.value !== null);
  const missingFields = fields.filter(f => !f.value || f.value === '' || f.value === null);
  const percentage = Math.round((filledFields.length / totalFields) * 100);

  return { percentage, missingFields };
};


// Types
enum Role {
  ADMIN = "ADMIN",
  CANDIDATE = "CANDIDATE",
  COMPANY = "COMPANY"
}

enum Sexe {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER"
}

interface User {
  id: string;
  nom: string;
  telephone: string;
  email: string;
  description: string;
  dureeUtilisation: Date;
  role: Role;
  ville: string;
}

interface Candidate extends User {
  age: string;
  sexe: Sexe;
}

// Components
const Badge: React.FC<{ children: React.ReactNode; variant?: 'default' | 'secondary' | 'outline' | 'success'; className?: string }> = ({ 
  children, 
  variant = 'default',
  className = ''
}) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  const variantClasses = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-700",
    success: "bg-green-100 text-green-800",
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

const ProfileAvatar: React.FC<{ name: string; imageUrl?: string; size?: 'sm' | 'md' | 'lg' | 'xl' }> = ({ 
  name, 
  imageUrl,
  size = 'lg'
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-2xl',
    md: 'w-16 h-16 text-3xl',
    lg: 'w-24 h-24 text-5xl',
    xl: 'w-32 h-32 text-6xl'
  };
  
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  if (imageUrl) {
    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-4 border-white shadow-md`}>
        <img 
          src={imageUrl} 
          alt={`${name}'s profile`}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  
  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium shadow-md border-4 border-white`}>
      {initials}
    </div>
  );
};

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md ${className}`}>
    {children}
  </div>
);

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileCompletion, setProfileCompletion] = useState(0);
    const [missingFields, setMissingFields] = useState<MissingField[]>([]);
    const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchCandidate = async () => {
  try {
    const response = await axios.get<Candidate>(`http://localhost:8228/api/user/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        });

        const candidateData = {
        ...response.data,
        dureeUtilisation: new Date(response.data.dureeUtilisation)
        };

        setCandidate(candidateData);
        const { percentage, missingFields } = calculateCompletion(candidateData);
        setProfileCompletion(percentage);
        setMissingFields(missingFields);
        if (missingFields.length > 0) {
        setShowPopup(true);
        }
        setLoading(false);
    } catch (err) {
        setError('Failed to load candidate profile');
        setLoading(false);
    }
    };

    fetchCandidate();
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };

  const formatGender = (sexe: Sexe) => {
    switch (sexe) {
      case Sexe.MALE:
        return 'Male';
      case Sexe.FEMALE:
        return 'Female';
      case Sexe.OTHER:
        return 'Other';
      default:
        return 'Not specified';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600">{error || 'Failed to load profile data'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-4 py-8">
        <div className="bg-white overflow-hidden shadow-sm rounded-xl">
          {/* Profile Header */}
          <div className="relative">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-xl"></div>
            <div className="relative px-6 pb-5 -mt-12">
              <div className="flex flex-col md:flex-row md:items-end">
                <div className="z-10 mb-4 md:mb-0">
                  <ProfileAvatar name={candidate.nom} size="xl" />
                </div>
                <div className="md:ml-6 flex-1">
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">{candidate.nom}</h1>
                        <div className="flex items-center mt-1 text-gray-600">
                          <MapPin size={16} className="mr-1" />
                          <span>{candidate.ville}</span>
                        </div>
                      </div>
                      <div className="mt-3 md:mt-0">
                        <Badge variant="default">Candidate</Badge>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail size={16} className="mr-2 text-blue-500" />
                        <a href={`mailto:${candidate.email}`} className="hover:text-blue-600 transition-colors">
                          {candidate.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone size={16} className="mr-2 text-blue-500" />
                        <a href={`tel:${candidate.telephone}`} className="hover:text-blue-600 transition-colors">
                          {candidate.telephone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-blue-500" />
                        <span>Member since {formatDate(candidate.dureeUtilisation)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">About</h2>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 leading-relaxed">
                    {candidate.description || 'No description provided.'}
                  </p>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <UserRound size={20} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Age</p>
                        <p className="text-base text-gray-900">{candidate.age || 'Not specified'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <User size={20} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Gender</p>
                        <p className="text-base text-gray-900">{formatGender(candidate.sexe)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <MapPin size={20} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="text-base text-gray-900">{candidate.ville}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Calendar size={20} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Member Since</p>
                        <p className="text-base text-gray-900">
                          {new Intl.DateTimeFormat('en-US', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          }).format(candidate.dureeUtilisation)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="p-5 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Status</h2>
                </div>
                <div className="p-5">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                        <span className="text-sm font-medium text-gray-700">{profileCompletion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${profileCompletion}%` }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Resume</span>
                        <span className="text-sm font-medium text-gray-700">Pending</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                        Complete Your Profile
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Profile;