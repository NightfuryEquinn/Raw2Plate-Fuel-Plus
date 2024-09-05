import axios from "axios";
import { SPOON_API_KEY } from "@env"

export const awsInstance = axios.create({
  baseURL: "https://09iit52o0k.execute-api.us-east-1.amazonaws.com/Prod/api",
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

export const spoonInstance = axios.create({
  baseURL: "https://api.spoonacular.com",
  timeout: 10000,
  headers: { 
    'Content-Type': 'application/json',
    'x-api-key': `${ SPOON_API_KEY }`
  }
})