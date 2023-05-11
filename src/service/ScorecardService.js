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
const showScorecard = async (fixtureId) => {
  const response = await agent.get(`${API_URL}scorecard/show-scorecard/${fixtureId}`)
  return response.data
}
const showSquad = async (fixtureId) => {
  const response = await agent.get(`${API_URL}/scorecard/show-squads/${fixtureId}`)
  return response.data
}
const manageScorecard = async (fixtureId) => {
  const response = await agent.get(`${API_URL}/scorecard/manage-scorecards/${fixtureId}`)
  return response.data
}
const manageUpdateScorecard = async (data) => {
  const response = await agent.post(`${API_URL}scorecard/manage-scorecards`, data)
  return response.data
}

const ScorecardService = {
  scorecardDetail,
  saveScorecard,
  showScorecard,
  showSquad,
  manageScorecard,
  manageUpdateScorecard,
}

export default ScorecardService
