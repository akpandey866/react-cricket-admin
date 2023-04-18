import { agent } from '../utils/agent'
const API_URL = process.env.REACT_APP_API_URL
const getCategory = async (offset, itemsPerPage, activePage, params) => {
  const response = await agent.get(
    `${API_URL}feedback-fantasy/category-listing?offset=${offset}&limit=${itemsPerPage}&page=${activePage}&${params}`,
  )
  return response.data
}
const saveCategory = async (data) => {
  const response = await agent.post(API_URL + 'feedback-fantasy/save-category', data)
  return response.data
}
const editCategory = async (data) => {
  const response = await agent.post(API_URL + 'feedback-fantasy/edit-category', data)
  return response.data
}

const getCategoryDetail = async (id) => {
  const response = await agent.get(`${API_URL}feedback-fantasy/category-details/${id}`)
  return response.data
}

const managerListing = async (id) => {
  const response = await agent.get(`${API_URL}feedback-fantasy/managers-listing`)
  return response.data
}
const deleteCategory = async (data) => {
  const response = await agent.post(API_URL + 'feedback-fantasy/delete-category', data)
  return response.data
}
const saveFeedbackManager = async (data) => {
  const response = await agent.post(API_URL + 'feedback-fantasy/save-manager', data)
  return response.data
}
const deleteFeedbackManager = async (data) => {
  const response = await agent.post(API_URL + 'feedback-fantasy/delete-manager', data)
  return response.data
}
const FeedbackFantasyService = {
  getCategory,
  saveCategory,
  editCategory,
  getCategoryDetail,
  deleteCategory,
  managerListing,
  saveFeedbackManager,
  deleteFeedbackManager,
}

export default FeedbackFantasyService
