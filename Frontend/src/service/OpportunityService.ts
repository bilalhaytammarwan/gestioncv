import axios  from "axios";
export interface OpportunityCreationRequest {
    companyId: string;
    title: string;
    description: string;
    categoryId: string;
    createdAt: string; // Or Date
    updatedAt: string; // Or Date
    jobType: string; // Consider using an enum: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' etc.
    salary: {
        min: number;
        max: number;
        currency: string;
        unit: string; // Consider using an enum: 'ANNUALLY' | 'MONTHLY' | 'HOURLY' etc.
    };
    jobLocation: {
        city: string;
        region: string;
        country: string;
    };
    status: string; // Consider using an enum: 'ACTIVE' | 'INACTIVE' | 'CLOSED' etc.
    applicationDeadline: string; // Or Date
    remote: boolean;
    requirements: string[];
    responsibilities: string[];
    benefits: string[];
    yearsOfExperience: number;
}

export interface opportunity{
    id: string;
    companyId: string;
    title: string;
    description: string;
    categoryId: string;
    createdAt: string; // Or Date
    updatedAt: string; // Or Date
    jobType: string; // Consider using an enum: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' etc.
    salary: {
        min: number;
        max: number;
        currency: string;
        unit: string; // Consider using an enum: 'ANNUALLY' | 'MONTHLY' | 'HOURLY' etc.
    };
    jobLocation: {
        city: string;
        region: string;
        country: string;
    };
    status: string; // Consider using an enum: 'ACTIVE' | 'INACTIVE' | 'CLOSED' etc.
    applicationDeadline: string; // Or Date
    remote: boolean;
    requirements: string[];
    responsibilities: string[];
    benefits: string[];
    yearsOfExperience: number;
    tags: string[] | null; // Assuming tags would be an array of strings if not null
    url: string | null;
    candidatesIds: string[] | null;
}

export function GetAllOpportunities() {
    return axios.get(`http://localhost:8338/api/opportunity`,{headers:{
        'Content-Type':'application/json',
    }}).then((response) => {
        return response.data as opportunity}).catch((error) => {
        console.error("Error fetching opportunities:", error)});
}

export function CreateOpportunity(opportunity: OpportunityCreationRequest) {
    return axios.post(`http://localhost:8338/api/opportunity`, opportunity).then((response) => {
        return response.data as opportunity}).catch((error) => {
        console.error("Error creating opportunity:", error)});
}

// New function to get an opportunity by its ID
export const getOpportunityById = async (id: string): Promise<opportunity | null> => {
    try {
        const response = await axios.get(`http://localhost:8338/api/opportunity/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data as opportunity;
    } catch (error) {
        console.error(`Error fetching opportunity with ID ${id}:`, error);
        // Optionally, you could return a specific error object or re-throw
        // For now, returning null to indicate failure or not found
        return null;
    }
};

export const deleteOpportunity = async (id: string): Promise<void> => {
    try {
        await axios.delete(`http://localhost:8338/api/opportunity/${id}`);
    } catch (error) {
        console.error(`Error deleting opportunity with ID ${id}:`, error);
        // Optionally, re-throw the error or handle it as needed
        throw error;
    }
};

export const updateOpportunity = async (id: string, data: Partial<opportunity>): Promise<opportunity | null> => {
    try {
        const response = await axios.put(`http://localhost:8338/api/opportunity/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data as opportunity;
    } catch (error) {
        console.error(`Error updating opportunity with ID ${id}:`, error);
        return null;
    }
};

// Placeholder for fetching opportunities from mock data if needed for local development/testing
// import { mockOpportunities } from '../data/mockData'; // Make sure this path is correct

// export const getOpportunityByIdFromMock = async (id: number): Promise<opportunity | undefined> => {
//   console.log(`Fetching opportunity with ID from mock: ${id}`);
//   // Ensure mockOpportunities are correctly typed and id is a number or string as per your mock data
//   // The mockOpportunities in your mockData.ts might have 'id' as a string or number.
//   // Adjust the comparison accordingly. If 'id' in mockData is a string, convert 'id' param or mock 'id'.
//   return mockOpportunities.find(op => op.id === id.toString()); // Example if mock ID is string
//   // return mockOpportunities.find(op => op.id === id); // Example if mock ID is number
// };