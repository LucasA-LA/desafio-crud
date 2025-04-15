import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Access-Key': process.env.NEXT_PUBLIC_API_KEY || '',
  },
});
