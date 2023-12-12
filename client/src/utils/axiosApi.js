import axios from 'axios'

const axiosApi = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
})
export const baseURL = 'http://localhost:3000/api/'
export const baseURLclient = 'http://localhost:5174/'
export default axiosApi
