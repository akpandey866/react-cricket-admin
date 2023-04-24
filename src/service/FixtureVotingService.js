import { agent } from '../utils/agent'
const API_URL = process.env.REACT_APP_API_URL
const getFixtureVotingListing = async () => {
  const response = await agent.get(`${API_URL}fixture-voting/listing`)
  return response.data
}
const getFixtureVote = async (fixtureId) => {
  const response = await agent.get(`${API_URL}fixture-voting/get-fixture-voting-data/${fixtureId}`)
  return response.data
}
const getAverageFitureVote = async (fixtureId) => {
  const response = await agent.get(
    `${API_URL}fixture-voting/get-average-fixture-voting/${fixtureId}`,
  )
  return response.data
}
const userPlayerRating = async (fixtureId) => {
  const response = await agent.get(`${API_URL}fixture-voting/user-player-rating/${fixtureId}`)
  return response.data
}
const getUserPlayingModal = async (fixtureId, userId) => {
  const response = await agent.get(
    `${API_URL}fixture-voting/user-player-rating-modal/${fixtureId}/${userId}`,
  )
  return response.data
}

const FixtureVotingService = {
  getFixtureVotingListing,
  getFixtureVote,
  getAverageFitureVote,
  userPlayerRating,
  getUserPlayingModal,
}

export default FixtureVotingService
