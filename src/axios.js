import axios from 'axios'

console.log(process)

export const baseURL = process.env.BASE_SERVER_URL

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
