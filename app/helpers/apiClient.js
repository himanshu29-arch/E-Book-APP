import {BASE_URL} from '../constants/storageKeys';
import axios from 'axios';
export const apiClient = axios.create({
  baseURL: `${BASE_URL}`, // Replace with your base URL
});
