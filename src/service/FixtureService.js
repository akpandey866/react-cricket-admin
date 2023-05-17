import { agent } from '../utils/agent'
const API_URL = process.env.REACT_APP_API_URL
const getFixture = async (offset, itemsPerPage, activePage, params) => {
  const response = await agent.get(
    `${API_URL}fixtures/listing?offset=${offset}&limit=${itemsPerPage}&page=${activePage}&${params}`,
  )
  return response.data
}
const getCompletedFixture = async (offset, itemsPerPage, activePage, params) => {
  const response = await agent.get(
    `${API_URL}fixtures/get-completed-fixture?offset=${offset}&limit=${itemsPerPage}&page=${activePage}&${params}`,
  )
  return response.data
}
const saveFixture = async (data) => {
  const response = await agent.post(API_URL + 'fixtures/save-fixture', data)
  return response.data
}
const editFixture = async (data) => {
  const response = await agent.post(API_URL + 'fixtures/edit-fixture', data)
  return response.data
}
const getFixtureDetail = async (id) => {
  const response = await agent.get(`${API_URL}fixtures/fixture-details/${id}`)
  return response.data
}

const deleteFixture = async (data) => {
  const response = await agent.post(API_URL + 'fixtures/delete-fixture', data)
  return response.data
}
const getActivatedDisplay = async () => {
  const response = await agent.get(API_URL + 'fixtures/get-activated-display')
  return response.data
}

const changeDisplayStatus = async (data) => {
  const response = await agent.post(API_URL + 'fixtures/changeDisplayStatus', data)
  return response.data
}
const getFeedbackManagerList = async (fixtureId) => {
  const response = await agent.get(API_URL + 'fixtures/get-feedback-manager-list/' + fixtureId)
  return response.data
}
const saveAssignedFeedbackManager = async (data) => {
  const response = await agent.post(API_URL + 'fixtures/save-assigned-feedback-manager', data)
  return response.data
}
const deleteAssignedFeedbackManager = async (data) => {
  const response = await agent.post(API_URL + 'fixtures/delete-assigned-feedback-manager', data)
  return response.data
}

const FixtureService = {
  getFixture,
  getCompletedFixture,
  saveFixture,
  editFixture,
  getFixtureDetail,
  deleteFixture,
  getActivatedDisplay,
  changeDisplayStatus,
  getFeedbackManagerList,
  saveAssignedFeedbackManager,
  deleteAssignedFeedbackManager,
}

export default FixtureService
