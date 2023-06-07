import { agent } from '../utils/agent'
const API_URL = process.env.REACT_APP_API_URL
const getArticle = async (offset = 0, itemsPerPage = 0, activePage = 0, params = []) => {
  const response = await agent.get(
    `${API_URL}articles/listing?offset=${offset}&limit=${itemsPerPage}&page=${activePage}&${params}`,
  )
  return response.data
}
const saveArticle = async (data) => {
  const response = await agent.post(API_URL + 'articles/save-article', data)
  return response.data
}
const editArticle = async (data) => {
  const response = await agent.post(API_URL + 'articles/edit-article', data)
  return response.data
}
const getArticleDetail = async (id) => {
  const response = await agent.get(`${API_URL}articles/article-details/${id}`)
  return response.data
}
const deleteArticle = async (data) => {
  const response = await agent.post(API_URL + 'articles/delete-article', data)
  return response.data
}

const ArticleData = async (data) => {
  const response = await agent.get(`${API_URL}articles/article-data`)
  return response.data
}
const updateStatus = async (id, status) => {
  const response = await agent.get(`${API_URL}articles/update-status/${id}/${status}`)
  return response.data
}
const ArticleService = {
  getArticle,
  saveArticle,
  deleteArticle,
  getArticleDetail,
  editArticle,
  ArticleData,
  updateStatus,
}

export default ArticleService
