import axios from 'axios';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

const ENV_BACKEND_URL = Constants.expoConfig?.extra?.BACKEND_URL;

const API_BASE_URL = Platform.OS === 'android' 
  ? ENV_BACKEND_URL 
  : Platform.OS === 'ios' 
    ? 'http://localhost:3000'
    : ENV_BACKEND_URL;

console.log('API_BASE_URL: ', API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
