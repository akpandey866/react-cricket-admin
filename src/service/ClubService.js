import { agent } from '../utils/agent'
const API_URL = process.env.REACT_APP_API_URL
const getClubDetails = async (data) => {
  const response = await agent.get(API_URL + 'get-club-details')
  return response.data
}

const getStateByCountryId = async (countryId) => {
  const response = await agent.get(`${API_URL}get-state-by-country-id/${countryId}`)
  return response.data
}
const updateGameAdmin = async (data) => {
  const response = await agent.post(API_URL + 'update-game-admin', data)
  return response.data
}

const updateGameSocial = async (data) => {
  const response = await agent.post(API_URL + 'update-game-social', data)
  return response.data
}
const updateGameIntro = async (data) => {
  const response = await agent.post(API_URL + 'update-game-intro', data)
  return response.data
}
const updateAboutGame = async (data) => {
  const response = await agent.post(API_URL + 'update-about-game', data)
  return response.data
}
const updateFeeInfo = async (data) => {
  const response = await agent.post(API_URL + 'update-fee-info', data)
  return response.data
}
const updateBasicSetting = async (data) => {
  const response = await agent.post(API_URL + 'update-basic-setting', data)
  return response.data
}
const ClubService = {
  getClubDetails,
  updateGameAdmin,
  updateGameSocial,
  updateGameIntro,
  getStateByCountryId,
  updateAboutGame,
  updateFeeInfo,
  updateBasicSetting,
}

export default ClubService
