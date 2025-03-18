// services/api/doctorService.tsx
import apiClient from './config';

// Define types for the data structures
interface Doctor {
  id: string | number;
  name: string;
  // Add other doctor properties as needed
}

interface SearchParams {
  specialty?: string;
  location?: string;
  availability?: string;
  // Add other search parameters as needed
}

interface AppointmentData {
  doctorId: string | number;
  patientId: string | number;
  date: string;
  time: string;
  // Add other appointment properties as needed
}

export const doctorService = {
  getAllDoctors: async (): Promise<Doctor[]> => {
    try {
      const response = await apiClient.get('/doctors');
      return response.data;
    } catch (error: any) {
      // More specific error handling
      if (error.code === 'ERR_NETWORK') {
        console.error('Network error - check if backend is running:', error);
        throw new Error('Cannot connect to server. Please check your internet connection.');
      }
      console.error('Error fetching doctors:', error);
      throw error;
    }
  },
  
  getDoctorById: async (id: string | number): Promise<Doctor> => {
    try {
      const response = await apiClient.get(`/doctors/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching doctor with id ${id}:`, error);
      throw error;
    }
  },
  
  searchDoctors: async (searchParams: SearchParams): Promise<Doctor[]> => {
    try {
      const response = await apiClient.get('/doctors/search', { params: searchParams });
      return response.data;
    } catch (error: any) {
      console.error('Error searching doctors:', error);
      throw error;
    }
  },
  
  bookAppointment: async (appointmentData: AppointmentData): Promise<any> => {
    try {
      const response = await apiClient.post('/appointments', appointmentData);
      return response.data;
    } catch (error: any) {
      console.error('Error booking appointment:', error);
      throw error;
    }
  }
};
