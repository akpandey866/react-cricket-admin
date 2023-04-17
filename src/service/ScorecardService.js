import { agent } from '../utils/agent'
const API_URL = process.env.REACT_APP_API_URL
const scorecardDetail = async (fixtureId) => {
  const response = await agent.get(`${API_URL}scorecard/${fixtureId}`)
  return response.data
}

const saveScorecard = async (data) => {
  const response = await agent.post(`${API_URL}save-scorecard`, data)
  return response.data
}

const ScorecardService = {
  scorecardDetail,
  saveScorecard,
}

export default ScorecardService
