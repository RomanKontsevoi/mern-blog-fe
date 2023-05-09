import axios from 'axios'

export const baseURL = 'http://localhost:4444'

const instance = axios.create({
  baseURL: `${baseURL}/`,
})

instance.interceptors.request
  .use((config) => {
    config.headers.Authorization = localStorage
      .getItem('token')

    return config
  })

export default instance
