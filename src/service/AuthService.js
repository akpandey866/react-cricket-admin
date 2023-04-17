import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL
const login = async (data) => {
  const response = await axios.post(API_URL + 'login', data)
  return response.data
}

const AuthService = {
  login,
}

export default AuthService
