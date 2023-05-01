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

const BracketBattleService = {
  listing,
  saveOrUpdateBracketBattle,
  battleListing,
}

export default BracketBattleService
