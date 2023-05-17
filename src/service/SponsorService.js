import { agent } from '../utils/agent'
const API_URL = process.env.REACT_APP_API_URL
const getSponsor = async (offset, itemsPerPage, activePage, params) => {
  if (offset) {
    const response = await agent.get(
      `${API_URL}/sponsors/listing?offset=${offset}&limit=${itemsPerPage}&page=${activePage}&${params}`,
    )
    return response.data
  } else {
    const response = await agent.get(`${API_URL}/sponsors/listing`)
    return response.data
  }
}
const saveSponsor = async (data) => {
  const response = await agent.post(API_URL + 'sponsors/save-sponsor', data)
  return response.data
}
const editSponsor = async (data) => {
  const response = await agent.post(API_URL + 'sponsors/edit-sponsor', data)
  return response.data
}
const getSponsorDetail = async (id) => {
  const response = await agent.get(`${API_URL}sponsors/sponsor-details/${id}`)
  return response.data
}
const deleteSponsor = async (data) => {
  const response = await agent.post(API_URL + 'sponsors/delete-sponsor', data)
  return response.data
}
const updateFeatured = async (id, status) => {
  const response = await agent.get(`${API_URL}sponsor/update-featured/${id}/${status}`)
  return response.data
}
const updateStatus = async (id, status) => {
  const response = await agent.get(`${API_URL}sponsor/update-status/${id}/${status}`)
  return response.data
}

const SponsorService = {
  getSponsor,
  saveSponsor,
  deleteSponsor,
  getSponsorDetail,
  editSponsor,
  updateFeatured,
  updateStatus,
}

export default SponsorService
