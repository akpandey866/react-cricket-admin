import { agent } from '../utils/agent'
const API_URL = process.env.REACT_APP_API_URL

const roundListing = async (offset, itemsPerPage, activePage, params) => {
  const response = await agent.get(`${API_URL}/common/bonus-cards`)
  return response.data
}
const clubPlayers = async () => {
  const response = await agent.get(`${API_URL}/common/club-players`)
  return response.data
}

const saveBonusCard = async (data) => {
  const response = await agent.post(API_URL + 'common/save-bonus-card', data)
  return response.data
}
const saveBonusCardPlayerPoint = async (data) => {
  const response = await agent.post(API_URL + 'common/save-bonus-card-player-point', data)
  return response.data
}

const editPowerControl = async (data) => {
  const response = await agent.post(API_URL + 'common/edit-power-control', data)
  return response.data
}

const bonusCardPlayer = async (teamPowerId) => {
  const response = await agent.get(`${API_URL}common/bonus-card-players/${teamPowerId}`)
  return response.data
}

const bonusCardSelectedPlayer = async (roundNumber) => {
  const response = await agent.get(`${API_URL}common/bonus-card-selected-players/${roundNumber}`)
  return response.data
}

const getBonusCardDetail = async (roundNumber) => {
  const response = await agent.get(`${API_URL}common/get-bonus-card-details/${roundNumber}`)
  return response.data
}

const powerControl = async () => {
  const response = await agent.get(`${API_URL}power-control`)
  return response.data
}
const updateGameSpot = async (data) => {
  const response = await agent.post(API_URL + 'common/update-game-spot', data)
  return response.data
}

const updateTrade = async (data) => {
  const response = await agent.post(API_URL + 'common/update-trades', data)
  return response.data
}

const branding = async () => {
  const response = await agent.get(`${API_URL}common/branding`)
  return response.data
}
const editBranding = async (data) => {
  const response = await agent.post(API_URL + 'common/edit-branding', data)
  return response.data
}

const changePowerControlStatus = async (data) => {
  const response = await agent.post(API_URL + 'common/change-power-control-status', data)
  return response.data
}

const updateBonusPoint = async (data) => {
  const response = await agent.post(API_URL + 'common/update-bonus-point', data)
  return response.data
}

const getBonusPoint = async () => {
  const response = await agent.get(`${API_URL}common/get-bonus-point`)
  return response.data
}

const getVerifyUser = async () => {
  const response = await agent.get(`${API_URL}common/verify-users`)
  return response.data
}
const saveVerifyUser = async (data) => {
  const response = await agent.post(API_URL + 'common/save-verify-user', data)
  return response.data
}

const getTotwData = async () => {
  const response = await agent.get(API_URL + 'common/get-totw-listing')
  return response.data
}
const saveTotw = async (data) => {
  const response = await agent.post(API_URL + 'common/save-totw', data)
  return response.data
}

const totwSelectedPlayer = async (roundNumber) => {
  const response = await agent.get(`${API_URL}common/totw-selected-players/${roundNumber}`)
  return response.data
}
const totwPlayerList = async (round) => {
  const response = await agent.get(`${API_URL}common/totw-player-list/${round}`)
  return response.data
}
const updateTotwPlayerPoint = async (data) => {
  const response = await agent.post(API_URL + 'common/update-totw-player-points', data)
  return response.data
}

const editGameStructure = async (data) => {
  const response = await agent.post(API_URL + 'common/edit-game-structure', data)
  return response.data
}
const deleteVerifyUser = async (data) => {
  const response = await agent.post(API_URL + 'common/delete-verify-user', data)
  return response.data
}
const gameStructureInfo = async () => {
  const response = await agent.get(API_URL + 'common/get-game-structure-info')
  return response.data
}
const CommonService = {
  roundListing,
  bonusCardPlayer,
  saveBonusCard,
  saveBonusCardPlayerPoint,
  clubPlayers,
  powerControl,
  editPowerControl,
  changePowerControlStatus,
  updateGameSpot,
  updateTrade,
  branding,
  editBranding,
  getBonusPoint,
  updateBonusPoint,
  getVerifyUser,
  saveVerifyUser,
  getBonusCardDetail,
  bonusCardSelectedPlayer,
  getTotwData,
  saveTotw,
  totwSelectedPlayer,
  totwPlayerList,
  updateTotwPlayerPoint,
  editGameStructure,
  gameStructureInfo,
  deleteVerifyUser,
}

export default CommonService
