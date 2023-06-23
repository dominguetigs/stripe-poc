import axios from 'axios'

const authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ''

export const api = axios.create({
  baseURL: 'http://localhost:3333/api/v1',
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
})
