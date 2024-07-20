import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'https://catfact.ninja',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json'}
})