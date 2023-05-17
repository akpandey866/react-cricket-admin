import { agent } from '../utils/agent'
const API_URL = process.env.REACT_APP_API_URL
const getUser = async (offset = 0, itemsPerPage = 0, activePage = 0, params = 0) => {
  const response = await agent.get(
    `${API_URL}users/listing?offset=${offset}&limit=${itemsPerPage}&page=${activePage}&${params}`,
  )
  return response.data
}
const saveUser = async (data) => {
  const response = await agent.post(API_URL + 'users/save-user', data)
  return response.data
}
const editUser = async (data) => {
  const response = await agent.post(API_URL + 'users/edit-user', data)
  return response.data
}
const getUserDetail = async (id) => {
  const response = await agent.get(`${API_URL}users/user-details/${id}`)
  return response.data
}
const deleteUser = async (data) => {
  const response = await agent.post(API_URL + 'users/delete-user', data)
  return response.data
}

const userData = async (data) => {
  const response = await agent.get(`${API_URL}users/user-data`)
  return response.data
}
const markAsPaidOrUnPaid = async (roleId, userId, status) => {
  const response = await agent.get(
    `${API_URL}users/update-paid-status/${roleId}/${userId}/${status}`,
  )
  return response.data
}
const paidUserListing = async (roleId, id, status) => {
  const response = await agent.get(`${API_URL}users/paid-user-listing`)
  return response.data
}

const UserService = {
  getUser,
  saveUser,
  deleteUser,
  getUserDetail,
  editUser,
  userData,
  markAsPaidOrUnPaid,
  paidUserListing,
}

export default UserService
