import { agent } from '../utils/agent'
const API_URL = process.env.REACT_APP_API_URL

const listing = async () => {
  const response = await agent.get(`${API_URL}bracket-battle`)
  return response.data
}
const saveOrUpdateBracketBattle = async (data) => {
  const response = await agent.post(`${API_URL}bracket-battle/save-bracket-battle`, data)
  return response.data
}

const battleListing = async (id) => {
  const response = await agent.get(`${API_URL}bracket-battle/battle-listing/${id}`)
  return response.data
}

const updateRoundBattle = async (data) => {
  const response = await agent.post(`${API_URL}bracket-battle/update-round-battle`, data)
  return response.data
}
const matchCompletion = async (data) => {
  const response = await agent.post(`${API_URL}bracket-battle/match-completion`, data)
  return response.data
}
const getMatchResultData = async (roundId) => {
  const response = await agent.get(`${API_URL}bracket-battle/get-match-result-data/${roundId}`)
  return response.data
}
const declarWinner = async (data) => {
  const response = await agent.post(`${API_URL}bracket-battle/declarWinner`, data)
  return response.data
}
const saveBracketRound = async (data) => {
  const response = await agent.post(`${API_URL}bracket-battle/save-bracket-round`, data)
  return response.data
}

const BracketBattleService = {
  listing,
  saveOrUpdateBracketBattle,
  battleListing,
  updateRoundBattle,
  matchCompletion,
  getMatchResultData,
  declarWinner,
  saveBracketRound,
}

export default BracketBattleService
