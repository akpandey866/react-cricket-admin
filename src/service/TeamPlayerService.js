import { agent } from '../utils/agent'
const API_URL = process.env.REACT_APP_API_URL
const getTeamPlayer = async (offset, itemsPerPage, activePage, params, fixtureId) => {
  const response = await agent.get(
    `${API_URL}team-player/${fixtureId}?offset=${offset}&limit=${itemsPerPage}&page=${activePage}&${params}`,
  )
  return response.data
}
const deleteTeamPlayer = async (playerId, fixtureId) => {
  const response = await agent.get(`${API_URL}delete-team-player/${playerId}/${fixtureId}`)
  return response.data
}
const teamPlayerListing = async () => {
  const response = await agent.get(`${API_URL}team-player-listing`)
  return response.data
}

const addInstantPlayer = async (playerId, fixtureId) => {
  const response = await agent.get(`${API_URL}add-team-player-direct/${playerId}/${fixtureId}`)
  return response.data
}

const saveMultiPlayer = async (data) => {
  const response = await agent.post(`${API_URL}save-multi-team-player`, data)
  return response.data
}

const getPickedPlayer = async (fixtureId) => {
  const response = await agent.get(`${API_URL}team-player-listing/${fixtureId}`)
  return response.data
}
const TeamPlayerService = {
  getTeamPlayer,
  deleteTeamPlayer,
  teamPlayerListing,
  getPickedPlayer,
  addInstantPlayer,
  saveMultiPlayer,
}

export default TeamPlayerService
