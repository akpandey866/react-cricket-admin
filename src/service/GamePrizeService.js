import { agent } from '../utils/agent'
const API_URL = process.env.REACT_APP_API_URL
const getPrize = async (offset, itemsPerPage, activePage, params) => {
  if (offset) {
    const response = await agent.get(
      `${API_URL}prizes/listing?offset=${offset}&limit=${itemsPerPage}&page=${activePage}&${params}`,
    )
    return response.data
  } else {
    const response = await agent.get(`${API_URL}prizes/listing`)
    return response.data
  }
}
const savePrize = async (data) => {
  const response = await agent.post(API_URL + 'prizes/save-prize', data)
  return response.data
}
const editPrize = async (data) => {
  const response = await agent.post(API_URL + 'prizes/edit-prize', data)
  return response.data
}
const getPrizeDetail = async (id) => {
  const response = await agent.get(`${API_URL}prizes/prize-details/${id}`)
  return response.data
}
const deletePrize = async (data) => {
  const response = await agent.post(API_URL + 'prizes/delete-prize', data)
  return response.data
}
const updateFeatured = async (id, status) => {
  const response = await agent.get(`${API_URL}prizes/update-featured/${id}/${status}`)
  return response.data
}
const updateStatus = async (id, status) => {
  const response = await agent.get(`${API_URL}prizes/update-status/${id}/${status}`)
  return response.data
}

const GamePrizeService = {
  getPrize,
  savePrize,
  deletePrize,
  getPrizeDetail,
  editPrize,
  updateFeatured,
  updateStatus,
}

export default GamePrizeService
