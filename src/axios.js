import axios from 'axios'

export const baseURL = process.env.REACT_APP_BASE_SERVER_URL

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
