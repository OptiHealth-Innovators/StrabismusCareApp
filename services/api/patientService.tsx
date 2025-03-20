// services/api/patientService.ts
import apiClient from './config'; // Import the configured apiClient

// Define TypeScript interfaces for better type safety
interface Patient {
  _id: string;
  name: string;
  age: number;
  gender: string;
  medicalHistory: string[];
  allergies?: string[];
  medications?: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>;
  lastVisit?: string;
  upcomingAppointment?: string;
  bloodType?: string;
  profileImage?: string;
  contact?: any;
  vitals?: any;
  insuranceInfo?: any;
  emergencyContact?: any;
  notes?: string;
  status?: string;
  updatedAt?: string;
}

interface SearchParams {
  name?: string;
  medicalHistory?: string;
  // Add other search parameters as needed
}

// Create and export the patientService object
export const patientService = {
  // Method to get all patients
  getAllPatients: async () => {
    try {
      const response = await apiClient.get(`/patients`);
      return response;
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  },
  
  // Method to search patients
  searchPatients: async (params: SearchParams) => {
    try {
      const response = await apiClient.get('/patients', { params });
      return response;
    } catch (error) {
      console.error('Error searching patients:', error);
      throw error;
    }
  },
  
  // Method to get a single patient by ID
  getPatientById: async (patientId: string) => {
    try {
      const response = await apiClient.get(`/patients/${patientId}`);
      return response;
    } catch (error) {
      console.error(`Error fetching patient with ID ${patientId}:`, error);
      throw error;
    }
  },
  
  // Add other patient-related methods as needed
};

// Export the Patient interface to be used in other files
export type { Patient, SearchParams };
