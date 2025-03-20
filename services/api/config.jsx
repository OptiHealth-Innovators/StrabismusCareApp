import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";

const ENV_BACKEND_URL = Constants.expoConfig?.extra?.BACKEND_URL;

const API_BASE_URL = "https://strabismuscare.onrender.com/";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
