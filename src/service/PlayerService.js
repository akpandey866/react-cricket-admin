import { agent } from '../utils/agent'
const API_URL = process.env.REACT_APP_API_URL
const getPlayers = async (offset, itemsPerPage, activePage, params) => {
  if (offset) {
    const response = await agent.get(
      `${API_URL}players/listing?offset=${offset}&limit=${itemsPerPage}&page=${activePage}&${params}`,
    )
    return response.data
  } else {
    const response = await agent.get(
      `${API_URL}players/listing?offset=${offset}&limit=${itemsPerPage}&page=${activePage}&${params}`,
    )
    return response.data
  }
}
const savePlayer = async (data) => {
  const response = await agent.post(API_URL + 'players/save-player', data)
  return response.data
}
const editPlayer = async (data) => {
  const response = await agent.post(API_URL + 'players/edit-player', data)
  return response.data
}
const getPlayerDetail = async (id) => {
  const response = await agent.get(`${API_URL}players/player-details/${id}`)
  return response.data
}
const getTeamPositionValueBatBowlStyle = async (id) => {
  const response = await agent.get(`${API_URL}players/get-position-team-val-bat-bowl-style`)
  return response.data
}
const deletePlayer = async (data) => {
  const response = await agent.post(API_URL + 'players/delete-player', data)
  return response.data
}

const getPlayerFantasyValue = async (id) => {
  const response = await agent.get(`${API_URL}players/fantasy-values`)
  return response.data
}

const updatePlayerFantasyValue = async (data) => {
  const response = await agent.post(API_URL + 'players/update-fantasy-values', data)
  return response.data
}
const savePlayerPrice = async (data) => {
  const response = await agent.post(API_URL + 'players/save-player-prices', data)
  return response.data
}
const saveDefaultPriceStructure = async (data) => {
  const response = await agent.post(API_URL + 'players/save-default-price-structure', data)
  return response.data
}
const savePlayerStructure = async (data) => {
  const response = await agent.post(API_URL + 'players/save-player-structure', data)
  return response.data
}
const getPlayerStructureInfo = async () => {
  const response = await agent.get(API_URL + 'players/get-player-structure-info')
  return response.data
}
const playerProfileClaimListing = async () => {
  const response = await agent.get(API_URL + 'players/player-profile-claim-listing')
  return response.data
}
const verifyPlayerRequest = async (data) => {
  const response = await agent.post(API_URL + 'players/verify-player-request', data)
  return response.data
}
const updateStatus = async (id, status) => {
  const response = await agent.get(`${API_URL}players/update-status/${id}/${status}`)
  return response.data
}
const PlayerService = {
  getPlayers,
  savePlayer,
  deletePlayer,
  getPlayerDetail,
  editPlayer,
  getTeamPositionValueBatBowlStyle,
  getPlayerFantasyValue,
  updatePlayerFantasyValue,
  savePlayerPrice,
  saveDefaultPriceStructure,
  savePlayerStructure,
  getPlayerStructureInfo,
  playerProfileClaimListing,
  verifyPlayerRequest,
  updateStatus,
}

export default PlayerService
