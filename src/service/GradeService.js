import { agent } from '../utils/agent'
const API_URL = process.env.REACT_APP_API_URL
const getGrades = async (offset, itemsPerPage, activePage, params) => {
  if (offset) {
    const response = await agent.get(
      `${API_URL}/grades/listing?offset=${offset}&limit=${itemsPerPage}&page=${activePage}&${params}`,
    )
    return response.data
  } else {
    const response = await agent.get(`${API_URL}/grades/listing`)
    return response.data
  }
}
const saveGrade = async (data) => {
  const response = await agent.post(API_URL + 'grades/save-grade', data)
  return response.data
}
const editGrade = async (data) => {
  const response = await agent.post(API_URL + 'grades/edit-grade', data)
  return response.data
}
const getGradeDetail = async (id) => {
  const response = await agent.get(`${API_URL}grades/grade-details/${id}`)
  return response.data
}
const deleteGrade = async (data) => {
  const response = await agent.post(API_URL + 'grades/delete-grade', data)
  return response.data
}

const gradeData = async (data) => {
  const response = await agent.get(`${API_URL}grades/grade-data`)
  return response.data
}

const gradePointSystem = async (id) => {
  const response = await agent.get(`${API_URL}grades/grade-point-system/${id}`)
  return response.data
}
const updateGradePointSystem = async (data) => {
  const response = await agent.post(`${API_URL}grades/update-grade-point-system`, data)
  return response.data
}

const resetToDefault = async (id) => {
  const response = await agent.get(`${API_URL}grades/reset-to-default/${id}`)
  return response.data
}
const mulitplyGrade = async (data) => {
  const response = await agent.post(`${API_URL}grades/multiply-grade`, data)
  return response.data
}
const copyGrade = async (data) => {
  const response = await agent.post(`${API_URL}grades/copy-grade`, data)
  return response.data
}

const GradeService = {
  getGrades,
  saveGrade,
  deleteGrade,
  getGradeDetail,
  editGrade,
  gradeData,
  gradePointSystem,
  updateGradePointSystem,
  resetToDefault,
  mulitplyGrade,
  copyGrade,
}

export default GradeService
