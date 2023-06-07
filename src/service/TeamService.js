import { agent } from '../utils/agent'
const API_URL = process.env.REACT_APP_API_URL
const getTeam = async (offset, itemsPerPage, activePage, params) => {
  const response = await agent.get(
    `${API_URL}/teams/listing?offset=${offset}&limit=${itemsPerPage}&page=${activePage}&${params}`,
  )
  return response.data
}
const saveTeam = async (data) => {
  const response = await agent.post(API_URL + 'teams/save-team', data)
  return response.data
}
const editTeam = async (data) => {
  const response = await agent.post(API_URL + 'teams/edit-team', data)
  return response.data
}
const getTeamDetail = async (id) => {
  const response = await agent.get(`${API_URL}teams/team-details/${id}`)
  return response.data
}

const getTeamListByGrade = async () => {
  const response = await agent.get(`${API_URL}teams/team-list-by-grade`)
  return response.data
}
const deleteTeam = async (data) => {
  const response = await agent.post(API_URL + 'teams/delete-team', data)
  return response.data
}
const getAddTeamData = async () => {
  const response = await agent.get(API_URL + 'teams/get-add-team-data')
  return response.data
}

const TeamService = {
  getTeam,
  saveTeam,
  deleteTeam,
  getTeamDetail,
  editTeam,
  getTeamListByGrade,
  getAddTeamData,
}

export default TeamService
