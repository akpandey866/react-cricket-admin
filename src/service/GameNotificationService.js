import { agent } from '../utils/agent'
const API_URL = process.env.REACT_APP_API_URL
const getNotification = async (offset, itemsPerPage, activePage, params) => {
  const response = await agent.get(
    `${API_URL}game-notifications/listing?offset=${offset}&limit=${itemsPerPage}&page=${activePage}&${params}`,
  )
  return response.data
}
const saveNotification = async (data) => {
  const response = await agent.post(API_URL + 'game-notifications/save-notification', data)
  return response.data
}
const editNotification = async (data) => {
  const response = await agent.post(API_URL + 'game-notifications/edit-notification', data)
  return response.data
}
const getNotificationDetail = async (id) => {
  const response = await agent.get(`${API_URL}game-notifications/notification-details/${id}`)
  return response.data
}
const deleteNotification = async (data) => {
  const response = await agent.post(API_URL + 'game-notifications/delete-notification', data)
  return response.data
}
const GameNotificationService = {
  getNotification,
  saveNotification,
  deleteNotification,
  getNotificationDetail,
  editNotification,
}

export default GameNotificationService
