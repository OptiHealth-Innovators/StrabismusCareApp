// services/api/medicalRecordService.ts
import apiClient from './config';

export const medicalRecordService = {
  getPatientRecords: async (patientId: string) => {
    try {
      const response = await apiClient.get(`/reports/patient/${patientId}`);
      
      // Log the response structure to help with debugging
      console.log(`Response for patient ${patientId}:`, 
        response.data ? 
          (Array.isArray(response.data) ? 
            `Array with ${response.data.length} items` : 
            `Object with keys: ${Object.keys(response.data).join(', ')}`) : 
          'No data'
      );
      
      return response;
    } catch (error) {
      console.error(`Error fetching records for patient ${patientId}:`, error);
      throw error;
    }
  },
  
  getReportById: (reportId: string) => {
    return apiClient.get(`/reports/${reportId}`);
  },
  
  createReport: (reportData: any) => {
    return apiClient.post('/reports', reportData);
  },
  
  updateReport: (reportId: string, reportData: any) => {
    return apiClient.put(`/reports/${reportId}`, reportData);
  },
  
  deleteReport: (reportId: string) => {
    return apiClient.delete(`/reports/${reportId}`);
  }
};
