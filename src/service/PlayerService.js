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
const PlayerService = {
  getPlayers,
  savePlayer,
  deletePlayer,
  getPlayerDetail,
  editPlayer,
  getTeamPositionValueBatBowlStyle,
  getPlayerFantasyValue,
  updatePlayerFantasyValue,
}

export default PlayerService
