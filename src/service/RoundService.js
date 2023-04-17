import { agent } from '../utils/agent'
const API_URL = process.env.REACT_APP_API_URL
const getRound = async (offset, itemsPerPage, activePage, params) => {
  const response = await agent.get(
    `${API_URL}rounds/listing?offset=${offset}&limit=${itemsPerPage}&page=${activePage}&${params}`,
  )
  return response.data
}
const saveRound = async (data) => {
  const response = await agent.post(API_URL + 'rounds/save-round', data)
  return response.data
}
const editRound = async (data) => {
  const response = await agent.post(API_URL + 'rounds/edit-round', data)
  return response.data
}
const getRoundDetail = async (id) => {
  const response = await agent.get(`${API_URL}rounds/round-details/${id}`)
  return response.data
}
const deleteRound = async (data) => {
  const response = await agent.post(API_URL + 'rounds/delete-round', data)
  return response.data
}

const RoundService = {
  getRound,
  saveRound,
  deleteRound,
  getRoundDetail,
  editRound,
}

export default RoundService
