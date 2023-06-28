import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API as string;

const TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
