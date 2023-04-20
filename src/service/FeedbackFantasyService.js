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
const manageAccessByTeam = async (data) => {
  const response = await agent.get(`${API_URL}feedback-fantasy/manage-access-by-team`)
  return response.data
}
const manageAccessByFixture = async (data) => {
  const response = await agent.get(`${API_URL}feedback-fantasy/manage-access-by-fixtures`)
  return response.data
}
const saveManageAccessByTeam = async (data) => {
  const response = await agent.post(API_URL + 'feedback-fantasy/save-manage-access-by-team', data)
  return response.data
}
const saveManageAccessByFixture = async (data) => {
  const response = await agent.post(
    API_URL + 'feedback-fantasy/save-manage-access-by-fixtures',
    data,
  )
  return response.data
}
const showFixtureListing = async (id) => {
  const response = await agent.get(`${API_URL}feedback-fantasy/show-fixture-listing/${id}`)
  return response.data
}

const deleteManagerFixture = async (id, managerAccessId) => {
  const response = await agent.get(
    `${API_URL}feedback-fantasy/delete-manager-fixture/${id}/${managerAccessId}`,
  )
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
  manageAccessByTeam,
  saveManageAccessByTeam,
  manageAccessByFixture,
  saveManageAccessByFixture,
  showFixtureListing,
  deleteManagerFixture,
}

export default FeedbackFantasyService
