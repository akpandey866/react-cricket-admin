import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL
const agent = axios.create({
  baseURL: API_URL,
})

agent.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('token'))
  if (!token) {
    window.location.href = '/login'
    return config
  }
  config = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
      //'Content-Type': 'application/json',
    },
  }

  return config
})

agent.interceptors.response.use(
  function (response) {
    if (response.data.status === false) {
      localStorage.removeItem('admin')
      window.location.href = '/login'
    }
    return response
  },
  function (error) {
    if (error.response.data.message === 'Unauthenticated.') {
      localStorage.removeItem('persist:root')
      window.location.href = '/'
    }
    return Promise.reject(error.response.data)
  },
)

export { agent }
