import { agent } from '../utils/agent'
const API_URL = process.env.REACT_APP_API_URL
const getAvailability = async (offset = 0, itemsPerPage = 0, activePage = 0, params = []) => {
  if (offset) {
    const response = await agent.get(
      `${API_URL}player-availabilities/listing?offset=${offset}&limit=${itemsPerPage}&page=${activePage}&${params}`,
    )
    return response.data
  } else {
    const response = await agent.get(
      `${API_URL}player-availabilities/listing?offset=${offset}&limit=${itemsPerPage}&page=${activePage}&${params}`,
    )
    return response.data
  }
}
const saveAvailability = async (data) => {
  const response = await agent.post(`${API_URL}player-availabilities/save-availability`, data)
  return response.data
}
const editAvailability = async (data) => {
  const response = await agent.post(API_URL + 'player-availabilities/edit-availability', data)
  return response.data
}
const getAvailabilityDetail = async (id) => {
  const response = await agent.get(`${API_URL}player-availabilities/availability-details/${id}`)
  return response.data
}
const deleteAvailability = async (data) => {
  const response = await agent.post(API_URL + 'player-availabilities/delete-availability', data)
  return response.data
}
const updateStatus = async (id, status) => {
  const response = await agent.get(`${API_URL}player-availabilities/update-status/${id}/${status}`)
  return response.data
}
const PlayerAvailabilityService = {
  getAvailability,
  saveAvailability,
  deleteAvailability,
  getAvailabilityDetail,
  editAvailability,
  updateStatus,
}

export default PlayerAvailabilityService
