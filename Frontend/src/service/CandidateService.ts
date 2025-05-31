import axios from 'axios'; // Import axios
import { Candidate } from '../types'; // Assuming Candidate type is defined in types.ts
import { mockCandidates } from '../data/mockData'; // Assuming mock candidate data

// Simulates fetching candidates for a specific opportunity ID
export const getCandidatesByOpportunityId = async (opportunityId: string): Promise<Candidate[]> => {
  console.log(`Fetching candidates for opportunity ID: ${opportunityId}`);
  try {
    const response = await axios.get(`http://localhost:8338/api/opportunity/${opportunityId}/candidate`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data as Candidate[];
  } catch (error) {
    console.error(`Error fetching candidates for opportunity ID ${opportunityId}:`, error);
    // Return an empty array or throw the error, depending on how you want to handle errors
    return []; 
  }
};

// Simulates fetching a candidate by their ID
export const getCandidateById = async (candidateId: string): Promise<Candidate | undefined> => {
  console.log(`Fetching candidate with ID: ${candidateId}`);
  return mockCandidates.find(candidate => candidate.id === candidateId);
};

// Add more candidate-related service functions as needed (e.g., addCandidate, updateCandidate)
