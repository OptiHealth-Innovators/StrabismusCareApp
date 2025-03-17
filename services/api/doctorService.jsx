// services/api/doctorService.js
import apiClient from './config';

export const doctorService = {
  getAllDoctors: async () => {
    try {
      const response = await apiClient.get('/doctors');
      return response.data;
    } catch (error) {
      // More specific error handling
      if (error.code === 'ERR_NETWORK') {
        console.error('Network error - check if backend is running:', error);
        throw new Error('Cannot connect to server. Please check your internet connection.');
      }
      console.error('Error fetching doctors:', error);
      throw error;
    }
  },
  
  getDoctorById: async (id) => {
    try {
      const response = await apiClient.get(`/doctors/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching doctor with id ${id}:`, error);
      throw error;
    }
  },
  
  searchDoctors: async (searchParams) => {
    try {
      const response = await apiClient.get('/doctors/search', { params: searchParams });
      return response.data;
    } catch (error) {
      console.error('Error searching doctors:', error);
      throw error;
    }
  },
  
  bookAppointment: async (appointmentData) => {
    try {
      const response = await apiClient.post('/appointments', appointmentData);
      return response.data;
    } catch (error) {
      console.error('Error booking appointment:', error);
      throw error;
    }
  }
};
