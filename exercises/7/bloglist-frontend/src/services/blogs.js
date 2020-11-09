import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const resp = await axios.get(baseUrl)
  return resp.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const resp = await axios.put(`${baseUrl}/${id}`, newObject)
  return resp.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const resp = await axios.delete(`${baseUrl}/${id}`,config)
  return resp.data
}

const comment = async (id, comment) => {
  const resp = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return resp.data
}

export default { getAll, create, update, setToken, remove, comment }