import axios from 'axios'
import { ElMessage } from 'element-plus'
import { diffTokenTime } from '@/utils/auth'

const http = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: 'http://localhost:3003',
  timeout: 5000
})

http.interceptors.request.use(
  (config) => {
  
  },
  (error) => {
   
  }
)

http.interceptors.response.use(
  (response) => {

  },
  (error) => {
  
  }
)
export default http
