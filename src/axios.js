import axios from 'axios'

export const baseURL = 'http://localhost:4444'

const instance = axios.create({
  baseURL: `${baseURL}/`,
});

export default instance
