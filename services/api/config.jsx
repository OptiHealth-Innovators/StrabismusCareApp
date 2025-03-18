// services/api/config.js
import axios from 'axios';
import { Platform } from 'react-native';

const API_BASE_URL = Platform.OS === 'android' 
  ? 'http://192.168.87.140:3000'  // Android emulator
  : 'http://localhost:3000'; // iOS simulator
console.log('API_BASE_URL: ', API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
